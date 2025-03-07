import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Student {
  name: string;
  email: string;
  lastLogin: string;
  timeSpent: number;
  countdownToExamDay: number;
  specialization: string;
  activity: {
    physics: string;
    chemistry: string;
    math?: string;
    biology?: string;
  };
  scores: {
    physics: number;
    chemistry: number;
    math?: number;
    biology?: number;
  };
}

const NotificationComponent: React.FC<{ student: Student }> = ({ student }) => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState<number>(0);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // 🎭 Get Theme-Based Notification Based on the Day
  const getThemeDayMessage = () => {
    const dayOfWeek = new Date().getDay();
    const themeDays: { [key: number]: string } = {
      1: "📚 Memory Boost Monday: Revise it, recall it, retain it! 🧠📖",
      2: "🔬 Theory Thursday: Even Einstein revised. Time for some serious theory grinding! 📚💡",
      3: "🚀 Speedy Saturday: Fastest finger first! Speed up problem-solving! ⚡⌛",
      4: "📏 Formula Friday: It’s Formula Friday! Let’s turn formulas into marks! ➗📖",
      5: "⏳ One-Week-Warrior: You survived the week, but can you survive the syllabus? 🏆📚",
    };
    return themeDays[dayOfWeek] || null;
  };

  // 📌 Generate Dynamic Notifications
  const generateNotifications = useCallback(() => {
    const newNotifications: string[] = [];

    // 🔥 THEME DAYS
    const themeMessage = getThemeDayMessage();
    if (themeMessage) newNotifications.push(themeMessage);

    // 📅 Last Login-Based Reminders
    const lastLoginDays = Math.floor(
      (new Date().getTime() - new Date(student.lastLogin).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (lastLoginDays > 3) {
      newNotifications.push(`📅 Hey ${student.name}, your books miss you! Last login: ${lastLoginDays} days ago. 📖💔`);
    }
    if (lastLoginDays > 7) {
      newNotifications.push(`⏳ It’s been 7 days! Your future IIT/NEET rank is waiting for you! 🚀`);
    }

    // ⏳ Exam Countdown Notifications
    if (student.countdownToExamDay <= 100) newNotifications.push(`📆 100 Days Left: 100 days, 100 chapters. Let’s go! 📚🔥`);
    if (student.countdownToExamDay <= 50) newNotifications.push(`📆 50 Days Left: Halfway there… but are you halfway prepared? 🤔📖`);
    if (student.countdownToExamDay <= 30) newNotifications.push(`📆 30 Days Left: One month to go! Mock tests = Future confidence! 🚀📝`);
    if (student.countdownToExamDay <= 7) newNotifications.push(`📆 1 Week Left: Revise, eat, sleep, repeat! 🔁`);
    if (student.countdownToExamDay === 1) newNotifications.push(`📆 1 Day Left: Breathe in. Breathe out. You got this! 🧘‍♂️📚`);

    // 📖 Subject-Specific Motivation
    if (student.activity.physics) newNotifications.push(`⚡ Physics feels tough? Newton believed in you. You should too! 🍏📚`);
    if (student.activity.chemistry) newNotifications.push(`🧪 Organic Chemistry Alert: Bonding with Chemistry = Better bonds with your future college! 🔬`);
    if (student.specialization === "PCM" && student.activity.math) newNotifications.push(`➗ Calculus Activity: Derivatives might be tricky, but your rank shouldn’t be! 🧮📖`);
    if (student.specialization === "PCB" && student.activity.biology) newNotifications.push(`🩺 Human Physiology Chapter: Doctor mode: ON. Let’s diagnose some concepts today! 🩺📚`);

    // 📊 Performance-Based Alerts
    Object.entries(student.scores).forEach(([subject, score]) => {
      if (score < 50) newNotifications.push(`📉 Low Score in ${subject.toUpperCase()}: Time for some extra effort! 💪⚡`);
      if (score >= 80) newNotifications.push(`🏆 High Score in ${subject.toUpperCase()}: Rank 1 vibes! Keep acing it! 🚀`);
    });

    setNotifications(newNotifications);
  }, [student]);

  useEffect(() => {
    generateNotifications();
  }, [student, generateNotifications]);

  // ⏳ Display and Rotate Notifications
  useEffect(() => {
    if (notifications.length === 0) return;

    const showNextNotification = () => {
      setShowNotification(false); // Hide current notification
      setTimeout(() => {
        setCurrentNotificationIndex((prevIndex) => (prevIndex + 1) % notifications.length);
        setShowNotification(true);
      }, 2000); // Delay before the next notification appears
    };

    // Show first notification immediately
    if (!showNotification) {
      setShowNotification(true);
    }

    const interval = setInterval(showNextNotification, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, [notifications, showNotification]);

  return (
    <div className="fixed top-5 w-full flex justify-center z-50">
      <AnimatePresence>
        {showNotification && notifications.length > 0 && (
          <motion.div
            key={notifications[currentNotificationIndex]} // Ensures unique animations per notification
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100vw", opacity: 0 }}
            transition={{ type: "tween", duration: 0.8 }}
            className="bg-blue-100 border-l-4 border-blue-500 p-3 rounded-lg shadow-lg max-w-xl text-center"
          >
            {notifications[currentNotificationIndex]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationComponent;

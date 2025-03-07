import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import studentsData from "../../public/students.json"; // Update the path to your JSON file

export default function Input_name() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({ studentId: "", name: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setStudents(studentsData);
  }, []);

  const handleStudentIdChange = (e) => {
    const id = e.target.value;
    setStudentId(id);
    const student = students.find((s) => s.FormID === id);
    if (student) {
      setName(student.Name);
      setErrors((prev) => ({ ...prev, studentId: "" }));
    } else {
      setName("");
      setErrors((prev) => ({ ...prev, studentId: "Student ID not found" }));
    }
  };

  const validate = () => {
    let newErrors = { studentId: "", name: "" };
    if (!studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    }
    if (!name) {
      newErrors.name = "Valid Student ID required";
    }
    setErrors(newErrors);
    return !newErrors.studentId && !newErrors.name;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate(`/topgallary`);
      
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Student ID</label>
            <Input
              value={studentId}
              onChange={handleStudentIdChange}
              placeholder="Enter Student ID"
              className="mt-1 w-full"
            />
            {errors.studentId && <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <Input
              value={name}
              readOnly
              placeholder="Auto-filled Name"
              className="mt-1 w-full bg-gray-200"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Submit</Button>
        </form>
      </div>
    </div>
  );
}

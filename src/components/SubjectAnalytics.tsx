import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Line,
  LineChart,
  Pie,
  PieChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface SubjectAnalyticsProps {
  subject: string;
  pyqTopper: number;
  pyqStudent: number;
  totalTopper: number;
  totalStudent: number;
  subjectRanks: number;
  subjectScores: number;
}

const questionConfig = {
  topper: {
    label: "Topper",
    color: "hsl(var(--chart-1))",
  },
  you: {
    label: "You",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "blue",
  },
} satisfies ChartConfig;

const PieChartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const SubjectAnalytics: React.FC<SubjectAnalyticsProps> = ({
  subject,
  pyqTopper,
  pyqStudent,
  totalTopper,
  totalStudent,
  subjectRanks,
  subjectScores,
}) => {
  const lag =
    ((pyqTopper + totalTopper - pyqStudent - totalStudent) * 100) /
    (pyqTopper + totalTopper);

  const totalStudents = 100;

  const questionData = [
    { month: "PYQ'S", topper: 186, you: 80 },
    { month: "Total", topper: 305, you: 200 },
  ];

  const rankData = [
    { month: "Test0", rank: totalStudents - 100 },
    { month: "Test1", rank: totalStudents - 80 },
    { month: "Test2", rank: totalStudents - 90 },
    { month: "Test3", rank: totalStudents - 80 },
    { month: "Test4", rank: totalStudents - 70 },
    { month: "Test5", rank: totalStudents - 40 },
    { month: "Test6", rank: totalStudents - 10 },
  ];

  const scoreData = [
    { month: "Test0", score: 20 },
    { month: "Test1", score: 40 },
    { month: "Test2", score: 30 },
    { month: "Test3", score: 10 },
    { month: "Test4", score: 50 },
    { month: "Test5", score: 80 },
    { month: "Test6", score: 100 },
  ];

  const totalTestData = [
    { browser: "You", visitors: 10, fill: "#2463EB" },
    { browser: "Topper", visitors: 15, fill: "#BDDCFE" },
  ];

  return (
    <div className="w-full h-full grid grid-cols-4 gap-4 p-4">
      <div>
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-7">
            <CardTitle>Tests Given</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={totalTestData}
                  dataKey="visitors"
                  nameKey="browser"
                  stroke="0"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Questions Solved</CardTitle>
            {/* <CardDescription>January - June 2024</CardDescription> */}
          </CardHeader>
          <CardContent>
            <ChartContainer config={questionConfig}>
              <BarChart accessibilityLayer data={questionData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 5)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="topper" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="you" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              You are lagging behind the topper by {lag}%{" "}
              <TrendingDown className="h-4 w-4" />
            </div>
          </CardFooter>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Subject Rank</CardTitle>
            {/* <CardDescription>January - June 2024</CardDescription> */}
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={rankData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 6)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="rank"
                  type="linear"
                  stroke="black"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              You have Improved by 5.2% <TrendingUp className="h-4 w-4" />
            </div>
          </CardFooter>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Subject Score</CardTitle>
            {/* <CardDescription>January - June 2024</CardDescription> */}
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={scoreData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="score"
                  type="linear"
                  stroke="black"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% <TrendingUp className="h-4 w-4" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SubjectAnalytics;

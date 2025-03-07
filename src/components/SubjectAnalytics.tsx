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
  subjectRanks: number[];
  subjectScores: number[];
  topperTests?: number;
  studentTests?: number;
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
  rank: {
    label: "Rank",
    color: "black",
  },
  score: {
    label: "Score",
    color: "black",
  },
} satisfies ChartConfig;

const pieConfig = {
  visitors: {
    label: "tests",
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
  topperTests = 100,
  studentTests = 80,
}) => {
  const lag = Math.round(
    ((pyqTopper + totalTopper - pyqStudent - totalStudent) * 100) /
      (pyqTopper + totalTopper)
  );

  const totalStudents = 100;

  const questionData = [
    { month: "PYQ'S", topper: pyqTopper, you: pyqStudent },
    { month: "Total", topper: totalTopper, you: totalStudent },
  ];

  const rankData = subjectRanks.map((rank, index) => ({
    month: `Test${index + 1}`,
    rank: totalStudents - rank,
  }));

  const scoreData = subjectScores.map((score, index) => ({
    month: `Test${index + 1}`,
    score,
  }));

  const totalTestData = [
    { browser: "You", visitors: studentTests, fill: "#2463EB" },
    { browser: "Topper", visitors: topperTests, fill: "#BDDCFE" },
  ];

  const scoreImprovement =
    subjectScores.length > 1
      ? Math.round(
          ((subjectScores[subjectScores.length - 1] - subjectScores[0]) /
            subjectScores[0]) *
            100 *
            10
        ) / 10
      : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-center">Tests Attempted</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={pieConfig}
              className="mx-auto aspect-square h-48 [&_.recharts-pie-label-text]:fill-foreground"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={totalTestData}
                  dataKey="visitors"
                  nameKey="browser"
                  labelLine={false}
                  stroke="none"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Questions Solved</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={questionConfig}>
              <BarChart data={questionData} height={160}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="topper" fill="var(--chart-1)" radius={4} />
                <Bar dataKey="you" fill="var(--chart-2)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex items-center justify-center gap-2 text-sm">
            <div className="flex gap-1 font-medium leading-none">
              You are lagging behind the topper by {lag}%
              <TrendingDown className="h-4 w-4 text-red-500" />
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Subject Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                data={rankData}
                height={160}
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
          <CardFooter className="flex items-center justify-center gap-2 text-sm">
            <div className="flex gap-1 font-medium leading-none">
              Rank Improvement
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Subject Score</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                data={scoreData}
                height={160}
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
          <CardFooter className="flex items-center justify-center gap-2 text-sm">
            <div className="flex gap-1 font-medium leading-none">
              Trending up by {scoreImprovement}%
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Questions Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={questionConfig}>
              <BarChart data={questionData} height={300}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="topper" fill="var(--chart-1)" radius={4} />
                <Bar dataKey="you" fill="var(--chart-2)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              You are lagging behind the topper by {lag}%{" "}
              <TrendingDown className="h-4 w-4 text-red-500" />
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                data={scoreData}
                height={300}
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
              Score Improvement: {scoreImprovement}%
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SubjectAnalytics;
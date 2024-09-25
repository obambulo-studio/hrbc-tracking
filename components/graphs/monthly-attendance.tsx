"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function MonthlyAttendance({ data }: any) {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  const filteredData = data.filter((item: any) => {
    const itemMonth = new Date(item.date).toISOString().slice(0, 7);
    return itemMonth === selectedMonth;
  });

  const chartData = [
    { ageBracket: "0-4", male: 0, female: 0 },
    { ageBracket: "5-9", male: 0, female: 0 },
    { ageBracket: "10-14", male: 0, female: 0 },
    { ageBracket: "15-19", male: 0, female: 0 },
    { ageBracket: "20-24", male: 0, female: 0 },
    { ageBracket: "25-29", male: 0, female: 0 },
    { ageBracket: "30-34", male: 0, female: 0 },
    { ageBracket: "35-39", male: 0, female: 0 },
    { ageBracket: "40-44", male: 0, female: 0 },
    { ageBracket: "45-49", male: 0, female: 0 },
    { ageBracket: "50-54", male: 0, female: 0 },
    { ageBracket: "55-59", male: 0, female: 0 },
    { ageBracket: "60-64", male: 0, female: 0 },
    { ageBracket: "65-69", male: 0, female: 0 },
    { ageBracket: "70-74", male: 0, female: 0 },
    { ageBracket: "75-79", male: 0, female: 0 },
    { ageBracket: "80-84", male: 0, female: 0 },
    { ageBracket: "85-89", male: 0, female: 0 },
    { ageBracket: "90-94", male: 0, female: 0 },
    { ageBracket: "95+", male: 0, female: 0 },
  ];

  filteredData.forEach((item: any) => {
    chartData[0].male += item.maleZeroToFour;
    chartData[0].female += item.femaleZeroToFour;
    chartData[1].male += item.maleFiveToNine;
    chartData[1].female += item.femaleFiveToNine;
    chartData[2].male += item.maleTenToFourteen;
    chartData[2].female += item.femaleTenToFourteen;
    chartData[3].male += item.maleFifteenToNineteen;
    chartData[3].female += item.femaleFifteenToNineteen;
    chartData[4].male += item.maleTwentyToTwentyFour;
    chartData[4].female += item.femaleTwentyToTwentyFour;
    chartData[5].male += item.maleTwentyFiveToTwentyNine;
    chartData[5].female += item.femaleTwentyFiveToTwentyNine;
    chartData[6].male += item.maleThirtyToThirtyFour;
    chartData[6].female += item.femaleThirtyToThirtyFour;
    chartData[7].male += item.maleThirtyFiveToThirtyNine;
    chartData[7].female += item.femaleThirtyFiveToThirtyNine;
    chartData[8].male += item.maleFortyToFortyFour;
    chartData[8].female += item.femaleFortyToFortyFour;
    chartData[9].male += item.maleFortyFiveToFortyNine;
    chartData[9].female += item.femaleFortyFiveToFortyNine;
    chartData[10].male += item.maleFiftyToFiftyFour;
    chartData[10].female += item.femaleFiftyToFiftyFour;
    chartData[11].male += item.maleFiftyFiveToFiftyNine;
    chartData[11].female += item.femaleFiftyFiveToFiftyNine;
    chartData[12].male += item.maleSixtyToSixtyFour;
    chartData[12].female += item.femaleSixtyToSixtyFour;
    chartData[13].male += item.maleSixtyFiveToSixtyNine;
    chartData[13].female += item.femaleSixtyFiveToSixtyNine;
    chartData[14].male += item.maleSeventyToSeventyFour;
    chartData[14].female += item.femaleSeventyToSeventyFour;
    chartData[15].male += item.maleSeventyFiveToSeventyNine;
    chartData[15].female += item.femaleSeventyFiveToSeventyNine;
    chartData[16].male += item.maleEightyToEightyFour;
    chartData[16].female += item.femaleEightyToEightyFour;
    chartData[17].male += item.maleEightyFiveToEightyNine;
    chartData[17].female += item.femaleEightyFiveToEightyNine;
    chartData[18].male += item.maleNinetyToNinetyFour;
    chartData[18].female += item.femaleNinetyToNinetyFour;
    chartData[19].male += item.maleNinetyFivePlus;
    chartData[19].female += item.femaleNinetyFivePlus;
  });

  const chartConfig = {
    male: {
      label: "Male",
      color: "#e21d48",
    },
    female: {
      label: "Female",
      color: "#fbd5da",
    },
  } satisfies ChartConfig;

  return (
    <div className="space-y-6 w">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
          <CardDescription>
            Showing total attendance for males and females by age for each
            month.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            onValueChange={handleMonthChange}
            defaultValue={
              new Date().toISOString().split("-")[0] +
              "-" +
              (new Date().getMonth() + 1).toString().padStart(2, "0")
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-01">January 2024</SelectItem>
              <SelectItem value="2024-02">February 2024</SelectItem>
              <SelectItem value="2024-03">March 2024</SelectItem>
              <SelectItem value="2024-04">April 2024</SelectItem>
              <SelectItem value="2024-05">May 2024</SelectItem>
              <SelectItem value="2024-06">June 2024</SelectItem>
              <SelectItem value="2024-07">July 2024</SelectItem>
              <SelectItem value="2024-08">August 2024</SelectItem>
              <SelectItem value="2024-09">September 2024</SelectItem>
              <SelectItem value="2024-10">October 2024</SelectItem>
              <SelectItem value="2024-11">November 2024</SelectItem>
              <SelectItem value="2024-12">December 2024</SelectItem>
            </SelectContent>
          </Select>

          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="ageBracket"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />

              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="male" fill="var(--color-male)" radius={4} />
              <Bar dataKey="female" fill="var(--color-female)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

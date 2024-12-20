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
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

export const description = "An area chart with gradient fill";

const chartConfig = {
  male: {
    label: "Male",
    color: "#e21d48",
  },
  female: {
    label: "Female",
    color: "#fbd5da",
  },
  total: {
    label: "Total",
    color: "#DC2626",
  },
} satisfies ChartConfig;

interface DataEntry {
  date: string;
  service: string;
  maleZeroToFour: number;
  maleFiveToNine: number;
  maleTenToFourteen: number;
  maleFifteenToNineteen: number;
  maleTwentyToTwentyFour: number;
  maleTwentyFiveToTwentyNine: number;
  maleThirtyToThirtyFour: number;
  maleThirtyFiveToThirtyNine: number;
  maleFortyToFortyFour: number;
  maleFortyFiveToFortyNine: number;
  maleFiftyToFiftyFour: number;
  maleFiftyFiveToFiftyNine: number;
  maleSixtyToSixtyFour: number;
  maleSixtyFiveToSixtyNine: number;
  maleSeventyToSeventyFour: number;
  maleSeventyFiveToSeventyNine: number;
  maleEightyToEightyFour: number;
  maleEightyFiveToEightyNine: number;
  maleNinetyToNinetyFour: number;
  maleNinetyFivePlus: number;
  femaleZeroToFour: number;
  femaleFiveToNine: number;
  femaleTenToFourteen: number;
  femaleFifteenToNineteen: number;
  femaleTwentyToTwentyFour: number;
  femaleTwentyFiveToTwentyNine: number;
  femaleThirtyToThirtyFour: number;
  femaleThirtyFiveToThirtyNine: number;
  femaleFortyToFortyFour: number;
  femaleFortyFiveToFortyNine: number;
  femaleFiftyToFiftyFour: number;
  femaleFiftyFiveToFiftyNine: number;
  femaleSixtyToSixtyFour: number;
  femaleSixtyFiveToSixtyNine: number;
  femaleSeventyToSeventyFour: number;
  femaleSeventyFiveToSeventyNine: number;
  femaleEightyToEightyFour: number;
  femaleEightyFiveToEightyNine: number;
  femaleNinetyToNinetyFour: number;
  femaleNinetyFivePlus: number;
  total: number;
}

interface YearlyBreakdownProps {
  data: DataEntry[];
}

export function ServiceYearlyBreakdown({ data }: YearlyBreakdownProps) {
  const [selectedService, setSelectedService] =
    useState<string>("FIRST_SERVICE");

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
  };

  const chartData = useMemo(() => {
    const monthlyData = Object.fromEntries(
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].map((month) => [month, { month, male: 0, female: 0, total: 0 }]),
    );

    data.forEach((entry) => {
      if (entry.service !== selectedService) return;

      const month = new Date(entry.date).toLocaleString("default", {
        month: "long",
      });
      const maleTotal = Object.entries(entry)
        .filter(([key]) => key.startsWith("male") && key !== "male")
        .reduce((sum, [, value]) => sum + (value as number), 0);
      const femaleTotal = Object.entries(entry)
        .filter(([key]) => key.startsWith("female") && key !== "female")
        .reduce((sum, [, value]) => sum + (value as number), 0);

      monthlyData[month].male += maleTotal;
      monthlyData[month].female += femaleTotal;
      monthlyData[month].total += entry.total;
    });

    return Object.values(monthlyData);
  }, [data, selectedService]); // Add selectedService to the dependency array

  return (
    <Card>
      <CardHeader>
        <CardTitle>Per Service Yearly Breakdown</CardTitle>
        <CardDescription>
          Showing total attendance for males and females for each month of the
          year per service.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select
          onValueChange={handleServiceChange}
          defaultValue="FIRST_SERVICE"
          value={selectedService}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FIRST_SERVICE">First Service</SelectItem>
            <SelectItem value="SECOND_SERVICE">Second Service</SelectItem>
            <SelectItem value="THIRD_SERVICE">Third Service</SelectItem>
          </SelectContent>
        </Select>

        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
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
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillMale" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-male)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-male)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillFemale" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-female)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-female)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-total)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-total)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="female"
                type="natural"
                fill="url(#fillFemale)"
                fillOpacity={0.4}
                stroke="var(--color-female)"
                stackId="a"
              />
              <Area
                dataKey="male"
                type="natural"
                fill="url(#fillMale)"
                fillOpacity={0.4}
                stroke="var(--color-male)"
                stackId="a"
              />
              <Area
                dataKey="total"
                type="natural"
                fill="url(#fillTotal)"
                fillOpacity={0.4}
                stroke="var(--color-total)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <p>No data available for the selected service.</p>
        )}
      </CardContent>
    </Card>
  );
}

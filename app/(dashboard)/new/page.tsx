"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { CalendarIcon, Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

type AgeBrackets = {
  [key: string]: number;
};

const formSchema = z.object({
  attendees: z.array(
    z.object({
      ageBracket: z.string(),
      count: z.number().min(0),
      gender: z.string(),
    }),
  ),
});

export default function NewEntryPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [maleAgeBrackets, setMaleAgeBrackets] = useState<AgeBrackets>({
    "0-4": 0,
    "5-9": 0,
    "10-14": 0,
    "15-19": 0,
    "20-24": 0,
    "25-29": 0,
    "30-34": 0,
    "35-39": 0,
    "40-44": 0,
    "45-49": 0,
    "50-54": 0,
    "55-59": 0,
    "60-64": 0,
    "65-69": 0,
    "70-74": 0,
    "75-79": 0,
    "80-84": 0,
    "85-89": 0,
    "90-94": 0,
    "95+": 0,
  });
  const [femaleAgeBrackets, setFemaleAgeBrackets] = useState<AgeBrackets>({
    "0-4": 0,
    "5-9": 0,
    "10-14": 0,
    "15-19": 0,
    "20-24": 0,
    "25-29": 0,
    "30-34": 0,
    "35-39": 0,
    "40-44": 0,
    "45-49": 0,
    "50-54": 0,
    "55-59": 0,
    "60-64": 0,
    "65-69": 0,
    "70-74": 0,
    "75-79": 0,
    "80-84": 0,
    "85-89": 0,
    "90-94": 0,
    "95+": 0,
  });
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const updateBracket = (
    bracket: string,
    increment: boolean,
    gender: "male" | "female",
  ) => {
    const setAgeBrackets =
      gender === "male" ? setMaleAgeBrackets : setFemaleAgeBrackets;
    const ageBrackets = gender === "male" ? maleAgeBrackets : femaleAgeBrackets;

    setAgeBrackets((prev) => {
      const newCount = increment
        ? prev[bracket] + 1
        : Math.max(0, prev[bracket] - 1);
      return { ...prev, [bracket]: newCount };
    });
    toast({
      title: `${increment ? "Incremented" : "Decremented"} ${gender} ${bracket}`,
      description: `New count: ${
        increment
          ? ageBrackets[bracket] + 1
          : Math.max(0, ageBrackets[bracket] - 1)
      }`,
      variant: increment ? undefined : "destructive",
    });
  };

  const handleIncrement = (bracket: string, gender: "male" | "female") =>
    updateBracket(bracket, true, gender);
  const handleDecrement = (bracket: string, gender: "male" | "female") =>
    updateBracket(bracket, false, gender);

  const handleInputChange = (
    bracket: string,
    value: string,
    gender: "male" | "female",
  ) => {
    const numValue = parseInt(value, 10);
    const setAgeBrackets =
      gender === "male" ? setMaleAgeBrackets : setFemaleAgeBrackets;

    if (!isNaN(numValue) && numValue >= 0) {
      setAgeBrackets((prev) => ({
        ...prev,
        [bracket]: numValue,
      }));
    }
  };

  async function handleSubmit() {
    setLoading(true);

    const formattedData = {
      date: date.toISOString(),
      maleZeroToFour: maleAgeBrackets["0-4"],
      femaleZeroToFour: femaleAgeBrackets["0-4"],
      maleFiveToNine: maleAgeBrackets["5-9"],
      femaleFiveToNine: femaleAgeBrackets["5-9"],
      maleTenToFourteen: maleAgeBrackets["10-14"],
      femaleTenToFourteen: femaleAgeBrackets["10-14"],
      maleFifteenToNineteen: maleAgeBrackets["15-19"],
      femaleFifteenToNineteen: femaleAgeBrackets["15-19"],
      maleTwentyToTwentyFour: maleAgeBrackets["20-24"],
      femaleTwentyToTwentyFour: femaleAgeBrackets["20-24"],
      maleTwentyFiveToTwentyNine: maleAgeBrackets["25-29"],
      femaleTwentyFiveToTwentyNine: femaleAgeBrackets["25-29"],
      maleThirtyToThirtyFour: maleAgeBrackets["30-34"],
      femaleThirtyToThirtyFour: femaleAgeBrackets["30-34"],
      maleThirtyFiveToThirtyNine: maleAgeBrackets["35-39"],
      femaleThirtyFiveToThirtyNine: femaleAgeBrackets["35-39"],
      maleFortyToFortyFour: maleAgeBrackets["40-44"],
      femaleFortyToFortyFour: femaleAgeBrackets["40-44"],
      maleFortyFiveToFortyNine: maleAgeBrackets["45-49"],
      femaleFortyFiveToFortyNine: femaleAgeBrackets["45-49"],
      maleFiftyToFiftyFour: maleAgeBrackets["50-54"],
      femaleFiftyToFiftyFour: femaleAgeBrackets["50-54"],
      maleFiftyFiveToFiftyNine: maleAgeBrackets["55-59"],
      femaleFiftyFiveToFiftyNine: femaleAgeBrackets["55-59"],
      maleSixtyToSixtyFour: maleAgeBrackets["60-64"],
      femaleSixtyToSixtyFour: femaleAgeBrackets["60-64"],
      maleSixtyFiveToSixtyNine: maleAgeBrackets["65-69"],
      femaleSixtyFiveToSixtyNine: femaleAgeBrackets["65-69"],
      maleSeventyToSeventyFour: maleAgeBrackets["70-74"],
      femaleSeventyToSeventyFour: femaleAgeBrackets["70-74"],
      maleSeventyFiveToSeventyNine: maleAgeBrackets["75-79"],
      femaleSeventyFiveToSeventyNine: femaleAgeBrackets["75-79"],
      maleEightyToEightyFour: maleAgeBrackets["80-84"],
      femaleEightyToEightyFour: femaleAgeBrackets["80-84"],
      maleEightyFiveToEightyNine: maleAgeBrackets["85-89"],
      femaleEightyFiveToEightyNine: femaleAgeBrackets["85-89"],
      maleNinetyToNinetyFour: maleAgeBrackets["90-94"],
      femaleNinetyToNinetyFour: femaleAgeBrackets["90-94"],
      maleNinetyFivePlus: maleAgeBrackets["95+"],
      femaleNinetyFivePlus: femaleAgeBrackets["95+"],
      total:
        Object.values(maleAgeBrackets).reduce((acc, curr) => acc + curr, 0) +
        Object.values(femaleAgeBrackets).reduce((acc, curr) => acc + curr, 0),
    };

    try {
      const response = await fetch("/api/entry/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      toast({
        title: "Success",
        description: "Data submitted successfully!",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "An error occurred while submitting the data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 my-12 border rounded-2xl">
      <div>
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">New Entry</h1>
            <p className="text-sm text-muted-foreground">
              Please enter the number of attendees for each age bracket and
              gender.
            </p>
            <div className="flex items-center space-x-4 mb-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex gap-4">
            {["male", "female"].map((gender) => (
              <Table key={gender} className="min-w-[45%]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-full text-center" colSpan={3}>
                      {gender.charAt(0).toUpperCase() + gender.slice(1)} Age
                      Distribution
                    </TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead>Age Bracket</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableCaption>
                  {gender.charAt(0).toUpperCase() + gender.slice(1)} Age
                  Distribution
                </TableCaption>

                <TableBody>
                  {Object.entries(
                    gender === "male" ? maleAgeBrackets : femaleAgeBrackets,
                  ).map(([bracket, count]) => (
                    <TableRow key={`${gender}-${bracket}`}>
                      <TableCell className="text-lg font-bold">
                        {bracket}
                      </TableCell>
                      <TableCell className="text-lg font-bold">
                        <Input
                          type="number"
                          value={count}
                          onChange={(e) =>
                            handleInputChange(
                              bracket,
                              e.target.value,
                              gender as "male" | "female",
                            )
                          }
                          min="0"
                          className="w-20 text-center"
                        />
                      </TableCell>
                      <TableCell className="flex justify-center space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleDecrement(
                              bracket,
                              gender as "male" | "female",
                            )
                          }
                        >
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleIncrement(
                              bracket,
                              gender as "male" | "female",
                            )
                          }
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Total Entries</TableCell>
                    <TableCell className="text-right">
                      {Object.values(
                        gender === "male" ? maleAgeBrackets : femaleAgeBrackets,
                      ).reduce((acc, curr) => acc + curr, 0)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            ))}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <div>
                <Button className="w-full">Submit</Button>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Confirm Submission</DialogTitle>
              <DialogDescription>
                Are you sure you want to submit the entry for{" "}
                {format(date, "PPP")}?
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <PlusCircle className="mr-2 h-4 w-4" />
                  )}
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

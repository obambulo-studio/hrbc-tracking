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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
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
import { useEffect, useState } from "react";
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
  const [selectedService, setSelectedService] = useState<string | null>(null); // State for selected service
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // Add this useEffect to check if date and service are selected
  useEffect(() => {
    setIsSubmitDisabled(!date || !selectedService);
  }, [date, selectedService]);

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

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    toast({
      title: "Service Selected",
      description: `You have selected: ${service}`,
    });
  };

  async function handleSubmit() {
    if (isSubmitDisabled) {
      toast({
        title: "Submission Error",
        description:
          "Please select both a date and a service before submitting.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const formattedData = {
      date: date.toISOString(),
      service: selectedService,
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
    <div className="max-w-sm mx-auto p-6 my-12 border rounded-2xl">
      <div>
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">New Entry</h1>
            <p className="text-sm text-muted-foreground">
              Please enter the number of attendees for each age bracket and
              gender.
            </p>
            <div className="space-y-1">
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

              <div>
                <Select
                  onValueChange={(value) => {
                    setSelectedService(value);
                    handleServiceSelect(value); // Trigger handleServiceSelect
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select a service</SelectLabel>
                      <SelectItem value="FIRST_SERVICE">
                        First Service
                      </SelectItem>
                      <SelectItem value="SECOND_SERVICE">
                        Second Service
                      </SelectItem>
                      <SelectItem value="THIRD_SERVICE">
                        Third Service
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Male</TableHead>
                <TableHead className="text-center">Age</TableHead>
                <TableHead className="text-center">Female</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(maleAgeBrackets).map(([bracket, maleCount]) => {
                const femaleCount = femaleAgeBrackets[bracket];
                return (
                  <TableRow key={bracket}>
                    <TableCell className="p-2">
                      <div className="flex items-center justify-center space-x-0.5">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleDecrement(bracket, "male")}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                        <Input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={maleCount}
                          onChange={(e) =>
                            handleInputChange(bracket, e.target.value, "male")
                          }
                          className="w-10 text-center"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleIncrement(bracket, "male")}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-center p-2">
                      {bracket}
                    </TableCell>
                    <TableCell className="p-2">
                      <div className="flex items-center justify-center space-x-0.5">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleDecrement(bracket, "female")}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                        <Input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={femaleCount}
                          onChange={(e) =>
                            handleInputChange(bracket, e.target.value, "female")
                          }
                          className="w-10 text-center"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleIncrement(bracket, "female")}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="text-right">
                  Total:{" "}
                  {Object.values(maleAgeBrackets).reduce(
                    (acc, curr) => acc + curr,
                    0,
                  )}
                </TableCell>
                <TableCell />
                <TableCell className="text-right">
                  Total:{" "}
                  {Object.values(femaleAgeBrackets).reduce(
                    (acc, curr) => acc + curr,
                    0,
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <Dialog>
            {isSubmitDisabled ? (
              <Button className="w-full" disabled={true}>
                Submit
              </Button>
            ) : (
              <DialogTrigger asChild>
                <Button className="w-full">Submit</Button>
              </DialogTrigger>
            )}
            <DialogContent>
              <DialogTitle>Confirm Submission</DialogTitle>
              <DialogDescription>
                Are you sure you want to submit the entry for{" "}
                {date ? format(date, "PPP") : "the selected date"}?
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

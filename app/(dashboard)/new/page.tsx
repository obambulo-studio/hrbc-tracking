"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation"; // Add this import
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
    }),
  ),
});

export default function NewEntryPage() {
  const { toast } = useToast();
  const router = useRouter(); // Initialize the router
  const [ageBrackets, setAgeBrackets] = useState<AgeBrackets>({
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
  const [loading, setLoading] = useState(false); // Add loading state

  const updateBracket = (bracket: string, increment: boolean) => {
    setAgeBrackets((prev) => {
      const newCount = increment
        ? prev[bracket] + 1
        : Math.max(0, prev[bracket] - 1);
      return { ...prev, [bracket]: newCount };
    });
    toast({
      title: `${increment ? "Incremented" : "Decremented"} ${bracket}`,
      description: `New count: ${
        increment
          ? ageBrackets[bracket] + 1
          : Math.max(0, ageBrackets[bracket] - 1)
      }`,
      variant: increment ? undefined : "destructive",
    });
  };

  const handleIncrement = (bracket: string) => updateBracket(bracket, true);
  const handleDecrement = (bracket: string) => updateBracket(bracket, false);

  async function handleSubmit() {
    setLoading(true); // Set loading to true
    const attendees = Object.entries(ageBrackets)
      .map(([ageBracket, count]) => ({ ageBracket, count }))
      .filter((attendee) => attendee.count > 0);

    const result = formSchema.safeParse({ attendees });
    if (!result.success) {
      setLoading(false); // Reset loading on error
      toast({
        title: "Validation Error",
        description: result.error.errors.map((e) => e.message).join(", "),
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: new Date().toISOString(),
          zeroToFour: ageBrackets["0-4"],
          fiveToNine: ageBrackets["5-9"],
          tenToFourteen: ageBrackets["10-14"],
          fifteenToNineteen: ageBrackets["15-19"],
          twentyToTwentyFour: ageBrackets["20-24"],
          twentyFiveToTwentyNine: ageBrackets["25-29"],
          thirtyToThirtyFour: ageBrackets["30-34"],
          thirtyFiveToThirtyNine: ageBrackets["35-39"],
          fortyToFortyFour: ageBrackets["40-44"],
          fortyFiveToFortyNine: ageBrackets["45-49"],
          fiftyToFiftyFour: ageBrackets["50-54"],
          fiftyFiveToFiftyNine: ageBrackets["55-59"],
          sixtyToSixtyFour: ageBrackets["60-64"],
          sixtyFiveToSixtyNine: ageBrackets["65-69"],
          seventyToSeventyFour: ageBrackets["70-74"],
          seventyFiveToSeventyNine: ageBrackets["75-79"],
          eightyToEightyFour: ageBrackets["80-84"],
          eightyFiveToEightyNine: ageBrackets["85-89"],
          ninetyToNinetyFour: ageBrackets["90-94"],
          ninetyFivePlus: ageBrackets["95+"],
          total: Object.values(ageBrackets).reduce(
            (acc, curr) => acc + curr,
            0,
          ),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      toast({
        title: "Success",
        description: "Data submitted successfully!",
      });
      router.push("/"); // Redirect to home
    } catch {
      toast({
        title: "Submission Error",
        description: "An error occurred while submitting the data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 my-12 bg-black border rounded-2xl">
      <div>
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(ageBrackets).map(([bracket, count]) => (
              <div key={bracket} className="flex flex-col space-y-1.5">
                <Label
                  className="text-center font-semibold text-lg"
                  htmlFor={`age-${bracket}`}
                >{`${bracket}`}</Label>
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    type="button"
                    size="icon"
                    onClick={() => handleDecrement(bracket)}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center text-sm">{count}</span>
                  <Button
                    type="button"
                    size="icon"
                    onClick={() => handleIncrement(bracket)}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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
                Are you sure the numbers are correct?
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="destructive">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : "Confirm"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

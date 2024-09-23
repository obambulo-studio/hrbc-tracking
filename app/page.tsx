import { entryColumns } from "@/components/columns";
import { EntryDataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const data = await prisma.entry.findMany();

  return (
    <div className="max-w-2xl mx-auto p-6 my-12 bg-black border rounded-2xl">
      <Tabs defaultValue="entries" className="space-y-4">
        <TabsList className="w-auto grid grid-cols-2  h-auto">
          {["entries", "analytics"].map((tab) => (
            <TabsTrigger key={tab} value={tab} className="w-full">
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="entries">
          <Link href="/new">
            <Button>New Entry</Button>
          </Link>
          <EntryDataTable columns={entryColumns} data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

import Analytics from "@/components/analytics";
import { entryColumns } from "@/components/columns";
import { EntryDataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const data = await prisma.entry.findMany();

  return (
    <div className="max-w-sm mx-auto p-6 my-12 ">
      <Tabs defaultValue="entries" className="space-y-6">
        <TabsList className="w-auto grid grid-cols-2  h-auto">
          {["entries", "analytics"].map((tab) => (
            <TabsTrigger key={tab} value={tab} className="w-full">
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="entries" className="space-y-6">
          <Link href="/new">
            <Button className="w-full">New Entry</Button>
          </Link>

          <Card>
            <CardContent>
              <EntryDataTable columns={entryColumns} data={data} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-6">
          <Analytics data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

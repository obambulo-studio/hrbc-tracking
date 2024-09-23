"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import EntryActions from "./actions";

type Entry = {
  id: string;
  date: Date;
  total: number;
};

export const entryColumns: ColumnDef<Entry>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.date;
      const formattedDate = format(new Date(date), "do MMMM yyyy");
      return (
        <div className="flex items-center">
          <span>{formattedDate}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "total",
    header: "Total Attendees",
    cell: ({ row }) => {
      const attendeesCount = row.original.total;
      return (
        <div className="flex items-center">
          <span>{attendeesCount}</span>
        </div>
      );
    },
  },

  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;

      return <EntryActions id={id} />;
    },
  },
];

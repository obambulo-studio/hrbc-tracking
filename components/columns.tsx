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
      return (
        <div className="flex items-center">
          <span>{format(new Date(row.original.date), "dd/LL/yyyy")}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "total",
    header: "Attendees",
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

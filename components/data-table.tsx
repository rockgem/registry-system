"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddPersonSheet from "./add-new-person-sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export type Person = {
  id: number;
  createdAt: Date;
  dateOfBirth: Date;
  firstName: string;
  middleName: string;
  lastName: string;
};

export const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Button variant="ghost">
        UID
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "first_name",
    header: ({ table }) => (
      <Button variant="ghost">
        First Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("first_name")}</div>,
  },
  {
    accessorKey: "middle_name",
    header: ({ table }) => (
      <Button variant="ghost">
        Middle Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("middle_name")}</div>,
  },
  {
    accessorKey: "last_name",
    header: ({ table }) => (
      <Button variant="ghost">
        Last Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("last_name")}</div>,
  },
  {
    id: "date_of_birth",
    header: ({ table }) => (
      <Button variant="ghost">
        Date of Birth
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("date_of_birth")}</div>,
  },
  {
    id: "created_at",
    header: ({ table }) => (
      <Button variant="ghost">
        Date Created
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("created_at")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable() {
  const [data, setData] = React.useState<Person[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 15, // Increase the number of rows displayed per page
      },
    },
  });

  async function fetchData() {
    const supabase = await createClient();

    const { data, error } = await supabase.from("users").select("*");

    if (error) throw error;

    setData(data);
  }

  async function subscribeToChanges() {
    console.log("Subscribing to changes...");
    const supabase = await createClient();
    const sub = supabase
      .channel("users")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "users" },
        (payload: any) => {
            setData((prevData) => [...prevData, payload.new]);
        }
      ).on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        (payload: any) => {
          setData((prevData) => prevData.map((item) => item.id === payload.new.id ? payload.new : item));
        }
      ).on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "users" },
        (payload: any) => {
          setData((prevData) => prevData.filter((item) => item.id !== payload.old.id));
        }
      )
      .subscribe();
  }

  useEffect(() => {
    fetchData();
    subscribeToChanges();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex max-w-sm">
          <Input
            autoComplete="off"
            autoCorrect="off"
            placeholder="Search..."
            value={
              (table.getColumn("first_name")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("first_name")?.setFilterValue(event.target.value)
            }
            className="min-w-sm mr-[10px]"
          />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first_name">First Name</SelectItem>
              <SelectItem value="middle_name">Middle Name</SelectItem>
              <SelectItem value="last_name">Last Name</SelectItem>
              <SelectItem value="uid">ID</SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-4">
            <AddPersonSheet></AddPersonSheet>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex text-sm text-muted-foreground">
          <Label className="mr-4">Rows per page:</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Rows"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">50</SelectItem>
              <SelectItem value="30">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

import { DataTable } from "@/components/data-table";
import NavUser from "@/components/nav-user";
import { Label } from "@/components/ui/label";

export default function Dashboard() {
  return (
    <div className="max-w-[1100px] m-auto mt-16">
      <div className="flex justify-between">
        <NavUser></NavUser>
        <div className="flex flex-col items-end justify-center">
          <Label className="text-1xl">Rock Software.</Label>
          <Label className="text-muted-foreground">People Registry System</Label>
        </div>
      </div>

      <div className="mt-16">
        <DataTable></DataTable>
      </div>
    </div>
  );
}

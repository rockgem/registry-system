'use client'

import { UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { DatePicker } from "./date-picker";
import { useState } from "react";
import { savePerson } from "@/app/dashboard/add-person-actions";

export default function AddPersonSheet() {

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState(new Date());

  

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button>
            <UserPlus></UserPlus>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add new profile</SheetTitle>
            <SheetDescription>
              Create a new person data here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>

          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 gap-2 px-6">
              <Label>Identification</Label>
              <Separator></Separator>
              <Input autoComplete="off" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}></Input>
              <Input autoComplete="off" placeholder="Middle Name" value={middleName} onChange={(e) => setMiddleName(e.target.value)}></Input>
              <Input autoComplete="off" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}></Input>
            </div>

            <div className="grid grid-cols-1 gap-2 px-6">
              <Label>Date of Birth</Label>
              <Separator></Separator>
              <DatePicker></DatePicker>
              <Label>Age: 0 y/o</Label>
            </div>
          </div>

          <SheetFooter>
            <Button onClick={() => savePerson({first_name: firstName, middle_name: middleName, last_name: lastName})}>Save</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

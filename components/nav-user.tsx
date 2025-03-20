'use client'

import {
  Computer,
  Dot,
  Ghost,
  Lightbulb,
  LogOutIcon,
  Moon,
  MoreVerticalIcon,
  Settings,
  Sun,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logout } from "@/app/login/login-actions";
import { useTheme } from "next-themes";

export default function NavUser() {
  const { setTheme } = useTheme()
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="py-10">
          <Avatar>
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <div className="flex-col justify-items-start">
            <p className="truncate font-s">Admin</p>
            <p className="truncate text-xs text-muted-foreground">
              adminsystem@gmail.com
            </p>
          </div>
          <MoreVerticalIcon></MoreVerticalIcon>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Lightbulb /> Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon /> Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Computer /> System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={logout}>
          <LogOutIcon></LogOutIcon>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

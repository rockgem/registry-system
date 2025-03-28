import { PersonStanding } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "./ui/sidebar";
import NavUser from "./nav-user";
import Link from "next/link";



export default function MySidebar(){
    
    return(
        <div>
            <Sidebar>
                <SidebarHeader>
                    Rock Software
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild><Link href={'#'}>People table</Link></SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild><Link href={'#'}>Ayuda list</Link></SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <NavUser></NavUser>
                </SidebarFooter>
                
            </Sidebar>
        </div>
    )
}
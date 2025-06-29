"use client";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardSidebarFooter from "./DashboardSidebarFooter";

// Menu items.
const firstSection = [
  {
    title: "Meetings",
    url: "/meetings",
    icon: VideoIcon,
  },
  {
    title: "Agents",
    url: "/agents",
    icon: BotIcon,
  },
];
const secondSection = [
  {
    title: "Upgrade",
    url: "/upgrade",
    icon: StarIcon,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <Sidebar>
        <SidebarHeader className="text-sidebar-accent-foreground">
          <Link href={"/"} className="flex px-2 pt-2 items-center gap-2">
            <span className="text-4xl">🌀</span>
            <p>AI Meet</p>
          </Link>
        </SidebarHeader>
        <div className="px-2 py-2">
          <Separator className="opacity-10 text-[#5D6B68] " />
        </div>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {firstSection.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span className="text-sm font-medium tracking-tight  ">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <div className="px-2 py-2">
            <Separator className="opacity-10 text-[#5D6B68] " />
          </div>
          {/* second part */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {secondSection.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span className="text-sm font-medium tracking-tight  ">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
               <DashboardSidebarFooter/>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};
export default AppSidebar;

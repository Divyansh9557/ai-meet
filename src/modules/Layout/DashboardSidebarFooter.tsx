import GeneratedAvatar from "@/components/GeneratedAvatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";
import { Button } from "@/components/ui/button";

const DashboardSidebarFooter = () => {
  const { data, isPending } = authClient.useSession();
  const isMobile = useIsMobile();

  const router = useRouter();

  if (isPending && !data?.user) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
          {data?.user.image ? (
            <Avatar className="mr-3">
              <AvatarImage src={data?.user?.image || ""} alt={data.user.name} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={data?.user?.name || ""}
              className="size-9 mr-3"
              varient="initials"
            />
          )}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full">{data?.user.name}</p>
            <p className="text-xs truncate w-full">{data?.user.email}</p>
          </div>
          <ChevronDownIcon />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data?.user.name}</DrawerTitle>
            <DrawerDescription>{data?.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="outline" onClick={() => {}}>
              <CreditCardIcon className="size-4 text-black" />
              Billing
            </Button>

            <Button variant="outline" onClick={()=>{
              authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/sign-in");
                },
              },
            });
            } }>
              <LogOutIcon className="size-4 text-black" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
        {data?.user.image ? (
          <Avatar className="mr-3">
            <AvatarImage src={data?.user?.image || ""} alt={data.user.name} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data?.user?.name || ""}
            className="size-9 mr-3"
            varient="initials"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">{data?.user.name}</p>
          <p className="text-xs truncate w-full">{data?.user.email}</p>
        </div>
        <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data?.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground">
              {data?.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/sign-in");
                },
              },
            });
          }}
          className="cursor-pointer flex items-center justify-between"
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardSidebarFooter;



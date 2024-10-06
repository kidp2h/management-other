'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Skeleton } from '../ui/skeleton';

export function UserNav() {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative size-8 rounded-full"
              >
                <Avatar className="size-8">
                  <AvatarImage src={`${user?.imageUrl}`} alt="Avatar" />
                  <AvatarFallback className="bg-transparent">
                    <Skeleton className="size-full rounded-full" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Tài khoản</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {!isLoaded || !user?.fullName ? (
                <Skeleton className="mb-2 h-3 w-full" />
              ) : (
                user?.fullName
              )}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {!isLoaded || !user?.fullName ? (
                <Skeleton className="mb-2 h-3 w-3/5" />
              ) : (
                ''
              )}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/account" className="flex items-center">
              <User className="mr-3 size-4 text-muted-foreground" />
              Tài khoản của tôi
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => signOut({ redirectUrl: '/auth' })}
        >
          <LogOut className="mr-3 size-4 text-muted-foreground" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

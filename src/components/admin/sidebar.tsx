
"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cpu, LayoutDashboard, Home, LogOut } from 'lucide-react';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
  Sidebar,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { signOutUser } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/login');
  };

  return (
    <Sidebar collapsible="icon" className="hidden border-r bg-background md:block">
        <div className="flex flex-col h-full">
        <SidebarHeader>
            <Link href="/" className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                <Cpu className="h-8 w-8 text-primary" />
                <span className="text-lg font-bold tracking-tight text-foreground">
                Sevengen
                </span>
            </Link>
        </SidebarHeader>
        <SidebarContent className="p-2 flex-1">
            <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/admin'} tooltip="Pedidos de Orçamento">
                    <Link href="/admin">
                        <LayoutDashboard />
                        <span>Pedidos de Orçamento</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
            <Separator className="my-2" />
            <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Voltar ao Site">
                    <Link href="/">
                        <Home />
                        <span>Voltar ao Site</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={handleSignOut} tooltip="Sair">
                    <LogOut />
                    <span>Sair</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
        </div>
    </Sidebar>
  );
}

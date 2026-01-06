import { AdminSidebar } from '@/components/admin/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/40 flex-1">
      <SidebarProvider>
        <div className="container max-w-screen-2xl flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]">
            <AdminSidebar />
          <main className="py-6 lg:py-8">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}

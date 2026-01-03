import Link from 'next/link';
import { LayoutDashboard, FileText, FolderOpen, Settings, Video, LogOut, ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 sidebar-gradient border-r border-border flex flex-col z-50">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-background font-bold text-xl">A</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">Admin Panel</h1>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto" data-lenis-prevent>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2 mb-2">
            Main Menu
          </div>

          {[
            { href: "/admin-panel", icon: LayoutDashboard, label: "Dashboard" },
            { href: "/admin-panel/blogs", icon: FileText, label: "Blogs" },
            { href: "/admin-panel/create-blog", icon: FileText, label: "Create Blog" },
            { href: "/admin-panel/categories", icon: FolderOpen, label: "Categories" },
            { href: "/admin-panel/craft-videos", icon: Video, label: "Craft Videos" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>

        <div className="p-2 mt-auto">
          <div className="p-4 bg-accent/50 rounded-2xl border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground capitalize">Super Admin</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-background relative">
        {/* Header/Top Bar */}
        <header className="h-20 border-b border-border flex items-center justify-between px-8 bg-background/50 backdrop-blur-md sticky top-0 z-40">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Welcome back, Admin</h2>
          </div>
          <div className="flex items-center gap-4">
            {/* Dynamic search or notifications could go here */}
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth transition-all" data-lenis-prevent>
          <div className="p-8 max-w-[95rem] mx-auto w-full min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

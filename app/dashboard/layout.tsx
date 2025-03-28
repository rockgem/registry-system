import MySidebar from "@/components/my-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SidebarProvider>
            <MySidebar></MySidebar>
            <main>
                <SidebarTrigger></SidebarTrigger>
                {children}
            </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
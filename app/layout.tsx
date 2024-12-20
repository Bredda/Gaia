import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { createFromServer } from "@/lib/supabase/server";
import { AppProviders } from "@/providers/app-providers";
import AppBreadcrumb from "@/components/app-breadcrumb";
import { AuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import QuickChat from "@/components/quick-chat";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const NoLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProviders>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <AppBreadcrumb />
            <span className="flex-1" />
            <QuickChat />
          </div>
        </header>
        <div className="h-full">{children}</div>
      </SidebarInset>
    </AppProviders>
  );
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createFromServer();
  const { data, error } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster richColors />
            {data?.user ? (
              <AppLayout>{children}</AppLayout>
            ) : (
              <NoLayout>{children}</NoLayout>
            )}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

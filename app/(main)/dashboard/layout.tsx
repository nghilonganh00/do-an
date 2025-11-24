import DashboardSidebar from "@/src/components/common/sidebar/DashboardSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen">
      <div className="max-w-[1320px] mx-auto flex items-start gap-16 h-full pt-10">
        <DashboardSidebar />

        <div className="flex-1 h-full">{children}</div>
      </div>
    </div>
  );
}

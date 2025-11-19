import DashboardSidebar from "@/src/components/common/sidebar/DashboardSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <div className="max-w-[1320px] mx-auto flex items-start gap-16 mt-10">
        <DashboardSidebar />

        {children}
      </div>
    </div>
  );
}

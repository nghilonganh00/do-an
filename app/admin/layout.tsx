import Sidebar from "@/src/components/layout/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <main
        style={{
          flexGrow: 1,
          padding: "30px",
          backgroundColor: "#f4f4f4",
          overflowY: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}

import Menu from "@/components/global/menu";
import TopBanner from "@/components/global/top-banner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="client-layout" className="flex flex-col max-h-screen h-screen">
      <TopBanner />
      <main id="client-layout-inner1" className="flex-grow flex flex-col ">
        <div id="client-layout-inner2" className="flex-grow flex justify-start">
          {children}
        </div>
      </main>
      <Menu />
    </div>
  );
}

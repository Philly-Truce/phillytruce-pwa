"use client";

import Menu from "@/components/global/menu";
import TopBanner from "@/components/global/top-banner";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef: RefObject<HTMLDivElement> = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const hasVerticalOverflow =
          containerRef.current.scrollHeight > containerRef.current.clientHeight;
        setHasOverflow(hasVerticalOverflow);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [pathname]);

  return (
    <div
      id="client-layout"
      className="flex flex-col max-w-[390px] mx-auto h-[95vh] rounded-2xl overflow-y-scroll shadow-[rgba(0,0,0,0.24)_0px_3px_8px]"
    >
      <TopBanner />
      <main
        id="client-layout-inner1"
        className="flex-grow flex flex-col overflow-scroll"
        ref={containerRef}
      >
        <div id="client-layout-inner2" className="flex-grow flex justify-start">
          {children}
        </div>
      </main>
      <Menu hasOverflow={hasOverflow} />{" "}
    </div>
  );
}

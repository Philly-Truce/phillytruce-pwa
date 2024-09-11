"use client";
import Menu from "@/components/global/menu";
import TopBanner from "@/components/global/top-banner";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
export default function ClientLayout({ children, }) {
    const containerRef = useRef(null);
    const [hasOverflow, setHasOverflow] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        const checkOverflow = () => {
            if (containerRef.current) {
                const hasVerticalOverflow = containerRef.current.scrollHeight > containerRef.current.clientHeight;
                setHasOverflow(hasVerticalOverflow);
            }
        };
        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [pathname]);
    return (<div id="client-layout" className="flex flex-col max-h-screen h-screen">
      <TopBanner />
      <main id="client-layout-inner1" className="flex-grow flex flex-col overflow-scroll" ref={containerRef}>
        <div id="client-layout-inner2" className="flex-grow flex justify-start px-4">
          {children}
        </div>
      </main>
      <Menu hasOverflow={hasOverflow}/>{" "}
    </div>);
}

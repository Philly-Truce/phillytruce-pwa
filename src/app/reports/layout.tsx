import React from "react";
/**
 * layout for the reports view
 *
 * @param children
 * @returns
 */
export default function ReportsViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col gap-4 w-full h-full">{children}</div>;
}

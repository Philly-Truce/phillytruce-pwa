"use client";
import * as React from "react";
import { format } from "date-fns";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/pop-over";
import dateIcon from "../../assets/create-form-image/dateIcon.svg";
const DatePicker = ({ reportedDate }) => {
    const [date, setDate] = React.useState(reportedDate);
    return (<Popover>
      <PopoverTrigger asChild>
        <Button className={cn("w-1/2 justify-start text-left font-normal text-md", !date && "text-muted-foreground")}>
          <Image src={dateIcon} alt="Date Icon"/>
          {date ? format(date, "MM/dd/yy") : ""}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} className="bg-gray-200"/>
      </PopoverContent>
    </Popover>);
};
export default DatePicker;

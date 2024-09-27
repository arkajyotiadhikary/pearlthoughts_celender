import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRange } from "react-day-picker";

interface CalendarSectionProps {
      startDate: Date | undefined;
      endDate: Date | undefined;
      setStartDate: (date: Date) => void;
      setEndDate: (date: Date) => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
      startDate,
      endDate,
      setStartDate,
      setEndDate,
}) => {
      const handleRangeSelect = (range: DateRange | undefined) => {
            if (range?.from) setStartDate(range.from);
            if (range?.to) setEndDate(range.to);
      };

      return (
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="bg-blue-50">
                        <CardTitle className="text-xl text-blue-700">Select Date Range</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                        <div className="flex items-center justify-center">
                              <Calendar
                                    mode="range"
                                    selected={{ from: startDate, to: endDate }}
                                    onSelect={handleRangeSelect}
                                    numberOfMonths={1}
                                    className="rounded-md border border-gray-200"
                                    styles={{
                                          day_range_start: {
                                                backgroundColor: "#93c5fd",
                                          },
                                          day_range_end: { backgroundColor: "#93c5fd" },
                                          day_range_middle: {
                                                backgroundColor: "#dbeafe",
                                                color: "#1e3a8a",
                                          },
                                    }}
                              />
                        </div>
                        <div className="mt-4 text-sm text-gray-600 text-center">
                              {startDate && endDate ? (
                                    <p>
                                          Selected range:{" "}
                                          <span className="font-semibold">
                                                {startDate.toDateString()} -{" "}
                                                {endDate.toDateString()}
                                          </span>
                                    </p>
                              ) : (
                                    <p className="italic">Please select a date range</p>
                              )}
                        </div>
                  </CardContent>
            </Card>
      );
};

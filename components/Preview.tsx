// Preview.tsx
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { addDays, addWeeks, addMonths, addYears, startOfMonth, setDate } from "date-fns";

interface PreviewProps {
      startDate: Date | null;
      endDate: Date | null;
      recurrenceType: "daily" | "weekly" | "monthly" | "yearly";
      interval: number;
      selectedDays: number[];
      nthDay: number | null;
}

const Preview: React.FC<PreviewProps> = ({
      startDate,
      endDate,
      recurrenceType,
      interval,
      selectedDays,
      nthDay,
}) => {
      const getRecurringDates = (): Date[] => {
            if (!startDate) return [];

            const dates: Date[] = [];
            let currentDate = new Date(startDate);

            while ((!endDate || currentDate <= endDate) && dates.length < 10) {
                  switch (recurrenceType) {
                        case "daily":
                              dates.push(new Date(currentDate));
                              currentDate = addDays(currentDate, interval);
                              break;
                        case "weekly":
                              if (selectedDays.includes(currentDate.getDay())) {
                                    dates.push(new Date(currentDate));
                              }
                              if (currentDate.getDay() === 6) {
                                    currentDate = addWeeks(currentDate, interval - 1);
                              }
                              currentDate = addDays(currentDate, 1);
                              break;
                        case "monthly":
                              if (nthDay !== null) {
                                    const monthStart = startOfMonth(currentDate);
                                    const targetDate = setDate(monthStart, nthDay);
                                    if (
                                          targetDate >= currentDate &&
                                          (!endDate || targetDate <= endDate)
                                    ) {
                                          dates.push(new Date(targetDate));
                                    }
                              }
                              currentDate = addMonths(currentDate, interval);
                              break;
                        case "yearly":
                              dates.push(new Date(currentDate));
                              currentDate = addYears(currentDate, interval);
                              break;
                  }
            }

            return dates;
      };

      const recurringDates = getRecurringDates();

      return (
            <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Preview</h3>
                  <Calendar
                        mode="multiple"
                        selected={recurringDates}
                        className="rounded-md border"
                  />
            </div>
      );
};

export default Preview;

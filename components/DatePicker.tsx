// DatePicker.tsx
import React from "react";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerProps {
      startDate: Date | null;
      endDate: Date | null;
      onStartDateChange: (date: Date) => void;
      onEndDateChange: (date: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
      startDate,
      endDate,
      onStartDateChange,
      onEndDateChange,
}) => {
      return (
            <div className="flex flex-col space-y-4">
                  <div>
                        <label className="block text-sm font-medium text-gray-700">
                              Start Date
                        </label>
                        <Calendar
                              mode="single"
                              selected={startDate!}
                              onSelect={(date) => date && onStartDateChange(date)}
                              className="rounded-md border"
                        />
                  </div>
                  <div>
                        <label className="block text-sm font-medium text-gray-700">
                              End Date (Optional)
                        </label>
                        <Calendar
                              mode="single"
                              selected={endDate!}
                              onSelect={(date) => date && onEndDateChange(date)}
                              className="rounded-md border"
                        />
                  </div>
            </div>
      );
};

export default DatePicker;

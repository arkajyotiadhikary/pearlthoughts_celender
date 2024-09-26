// RecurrenceOptions.tsx
import React from "react";
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface RecurrenceOptionsProps {
      recurrenceType: "daily" | "weekly" | "monthly" | "yearly";
      interval: number;
      selectedDays: number[];
      nthDay: number | null;
      onRecurrenceTypeChange: (type: "daily" | "weekly" | "monthly" | "yearly") => void;
      onIntervalChange: (interval: number) => void;
      onSelectedDaysChange: (days: number[]) => void;
      onNthDayChange: (day: number | null) => void;
}

const RecurrenceOptions: React.FC<RecurrenceOptionsProps> = ({
      recurrenceType,
      interval,
      selectedDays,
      nthDay,
      onRecurrenceTypeChange,
      onIntervalChange,
      onSelectedDaysChange,
      onNthDayChange,
}) => {
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      return (
            <div className="space-y-4">
                  <Select onValueChange={onRecurrenceTypeChange} value={recurrenceType}>
                        <SelectTrigger>
                              <SelectValue placeholder="Select recurrence type" />
                        </SelectTrigger>
                        <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                  </Select>

                  <div className="flex items-center space-x-2">
                        <span>Every</span>
                        <Input
                              type="number"
                              min={1}
                              value={interval}
                              onChange={(e) => onIntervalChange(parseInt(e.target.value))}
                              className="w-16"
                        />
                        <span>{recurrenceType === "daily" ? "days" : recurrenceType}</span>
                  </div>

                  {recurrenceType === "weekly" && (
                        <div className="flex flex-wrap gap-2">
                              {daysOfWeek.map((day, index) => (
                                    <div key={day} className="flex items-center space-x-2">
                                          <Checkbox
                                                id={day}
                                                checked={selectedDays.includes(index)}
                                                onCheckedChange={(checked) => {
                                                      if (checked) {
                                                            onSelectedDaysChange([
                                                                  ...selectedDays,
                                                                  index,
                                                            ]);
                                                      } else {
                                                            onSelectedDaysChange(
                                                                  selectedDays.filter(
                                                                        (d) => d !== index
                                                                  )
                                                            );
                                                      }
                                                }}
                                          />
                                          <label htmlFor={day}>{day}</label>
                                    </div>
                              ))}
                        </div>
                  )}

                  {recurrenceType === "monthly" && (
                        <Select
                              onValueChange={(value) => onNthDayChange(parseInt(value))}
                              value={nthDay?.toString() || ""}
                        >
                              <SelectTrigger>
                                    <SelectValue placeholder="Select nth day of the month" />
                              </SelectTrigger>
                              <SelectContent>
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                          <SelectItem key={day} value={day.toString()}>
                                                {day}
                                                {getOrdinalSuffix(day)}
                                          </SelectItem>
                                    ))}
                              </SelectContent>
                        </Select>
                  )}
            </div>
      );
};

function getOrdinalSuffix(day: number): string {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
            case 1:
                  return "st";
            case 2:
                  return "nd";
            case 3:
                  return "rd";
            default:
                  return "th";
      }
}

export default RecurrenceOptions;

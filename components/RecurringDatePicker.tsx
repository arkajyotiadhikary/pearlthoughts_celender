"use client";
import React, { useEffect } from "react";
import { useDatePickerStore } from "../store";
import { Calendar } from "@/components/ui/calendar";

const DatePickerComponent: React.FC = () => {
      const {
            startDate,
            endDate,
            setStartDate,
            setEndDate,
            recurrenceType,
            setRecurrenceType,
            interval,
            setInterval,
            generateDates,
            recurringDates,
      } = useDatePickerStore();

      useEffect(() => {
            generateDates();
      }, [startDate, recurrenceType, interval, endDate, generateDates]);

      return (
            <div className="p-4">
                  {/* Start Date with ShadCN Calendar */}
                  <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                              Start Date
                        </label>
                        <Calendar
                              selected={startDate}
                              onSelect={(date) => setStartDate(date as Date)}
                              className="w-full border border-gray-300 rounded-md p-2"
                        />
                  </div>

                  {/* End Date with ShadCN Calendar */}
                  <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                              End Date (Optional)
                        </label>
                        <Calendar
                              selected={endDate!}
                              onSelect={(date) => setEndDate(date as Date | null)}
                              className="w-full border border-gray-300 rounded-md p-2"
                        />
                  </div>

                  {/* Recurrence Type */}
                  <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                              Recurrence Type
                        </label>
                        <select
                              value={recurrenceType}
                              onChange={(e) =>
                                    setRecurrenceType(
                                          e.target.value as
                                                | "daily"
                                                | "weekly"
                                                | "monthly"
                                                | "yearly"
                                    )
                              }
                              className="w-full border border-gray-300 rounded-md p-2"
                        >
                              <option value="daily">Daily</option>
                              <option value="weekly">Weekly</option>
                              <option value="monthly">Monthly</option>
                              <option value="yearly">Yearly</option>
                        </select>
                  </div>

                  {/* Interval */}
                  <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                              Interval (Every X days/weeks/months/years)
                        </label>
                        <input
                              type="number"
                              value={interval}
                              onChange={(e) => setInterval(Number(e.target.value))}
                              className="w-full border border-gray-300 rounded-md p-2"
                              min="1"
                        />
                  </div>

                  {/* Recurring Dates Preview */}
                  <div className="mb-4">
                        <h3 className="text-lg font-bold">Recurring Dates Preview:</h3>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                              {recurringDates.map((date, index) => (
                                    <div key={index} className="p-2 border rounded-md">
                                          {date.toDateString()}
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default DatePickerComponent;

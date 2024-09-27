"use client";
import React, { useEffect, useCallback } from "react";
import { useDatePickerStore } from "../store";
import { CalendarSection } from "./CalendarSection";
import { RecurrenceSettings } from "./RecurrenceSettings";
import { RecurringDatesPreview } from "./RecurringDatesPreview";

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

      const memoizedGenerateDates = useCallback(() => {
            if (startDate && endDate && startDate <= endDate) {
                  generateDates();
            }
      }, [startDate, endDate, recurrenceType, interval, generateDates]);

      useEffect(() => {
            memoizedGenerateDates();
      }, [memoizedGenerateDates]);

      return (
            <div className="p-6 space-y-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg">
                  <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                        Date Picker Dashboard
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CalendarSection
                              startDate={startDate}
                              endDate={endDate}
                              setStartDate={setStartDate}
                              setEndDate={setEndDate}
                        />
                        <RecurrenceSettings
                              recurrenceType={recurrenceType}
                              setRecurrenceType={setRecurrenceType}
                              interval={interval}
                              setInterval={setInterval}
                        />
                  </div>
                  <RecurringDatesPreview recurringDates={recurringDates} />
            </div>
      );
};

export default DatePickerComponent;

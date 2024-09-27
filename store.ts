import { create } from "zustand";
import { addDays, addWeeks, addMonths, addYears, isBefore } from "date-fns";

type RecurrenceType = "daily" | "weekly" | "monthly" | "yearly";

interface DatePickerState {
      startDate: Date;
      endDate: Date | null;
      recurrenceType: RecurrenceType;
      interval: number;
      recurringDates: Date[];
      setStartDate: (date: Date) => void;
      setEndDate: (date: Date | null) => void;
      setRecurrenceType: (type: RecurrenceType) => void;
      setInterval: (interval: number) => void;
      generateDates: () => void;
}

const generateRecurringDates = (
      startDate: Date,
      endDate: Date | null,
      recurrenceType: RecurrenceType,
      interval: number
): Date[] => {
      const dates: Date[] = [];
      let currentDate = startDate;

      // Continue generating dates until endDate is reached (if endDate exists)
      while (endDate && isBefore(currentDate, endDate)) {
            switch (recurrenceType) {
                  case "daily":
                        currentDate = addDays(currentDate, interval);
                        break;
                  case "weekly":
                        currentDate = addWeeks(currentDate, interval);
                        break;
                  case "monthly":
                        currentDate = addMonths(currentDate, interval);
                        break;
                  case "yearly":
                        currentDate = addYears(currentDate, interval);
                        break;
            }
            if (endDate && isBefore(currentDate, endDate)) {
                  dates.push(currentDate);
            }
      }

      return dates;
};

export const useDatePickerStore = create<DatePickerState>((set) => ({
      startDate: new Date(),
      endDate: null,
      recurrenceType: "daily",
      interval: 1,
      recurringDates: [],
      setStartDate: (date) => set({ startDate: date }),
      setEndDate: (date) => set({ endDate: date }),
      setRecurrenceType: (type) => set({ recurrenceType: type }),
      setInterval: (interval) => set({ interval }),
      generateDates: () =>
            set((state) => ({
                  recurringDates: generateRecurringDates(
                        state.startDate,
                        state.endDate,
                        state.recurrenceType,
                        state.interval
                  ),
            })),
}));

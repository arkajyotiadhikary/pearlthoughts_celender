import { create } from "zustand";
import { addDays, addWeeks, addMonths, addYears } from "date-fns";

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
      recurrenceType: RecurrenceType,
      interval: number
): Date[] => {
      const dates: Date[] = [];
      let currentDate = startDate;

      for (let i = 0; i < 12; i++) {
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
            dates.push(currentDate);
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
                        state.recurrenceType,
                        state.interval
                  ),
            })),
}));

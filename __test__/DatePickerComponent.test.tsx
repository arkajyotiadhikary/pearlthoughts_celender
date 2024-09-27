import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DatePickerComponent from "../components/DatePickerComponent";
import { useDatePickerStore } from "../store";

// Mock the useDatePickerStore hook to control the store values during the test
jest.mock("../store", () => ({
      useDatePickerStore: jest.fn(),
}));

describe("DatePickerComponent", () => {
      const mockStore = {
            startDate: null,
            endDate: null,
            setStartDate: jest.fn(),
            setEndDate: jest.fn(),
            recurrenceType: "daily",
            setRecurrenceType: jest.fn(),
            interval: 1,
            setInterval: jest.fn(),
            generateDates: jest.fn(),
            recurringDates: [],
      };

      beforeEach(() => {
            (useDatePickerStore as jest.Mock).mockReturnValue(mockStore);
      });

      it("renders the DatePickerComponent without crashing", () => {
            render(<DatePickerComponent />);

            expect(screen.getByText("Date Picker Dashboard")).toBeInTheDocument();
            expect(screen.getByText("Select Date Range")).toBeInTheDocument();
            expect(screen.getByText("Recurrence Settings")).toBeInTheDocument();
      });

      it("shows date range selection", () => {
            render(<DatePickerComponent />);

            // Ensure the date range prompt is displayed when no date is selected
            expect(screen.getByText("Please select a date range")).toBeInTheDocument();
      });

      it("handles date range selection", () => {
            render(<DatePickerComponent />);

            // Simulate selecting a start and end date
            const mockStartDate = new Date(2023, 8, 1);
            const mockEndDate = new Date(2023, 8, 7);

            mockStore.setStartDate(mockStartDate);
            mockStore.setEndDate(mockEndDate);

            expect(mockStore.setStartDate).toHaveBeenCalled();
            expect(mockStore.setEndDate).toHaveBeenCalled();

            // Verify the start and end dates are displayed correctly
            expect(
                  screen.getByText(
                        `Start date: ${mockStartDate.toLocaleDateString("en-GB", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                        })}`
                  )
            ).toBeInTheDocument();
            expect(
                  screen.getByText(
                        `End date: ${mockEndDate.toLocaleDateString("en-GB", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                        })}`
                  )
            ).toBeInTheDocument();
      });

      it("displays recurrence type options and selects one", () => {
            render(<DatePickerComponent />);

            // Ensure that the recurrence select exists
            const selectTrigger = screen.getByText("Select recurrence type");
            expect(selectTrigger).toBeInTheDocument();

            // Simulate changing recurrence type
            fireEvent.mouseDown(selectTrigger);
            fireEvent.click(screen.getByText("Weekly"));

            expect(mockStore.setRecurrenceType).toHaveBeenCalledWith("weekly");

            // Verify the selected recurrence type is displayed correctly
            expect(screen.getByText(`Selected recurrence type: Weekly`)).toBeInTheDocument();
      });

      it("handles interval input correctly", () => {
            render(<DatePickerComponent />);

            const intervalInput = screen.getByLabelText(/Interval/i) as HTMLInputElement;

            // Check if the interval input is initially set to 1
            expect(intervalInput.value).toBe("1");

            // Simulate changing the interval value
            fireEvent.change(intervalInput, { target: { value: "3" } });

            expect(mockStore.setInterval).toHaveBeenCalledWith(3);

            // Verify the selected interval is displayed correctly
            expect(screen.getByText(`Selected interval: 3`)).toBeInTheDocument();
      });

      it("displays recurring dates preview when available", () => {
            // Modify mockStore to have some recurring dates
            mockStore.recurringDates = [new Date(2023, 8, 1), new Date(2023, 8, 8)];

            render(<DatePickerComponent />);

            // Check if the recurring dates are rendered
            expect(screen.getByText(`Recurring date: Fri Sep 01 2023`)).toBeInTheDocument();
            expect(screen.getByText(`Recurring date: Fri Sep 08 2023`)).toBeInTheDocument();

            // Verify that the recurring dates are displayed with the correct date format
            const recurringDatesElement = screen.getByRole("listitem");
            expect(recurringDatesElement).toHaveAttribute(
                  "aria-label",
                  `Recurring date: ${new Date(2023, 8, 1).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                  })}`
            );
            expect(recurringDatesElement).toHaveAttribute(
                  "aria-label",
                  `Recurring date: ${new Date(2023, 8, 8).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                  })}`
            );
      });
});

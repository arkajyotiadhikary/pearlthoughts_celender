import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

interface RecurringDatesPreviewProps {
      recurringDates: Date[];
}

export const RecurringDatesPreview: React.FC<RecurringDatesPreviewProps> = ({ recurringDates }) => {
      const [currentMonth, setCurrentMonth] = React.useState<Date>(
            recurringDates.length > 0 ? recurringDates[0] : new Date()
      );

      const isRecurringDate = (date: Date) =>
            recurringDates.some((d) => d.toDateString() === date.toDateString());

      return (
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 mt-8">
                  <CardHeader className="bg-purple-50">
                        <CardTitle className="text-xl text-purple-700">
                              Recurring Dates Preview
                        </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                        {recurringDates.length > 0 ? (
                              <div className="flex items-center justify-center">
                                    <Calendar
                                          mode="multiple"
                                          selected={recurringDates}
                                          month={currentMonth}
                                          onMonthChange={setCurrentMonth}
                                          className="rounded-md border"
                                          modifiers={{
                                                recurring: (date) => isRecurringDate(date),
                                          }}
                                          modifiersClassNames={{
                                                recurring:
                                                      "bg-purple-100 text-purple-700 font-semibold",
                                          }}
                                          disabled={(date) => !isRecurringDate(date)}
                                    />
                              </div>
                        ) : (
                              <p className="text-gray-500 text-center italic">
                                    No recurring dates to display. Please select both start and end
                                    dates.
                              </p>
                        )}
                  </CardContent>
            </Card>
      );
};

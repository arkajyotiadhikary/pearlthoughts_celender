import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecurringDatesPreviewProps {
      recurringDates: Date[];
}

export const RecurringDatesPreview: React.FC<RecurringDatesPreviewProps> = ({ recurringDates }) => {
      return (
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 mt-8">
                  <CardHeader className="bg-purple-50">
                        <CardTitle className="text-xl text-purple-700">
                              Recurring Dates Preview
                        </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                        {recurringDates.length > 0 ? (
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {recurringDates.map((date, index) => (
                                          <div
                                                key={index}
                                                className="p-2 border rounded-md text-sm bg-white hover:bg-gray-50 transition-colors duration-200"
                                          >
                                                {date.toDateString()}
                                          </div>
                                    ))}
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

import React from "react";
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecurrenceSettingsProps {
      recurrenceType: string;
      setRecurrenceType: (type: string) => void;
      interval: number;
      setInterval: (interval: number) => void;
}

export const RecurrenceSettings: React.FC<RecurrenceSettingsProps> = ({
      recurrenceType,
      setRecurrenceType,
      interval,
      setInterval,
}) => {
      return (
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="bg-green-50">
                        <CardTitle className="text-xl text-green-700">
                              Recurrence Settings
                        </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-4">
                        <div>
                              <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Recurrence Type
                              </label>
                              <Select
                                    value={recurrenceType}
                                    onValueChange={(value: any) => setRecurrenceType(value)}
                              >
                                    <SelectTrigger className="w-full bg-white">
                                          <SelectValue placeholder="Select recurrence type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                          <SelectItem value="daily">Daily</SelectItem>
                                          <SelectItem value="weekly">Weekly</SelectItem>
                                          <SelectItem value="monthly">Monthly</SelectItem>
                                          <SelectItem value="yearly">Yearly</SelectItem>
                                    </SelectContent>
                              </Select>
                        </div>

                        <div>
                              <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Interval (Every X {recurrenceType})
                              </label>
                              <Input
                                    type="number"
                                    value={interval}
                                    onChange={(e) =>
                                          setInterval(Math.max(1, parseInt(e.target.value) || 1))
                                    }
                                    min="1"
                                    className="bg-white"
                              />
                        </div>
                  </CardContent>
            </Card>
      );
};

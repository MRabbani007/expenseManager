import { DatePicker } from "@/components/ui/datepicker";
import { DatePickerWithRange } from "@/components/ui/datepickerwithrange";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDate } from "@/lib/date";
import { TimePeriod } from "@/types/type";
import { addDays } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import { DateRange } from "react-day-picker";

type Key = "day" | "week" | "month" | "quarter" | "period";

const OFFSET = {
  day: 0,
  week: 6,
  month: 29,
  quarter: 119,
  period: 0,
};

export default function CardSelectPeriod({
  state,
  setState,
}: {
  state: TimePeriod | null;
  setState: Dispatch<SetStateAction<TimePeriod | null>>;
}) {
  return (
    <div className=" space-y-4">
      <Select
        value={state?.period ?? ""}
        onValueChange={(v: Key) =>
          setState((curr) => ({
            ...curr,
            period: v,
            offset: OFFSET[v],
            endDate:
              curr?.startDate && curr?.startDate !== ""
                ? getDate(addDays(curr?.startDate, OFFSET[v]))
                : "",
          }))
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Period" />
        </SelectTrigger>
        <SelectContent>
          {/* <SelectGroup>
            <SelectLabel>Select Date</SelectLabel> */}
          <SelectItem value="day">1 Day</SelectItem>
          <SelectItem value="week">1 Week</SelectItem>
          <SelectItem value="month">1 Month</SelectItem>
          <SelectItem value="quarter">3 Months</SelectItem>
          <SelectItem value="period">Select Dates</SelectItem>
          {/* </SelectGroup> */}
        </SelectContent>
      </Select>
      {state?.period === "period" ? (
        <DatePickerWithRange
          date={{
            from:
              typeof state?.startDate === "string" && state?.startDate !== ""
                ? new Date(state?.startDate)
                : new Date(),
            to:
              typeof state?.endDate === "string" && state?.endDate !== ""
                ? addDays(new Date(state?.endDate), state?.offset ?? 0)
                : addDays(new Date(), state?.offset ?? 0),
          }}
          setDate={(date: DateRange | undefined) => {
            setState((curr) => {
              if (curr)
                return {
                  ...curr,
                  startDate: date?.from ? getDate(date?.from) : "",
                  endDate: date?.to ? getDate(date?.to) : "",
                };
              else
                return {
                  period: "period",
                  startDate: date?.from ? getDate(date?.from) : "",
                  endDate: date?.to ? getDate(date?.to) : "",
                  offset: 0,
                };
            });
          }}
        />
      ) : (
        <DatePicker
          date={
            typeof state?.startDate === "string" && state?.startDate !== ""
              ? new Date(state?.startDate)
              : new Date()
          }
          setDate={(date: Date | undefined) => {
            setState((curr) => {
              if (curr)
                return {
                  ...curr,
                  startDate: date ? getDate(date) : "",
                  endDate: date
                    ? getDate(addDays(date, curr?.offset ?? 0))
                    : "",
                };
              else
                return {
                  period: "period",
                  startDate: date ? getDate(date) : "",
                  endDate: date ? getDate(date) : "",
                  offset: 0,
                };
            });
          }}
        />
      )}
    </div>
  );
}

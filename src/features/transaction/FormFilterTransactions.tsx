import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getDate } from "@/lib/date";
import FormContainer from "@/components/forms/FormContainer";
import { DatePicker } from "@/components/ui/datepicker";
import { DatePickerWithRange } from "@/components/ui/datepickerwithrange";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import RadioGroup from "@/components/RadioGroup";

type Key = "day" | "week" | "month" | "quarter" | "period";

const OFFSET = {
  day: 0,
  week: 6,
  month: 29,
  quarter: 119,
  period: 0,
};

const initialState: TransactionFilter = {
  filterType: "latest",
  period: "day",
  startDate: getDate(new Date()),
  endDate: getDate(new Date()),
  offset: 0,
};

export default function FormFilterTransactions({
  state: initialVal,
  setState: setSubmitState,
  setShowForm,
}: {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  state: TransactionFilter;
  setState: Dispatch<SetStateAction<TransactionFilter>>;
}) {
  const [state, setState] = useState<TransactionFilter>(initialVal);

  const onSubmit = async () => {
    if (state?.startDate && state?.endDate) {
      setSubmitState(state);
      setShowForm(false);
    }
  };

  return (
    <FormContainer
      closeForm={setShowForm}
      onSubmit={onSubmit}
      title="Filter Transactions"
    >
      <RadioGroup
        label="Show Transactions"
        name="type"
        options={[
          { label: "latest", value: "latest" },
          { label: "period", value: "period" },
        ]}
        value={state?.filterType}
        onChange={(_: string, val: string) =>
          setState((curr) => ({ ...curr, filterType: val }))
        }
      />
      {state?.filterType === "period" && (
        <>
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
                  typeof state?.startDate === "string" &&
                  state?.startDate !== ""
                    ? new Date(state?.startDate)
                    : new Date(),
                to:
                  typeof state?.endDate === "string" && state?.endDate !== ""
                    ? addDays(new Date(state?.endDate), state?.offset ?? 0)
                    : addDays(new Date(), state?.offset ?? 0),
              }}
              setDate={(date: DateRange | undefined) => {
                setState((curr) => ({
                  ...curr,
                  startDate: date?.from ? getDate(date?.from) : "",
                  endDate: date?.to ? getDate(date?.to) : "",
                }));
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
                setState((curr) => ({
                  ...curr,
                  startDate: date ? getDate(date) : "",
                  endDate: date
                    ? getDate(addDays(date, curr?.offset ?? 0))
                    : "",
                }));
              }}
            />
          )}
        </>
      )}
    </FormContainer>
  );
}

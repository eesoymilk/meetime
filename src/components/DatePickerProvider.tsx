import { ParentComponent } from "solid-js";
import {
  ClockRangeContext,
  makeClockRangeContext,
} from "~/contexts/clockRange";
import {
  DatePickerContext,
  makeDatePickerContext,
} from "~/contexts/datePicker";

const DatePickerProvider: ParentComponent = (props) => {
  const dateContext = makeDatePickerContext();
  const clockRangeContext = makeClockRangeContext();
  return (
    <DatePickerContext.Provider value={dateContext}>
      <ClockRangeContext.Provider value={clockRangeContext}>
        {props.children}
      </ClockRangeContext.Provider>
    </DatePickerContext.Provider>
  );
};

export default DatePickerProvider;

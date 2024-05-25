import { ParentComponent } from "solid-js";
import {
  DatePickerContext,
  makeDatePickerContext,
} from "~/contexts/datePicker";

const DatePickerProvider: ParentComponent = (props) => {
  const dateContext = makeDatePickerContext();
  return (
    <DatePickerContext.Provider value={dateContext}>
      {props.children}
    </DatePickerContext.Provider>
  );
};

export default DatePickerProvider;

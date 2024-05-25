import { createContext, createSignal, useContext } from "solid-js";

export const makeDatePickerContext = () => {
  const [startDate, setStartDate] = createSignal<Date | null>(null);
  const [hoveredDate, setHoveredDate] = createSignal<Date | null>(null);
  const [endDate, setEndDate] = createSignal<Date | null>(null);
  const [pickedDates, setPickedDates] = createSignal<Date[]>([]);
  return [
    { startDate, hoveredDate, endDate, pickedDates },
    { setStartDate, setHoveredDate, setEndDate, setPickedDates },
  ] as const;
};

type DatePickerContextType = ReturnType<typeof makeDatePickerContext>;

export const DatePickerContext = createContext<DatePickerContextType>();

export const useDatePickerContext = () => {
  const datePickerContext = useContext(DatePickerContext);
  if (!datePickerContext) {
    throw new Error(
      "useDatePickerContext should be called inside its ContextProvider"
    );
  }

  return datePickerContext;
};

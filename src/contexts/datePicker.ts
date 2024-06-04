import { createContext, createMemo, createSignal, useContext } from "solid-js";

const msInDay = 1000 * 60 * 60 * 24;

export const makeDatePickerContext = () => {
  const [startDate, setStartDate] = createSignal<Date | null>(null);
  const [hoveredDate, setHoveredDate] = createSignal<Date | null>(null);
  const [pickedTimes, setPickedTimes] = createSignal<number[]>([]);

  const pickedDates = createMemo(() => {
    return pickedTimes().map((time) => new Date(time));
  });

  const selectDates = (refDate: Date) => {
    let start = startDate();
    if (start === null) {
      console.log("start date is null");
      return;
    }

    let [d1, d2] = [start, refDate];
    if (d1.getTime() > d2.getTime()) [d1, d2] = [d2, d1];

    const days = Math.abs((d2.getTime() - d1.getTime()) / msInDay) + 1;
    const dates = Array.from({ length: days }, (_, i) => {
      const date = new Date(d1.getTime());
      date.setDate(d1.getDate() + i);
      return date;
    });

    setStartDate(null);
    setPickedTimes((prev) => {
      const times = dates.map((date) => date.getTime());

      return prev.includes(start.getTime())
        ? prev.filter((time) => !times.includes(time))
        : Array.from(new Set([...prev, ...times])).sort();
    });
  };

  return [
    { startDate, hoveredDate, pickedTimes, pickedDates },
    { setStartDate, setHoveredDate, setPickedTimes },
    { selectDates },
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

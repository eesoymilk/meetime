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

    if (start.getTime() > refDate.getTime()) {
      [start, refDate] = [refDate, start];
    }

    const days = Math.abs((start.getTime() - refDate.getTime()) / msInDay) + 1;

    setStartDate(null);
    setPickedTimes((prev) => {
      const startTime = start.getTime();
      const dateTimes = Array.from({ length: days }, (_, i) => {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        return date.getTime();
      });

      return prev.includes(startTime)
        ? prev.filter((time) => !dateTimes.includes(time))
        : Array.from(new Set([...prev, ...dateTimes])).sort();
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

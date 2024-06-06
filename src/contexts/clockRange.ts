import { createContext, createSignal, useContext } from "solid-js";

export const makeClockRangeContext = (
  initialhours: boolean[] = Array.from({ length: 24 }, (_, i) => true)
) => {
  const [startHour, setStartHour] = createSignal<number | null>(null);
  const [hoveredHour, setHoveredHour] = createSignal<number | null>(null);
  const [hours, setHours] = createSignal<boolean[]>(initialhours);

  const selectHours = (end: number) => {
    let start = startHour();
    if (start === null) {
      console.log("start hour is null");
      return;
    }

    const toggle = !hours()[start];

    let diff = end - start;

    if (diff < 0) {
      diff += 24;
    }

    setStartHour(null);
    if (diff <= 12) {
      setHours((prev) =>
        prev.map((hour, i) => (i >= start && i <= end ? toggle : hour))
      );
    } else {
      setHours((prev) =>
        prev.map((hour, i) => (i <= start || i >= end ? toggle : hour))
      );
    }
  };

  return [
    { startHour, hoveredHour, hours },
    { setStartHour, setHoveredHour },
    { selectHours },
  ] as const;
};

type ClockRangeContextType = ReturnType<typeof makeClockRangeContext>;

export const ClockRangeContext = createContext<ClockRangeContextType>();

export const useClockRangeContext = () => {
  const clockRangeContext = useContext(ClockRangeContext);
  if (!clockRangeContext) {
    throw new Error(
      "useClockRangeContext should be called inside its ContextProvider"
    );
  }

  return clockRangeContext;
};

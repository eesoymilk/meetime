import { type Component, createMemo, Index, mergeProps } from "solid-js";
import CalendarCell from "./CalendarCell";

interface CalendarMonthProps {
  year: number;
  month: number;
  weekStartsOn?: number;
  translateXPercent: number;
}

const CalendarMonth: Component<CalendarMonthProps> = (props_) => {
  const props = mergeProps({ weekStartsOn: 1 }, props_);

  const dayNamesShifted = () => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const shifted = dayNames.slice(props.weekStartsOn);
    return shifted.concat(dayNames.slice(0, props.weekStartsOn));
  };

  const cells = createMemo((): Date[] => {
    const daysInMonth = new Date(props.year, props.month + 1, 0).getDate();
    let topOffset =
      new Date(props.year, props.month, 1).getDay() - props.weekStartsOn;

    const numberOfCells = Math.ceil((daysInMonth + topOffset) / 7) * 7;
    if (numberOfCells < 42) {
      const bottomOffset = numberOfCells - (daysInMonth + topOffset);
      if (topOffset < bottomOffset) {
        topOffset += 7;
      }
    }

    return Array.from(
      { length: 42 },
      (_, i) => new Date(props.year, props.month, i - topOffset + 1)
    );
  });

  return (
    <div
      style={{ transform: `translateX(${props.translateXPercent}%)` }}
      class="flex-shrink-0 w-96 transition-transform duration-200 ease-in-out"
    >
      <div class="text-center font-semibold text-xl">
        {new Date(props.year, props.month).toLocaleString("default", {
          year: "numeric",
          month: "long",
        })}
      </div>
      <div class="grid grid-cols-7">
        <Index each={dayNamesShifted()}>
          {(day, _) => <div class="text-center font-semibold">{day()}</div>}
        </Index>
        <Index each={cells()}>
          {(cell, _) => (
            <CalendarCell date={cell()} currentMonth={props.month} />
          )}
        </Index>
      </div>
    </div>
  );
};

export default CalendarMonth;

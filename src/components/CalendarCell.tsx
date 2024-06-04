import type { ClassValue } from "clsx";
import type { Component } from "solid-js";
import { useDatePickerContext } from "~/contexts/datePicker";
import { cn } from "~/utils/cn";

interface CalendarCellProps {
  date: Date;
  currentMonth: number;
}

const CalendarCell: Component<CalendarCellProps> = (props) => {
  const [
    { startDate, hoveredDate, pickedDates },
    { setStartDate, setHoveredDate, setPickedDates },
  ] = useDatePickerContext();

  const isToday = () => {
    const now = new Date();
    return (
      props.date.getDate() === now.getDate() &&
      props.date.getMonth() === now.getMonth() &&
      props.date.getFullYear() === now.getFullYear()
    );
  };

  const isWeekend = () =>
    props.date.getDay() === 0 || props.date.getDay() === 6;

  const isCurrentMonth = () => props.date.getMonth() === props.currentMonth;

  const isPicking = () => {
    const start = startDate();
    const hovered = hoveredDate();
    if (start === null || hovered === null) return false;

    return (
      (start.getTime() <= props.date.getTime() &&
        props.date.getTime() <= hovered.getTime()) ||
      (hovered.getTime() <= props.date.getTime() &&
        props.date.getTime() <= start.getTime())
    );
  };

  const isPicked = () => {
    const picked = pickedDates();
    if (!picked) return false;

    return picked.some((date) => date.getTime() === props.date.getTime());
  };

  const handleMouseEnter = () => setHoveredDate(props.date);

  const handleMouseLeave = () => setHoveredDate(null);

  const handleMouseDown = () => setStartDate(props.date);

  const handleMouseUp = () => {
    const start = startDate();

    if (start === null) {
      console.log("start date is null");
      return;
    }

    const days =
      Math.abs(
        (start.getTime() - props.date.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;

    setStartDate(null);
    setPickedDates((prev) => [
      ...prev,
      ...Array.from({ length: days }, (_, i) => {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        return date;
      }),
    ]);

    console.log(
      "pickedDates",
      pickedDates().map((date) => date.toDateString())
    );
  };

  /* Cell's color explained:
  picked: dark green bg, white text
  picking: green bg

  today: green bg, bold text
  weekend: orange bg
  current month: slate bg
  other month: light slate bg
  */

  const classList = () => {
    const classes: ClassValue[] = [
        "m-1",
        "rounded-md",
        "text-center",
        "cursor-pointer",
        "select-none",
      ],
      today = isToday(),
      weekend = isWeekend(),
      picked = isPicked(),
      picking = isPicking(),
      currentMonth = isCurrentMonth();

    // font
    if (today) {
      classes.push("font-semibold");
    }

    // bg
    if (picked) {
      classes.push("bg-green-700");
    } else if (picking) {
      classes.push("bg-green-200");
    } else if (!currentMonth) {
      classes.push("bg-slate-300");
    } else if (weekend) {
      classes.push("bg-orange-200");
    } else {
      classes.push("bg-slate-200");
    }

    // text
    if (picked) {
      classes.push("text-white");
    } else if (!currentMonth) {
      classes.push("text-slate-500");
    }

    return classes;
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onmousedown={handleMouseDown}
      onmouseup={handleMouseUp}
      class={cn(classList())}
    >
      {props.date.getDate()}
    </div>
  );
};

export default CalendarCell;

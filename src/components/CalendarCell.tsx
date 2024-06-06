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
    { setStartDate, setHoveredDate },
    { selectDates },
  ] = useDatePickerContext();

  const isToday = () => {
    const now = new Date();
    return (
      props.date.getDate() === now.getDate() &&
      props.date.getMonth() === now.getMonth() &&
      props.date.getFullYear() === now.getFullYear()
    );
  };

  const isWeekend = () => {
    return props.date.getDay() === 0 || props.date.getDay() === 6;
  };

  const isCurrentMonth = () => {
    return props.date.getMonth() === props.currentMonth;
  };

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

    // font weight
    if (today) {
      classes.push("font-semibold");
    }

    // background color
    if (picking && !picked) {
      classes.push("bg-green-200");
    } else if (picking && picked) {
      classes.push("bg-green-400");
    } else if (picked) {
      classes.push("bg-green-700");
    } else if (!currentMonth) {
      classes.push("bg-slate-300");
    } else if (weekend) {
      classes.push("bg-orange-200");
    } else {
      classes.push("bg-slate-200");
    }

    // text color
    if (picked) {
      classes.push("text-white");
    } else if (!currentMonth) {
      classes.push("text-slate-500");
    }

    return classes;
  };

  const handleMouseEnter = () => setHoveredDate(props.date);
  const handleMouseLeave = () => setHoveredDate(null);
  const handleMouseDown = () => setStartDate(props.date);
  const handleMouseUp = () => selectDates(props.date);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      class={cn(classList())}
    >
      {props.date.getDate()}
    </div>
  );
};

export default CalendarCell;

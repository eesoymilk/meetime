import type { Component } from "solid-js";
import { useDatePickerContext } from "~/contexts/datePicker";

interface CalendarCellProps {
  date: Date;
  currentMonth: number;
}

const CalendarCell: Component<CalendarCellProps> = (props) => {
  const [
    { startDate, hoveredDate, endDate, pickedDates },
    { setStartDate, setHoveredDate, setEndDate, setPickedDates },
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
    if (startDate() === null) return;

    setEndDate(props.date);

    const start = startDate();
    const end = endDate();
    if (!start || !end) return;

    const days =
      Math.abs((start.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    setPickedDates(
      Array.from({ length: days }, (_, i) => {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        return date;
      })
    );
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onmousedown={handleMouseDown}
      onmouseup={handleMouseUp}
      class="m-1 rounded-md text-center"
      classList={{
        "bg-green-200 text-green-700": isPicking(),
        "bg-slate-200": !isPicking() && isCurrentMonth(),
        "bg-slate-300 text-slate-500": !isCurrentMonth() && !isPicking(),
      }}
    >
      {props.date.getDate()}
    </div>
  );
};

export default CalendarCell;

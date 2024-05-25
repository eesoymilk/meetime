import { createMemo, type Component } from "solid-js";

interface CalendarCellProps {
  date: Date;
  currentMonth: number;
}

const CalendarCell: Component<CalendarCellProps> = (props) => {
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

  return (
    <div
      class="px-2 m-1 rounded-md text-center"
      classList={{
        "bg-green-200 text-green-700": isToday(),
        "bg-slate-200": !isToday() && isCurrentMonth(),
        "bg-slate-300 text-slate-500": !isCurrentMonth() && !isToday(),
      }}
    >
      {props.date.getDate()}
    </div>
  );
};

export default CalendarCell;

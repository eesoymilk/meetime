import { type Component, createMemo, Index } from "solid-js";

interface Cell {
  date: Date;
  isToday: boolean;
  isWeekend: boolean;
  isCurrentMonth: boolean;
}

interface CalendarMonthProps {
  year: number;
  month: number;
  translateXPercent: number;
}

const isToday = (date: Date): boolean => {
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
};

const isWeekend = (date: Date): boolean => {
  return date.getDay() === 0 || date.getDay() === 6;
};

const isCurrentMonth = (date: Date, currentMonth: number): boolean =>
  date.getMonth() === currentMonth;

const getCell = (date: Date, currentMonth: number): Cell => {
  return {
    date,
    isToday: isToday(date),
    isWeekend: isWeekend(date),
    isCurrentMonth: isCurrentMonth(date, currentMonth),
  };
};

const CalendarMonth: Component<CalendarMonthProps> = (props) => {
  const cells = createMemo((): Cell[] => {
    const daysInMonth = new Date(props.year, props.month + 1, 0).getDate();
    let topOffset = new Date(props.year, props.month, 1).getDay();
    let numberOfCells = Math.ceil((daysInMonth + topOffset) / 7) * 7;
    let bottomOffset = numberOfCells - (daysInMonth + topOffset);

    if (numberOfCells < 42) {
      if (topOffset > bottomOffset) {
        topOffset += 7;
      } else {
        bottomOffset += 7;
      }
    }

    return [
      ...Array.from({ length: topOffset }, (_, dayIndex) =>
        getCell(
          new Date(props.year, props.month, -(topOffset - dayIndex - 1)),
          props.month
        )
      ),
      ...Array.from({ length: daysInMonth }, (_, dayIndex) =>
        getCell(new Date(props.year, props.month, dayIndex + 1), props.month)
      ),
      ...Array.from({ length: bottomOffset }, (_, dayIndex) =>
        getCell(
          new Date(props.year, props.month + 1, dayIndex + 1),
          props.month
        )
      ),
    ];
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
        <Index each={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}>
          {(day, _) => <div class="text-center font-semibold">{day()}</div>}
        </Index>
        <Index each={cells()}>
          {(cell, _) => (
            <div
              class="px-2 m-1 rounded-md text-center"
              classList={{
                "bg-green-200 text-green-700": cell().isToday,
                "bg-slate-200": cell().isCurrentMonth,
                "bg-slate-300 text-slate-500":
                  !cell().isCurrentMonth && !cell().isToday,
              }}
            >
              {cell().date.getDate()}
            </div>
          )}
        </Index>
      </div>
    </div>
  );
};

export default CalendarMonth;

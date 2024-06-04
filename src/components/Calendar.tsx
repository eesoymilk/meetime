import { type Component, Index } from "solid-js";
import CalendarMonth from "./CalendarMonth";
import { useDatePickerContext } from "~/contexts/datePicker";

interface CalendarProps {
  selectedYear: number;
  selectedMonth: number;
}

const Calendar: Component<CalendarProps> = (props) => {
  const [_, { setStartDate }] = useDatePickerContext();

  const handleMouseLeave = () => setStartDate(null);

  return (
    <div onMouseLeave={handleMouseLeave} class="flex w-96 overflow-x-hidden">
      <Index each={Array(12).fill(null)}>
        {(_, month) => (
          <CalendarMonth
            year={props.selectedYear}
            month={month}
            translateXPercent={-props.selectedMonth * 100}
          />
        )}
      </Index>
    </div>
  );
};

export default Calendar;

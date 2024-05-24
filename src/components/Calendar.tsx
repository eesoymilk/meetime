import { clientOnly } from "@solidjs/start";
import { type Component, Index } from "solid-js";

const CalendarMonth = clientOnly(() => import("~/components/CalendarMonth"));

interface CalendarProps {
  selectedYear: number;
  selectedMonth: number;
}

const Calendar: Component<CalendarProps> = (props) => (
  <div class="flex w-96 overflow-x-hidden">
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

export default Calendar;

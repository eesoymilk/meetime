import { createSignal, onMount, type Component } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import Calendar from "~/components/Calendar";
import { useDatePickerContext } from "~/contexts/datePicker";
import type { ClassValue } from "clsx";
import { cn } from "~/utils/cn";

const DatePicker: Component = () => {
  const [_, { setStartDate }] = useDatePickerContext();

  const [selectedYear, setSelectedYear] = createSignal(0);
  const [selectedMonth, setSelectedMonth] = createSignal(0);

  const iconClasses: ClassValue[] = [
    "text-slate-400",
    "group-hover:text-slate-700",
    "transition-colors",
    "duration-100",
  ];

  const decrementMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 0) {
        setSelectedYear((prev) => prev - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const incrementMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 11) {
        setSelectedYear((prev) => prev + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const handleMouseLeave = () => {
    setStartDate(null);
  };

  onMount(() => {
    const now = new Date();
    setSelectedYear(now.getFullYear());
    setSelectedMonth(now.getMonth());
  });

  return (
    <div
      onMouseLeave={handleMouseLeave}
      class="flex flex-col items-center justify-center"
    >
      <h3 class="text-xl font-semibold">Dates</h3>
      <div class="flex gap-2">
        <button
          title="decrement month"
          type="button"
          class="group"
          onclick={decrementMonth}
        >
          <Icon
            icon="material-symbols:navigate-before"
            class={cn(iconClasses)}
            height={32}
          />
        </button>
        <button
          title="increment month"
          type="button"
          class="group"
          onclick={incrementMonth}
        >
          <Icon
            icon="material-symbols:navigate-next"
            class={cn(iconClasses)}
            height={32}
          />
        </button>
      </div>
      <Calendar selectedYear={selectedYear()} selectedMonth={selectedMonth()} />
    </div>
  );
};

export default DatePicker;

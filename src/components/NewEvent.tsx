import { createSignal, onMount, type Component } from "solid-js";
import { clientOnly } from "@solidjs/start";
import { Icon } from "@iconify-icon/solid";
import Calendar from "./Calendar";

// const Calendar = clientOnly(() => import("~/components/Calendar"));

const NewEvent: Component = () => {
  const [selectedYear, setSelectedYear] = createSignal(0);
  const [selectedMonth, setSelectedMonth] = createSignal(0);

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

  onMount(() => {
    const now = new Date();
    setSelectedYear(now.getFullYear());
    setSelectedMonth(now.getMonth());
  });

  return (
    <div>
      <h2 class="text-center text-2xl font-bold">New Event</h2>
      <div class="flex flex-col md:flex-row justify-center items-center">
        <div class="flex flex-col items-center justify-center">
          <h3 class="text-xl font-semibold">Dates</h3>
          <div class="flex gap-2">
            <button class="group" onclick={decrementMonth}>
              <Icon
                icon="material-symbols:navigate-before"
                class="text-slate-400 group-hover:text-slate-700 transition-colors duration-100"
                height={32}
              />
            </button>
            <button class="group" onclick={incrementMonth}>
              <Icon
                icon="material-symbols:navigate-next"
                class="text-slate-400 group-hover:text-slate-700 transition-colors duration-100"
                height={32}
              />
            </button>
          </div>
          <Calendar
            selectedYear={selectedYear()}
            selectedMonth={selectedMonth()}
          />
        </div>
      </div>
    </div>
  );
};

export default NewEvent;

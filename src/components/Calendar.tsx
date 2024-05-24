import { Component, createMemo, createSignal, For } from "solid-js";

const Calendar: Component = () => {
  const [selectedYear, setSelectedYear] = createSignal(
    new Date().getFullYear()
  );
  const calenderCells = createMemo((): (Date | null)[][] =>
    Array.from({ length: 12 }, (_, monthIndex) => {
      const daysInMonth = new Date(selectedYear(), monthIndex + 1, 0).getDate();
      const topOffset = new Date(selectedYear(), monthIndex, 1).getDay();
      const numberOfCells = Math.ceil((daysInMonth + topOffset) / 7) * 7;
      const bottomOffset = numberOfCells - (daysInMonth + topOffset);

      return [
        ...Array(topOffset).fill(null),
        ...Array.from(
          { length: daysInMonth },
          (_, dayIndex) => new Date(selectedYear(), monthIndex, dayIndex + 1)
        ),
        ...Array(bottomOffset).fill(null),
      ];
    })
  );

  return (
    <div class="flex w-96 gap-8 p-8 overflow-x-scroll">
      <For each={calenderCells()}>
        {(monthCells, monthIndex) => {
          return (
            <div class="flex-shrink-0 w-80">
              <div class="text-center">
                {new Date(0, monthIndex()).toLocaleString("default", {
                  month: "long",
                })}
              </div>
              <div class="grid grid-cols-7">
                <For each={monthCells}>
                  {(date, dateIndex) => {
                    return (
                      <div
                        class={`${
                          date
                            ? "bg-slate-200 text-slate-900"
                            : "bg-slate-100 text-slate-500"
                        } p-2 m-1 rounded-md text-center`}
                      >
                        {date ? date.getDate() : ""}
                      </div>
                    );
                  }}
                </For>
              </div>
            </div>
          );
        }}
      </For>
    </div>
  );
};

export default Calendar;

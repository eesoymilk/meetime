import { type Component } from "solid-js";
import Clock from "~/components/Clock";
import { useClockRangeContext } from "~/contexts/clockRange";

const TimeRange: Component = () => {
  const [_, { setStartHour }] = useClockRangeContext();

  const handleMouseLeave = () => {
    setStartHour(null);
  };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      class="flex flex-col gap-2 items-center justify-center"
    >
      <h3 class="text-xl font-semibold">Time Range</h3>
      <Clock />
    </div>
  );
};

export default TimeRange;

import type { ClassValue } from "clsx";
import { Index, mergeProps, type Component } from "solid-js";
import { useDatePickerContext } from "~/contexts/datePicker";
import { cn } from "~/utils/cn";
import ClockSector from "./ClockSector";

interface ClockRange {}

interface ClockProps {
  startHour?: number;
  endHour?: number;
  step?: number;
  radiusValue?: number;
  radiusUnit?: string;
}

const defaultClockRange: ClockRange = {
  startHour: 0,
  endHour: 24,
};

const Clock: Component<ClockProps> = (props_) => {
  const props = mergeProps(
    {
      startHour: 0,
      endHour: 24,
      step: 8,
      radiusValue: 6,
      radiusUnit: "rem",
    },
    props_
  );

  const radius = () => `${props.radiusValue}${props.radiusUnit}`;

  const diameter = () => `${2 * props.radiusValue}${props.radiusUnit}`;

  const numberOfDivisions = () => {
    const result = (props.endHour - props.startHour) / props.step;
    if (result % 1 !== 0) {
      throw new Error("Invalid range");
    }
    return result;
  };

  const sectorAngle = () => {
    return (1 / numberOfDivisions()) * 2 * Math.PI;
  };

  return (
    <div class="flex gap-2 relative">
      <div>{numberOfDivisions()}</div>
      <Index each={Array(numberOfDivisions()).fill(null)}>
        {(_, index) => {
          const hour = props.startHour + index * props.step;
          return (
            <div
              style={{ transform: `rotate(${index * sectorAngle()}rad)` }}
              class="absolute origin-bottom-left"
            >
              <ClockSector angle={sectorAngle()} />
            </div>
          );
        }}
      </Index>
    </div>
  );
};

export default Clock;

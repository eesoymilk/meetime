import { Index, mergeProps, type Component } from "solid-js";
import ClockSector from "./ClockSector";
import { SectorAngle } from "~/constants/clock";

interface ClockProps {
  startHour?: number;
  endHour?: number;
  step?: number;
  radiusValue?: number;
  radiusUnit?: string;
}

const Clock: Component<ClockProps> = (props_) => {
  const props = mergeProps(
    {
      startHour: 0,
      endHour: 24,
      step: 1,
      radiusValue: 6,
      radiusUnit: "rem",
    },
    props_
  );

  const radius = () => `${props.radiusValue}${props.radiusUnit}`;

  const diameter = () => `${2 * props.radiusValue}${props.radiusUnit}`;

  return (
    <div style={{ height: diameter(), width: diameter() }} class="relative">
      <Index each={Array(24).fill(null)}>
        {(_, hour) => (
          <div
            style={{
              width: radius(),
              height: radius(),
              transform: `rotate(${hour * SectorAngle}rad)`,
            }}
            class="absolute m-auto top-0 right-0 pointer-events-none origin-bottom-left"
          >
            <ClockSector
              svgSizeValue={props.radiusValue}
              svgSizeUnit={props.radiusUnit}
              hour={hour}
            />
          </div>
        )}
      </Index>
    </div>
  );
};

export default Clock;

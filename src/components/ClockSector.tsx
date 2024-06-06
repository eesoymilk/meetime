import { ClassValue } from "clsx";
import { mergeProps, type Component } from "solid-js";
import { SectorAngle } from "~/constants/clock";
import { useClockRangeContext } from "~/contexts/clockRange";
import { cn } from "~/utils/cn";

interface ClockSectorProps {
  svgSizeValue: number;
  svgSizeUnit: string;
  hour: number;
  radius?: number;
  fill?: string;
  stokeColor?: string;
  strokeWeight?: number;
}

const ClockSector: Component<ClockSectorProps> = (props_) => {
  const props = mergeProps(
    {
      radius: 300,
      fill: "green",
      stokeColor: "black",
      strokeWeight: 2,
    },
    props_
  );

  const [
    { startHour, hoveredHour, hours },
    { setStartHour, setHoveredHour },
    { selectHours },
  ] = useClockRangeContext();

  const svgDimensions = (): string[] =>
    [props.svgSizeValue * Math.sin(SectorAngle), props.svgSizeValue].map(
      (value) => `${value}${props.svgSizeUnit}`
    );

  const sectorDimensions = (): number[] => {
    const offset = 2 * props.strokeWeight;
    return [
      offset + props.radius * Math.sin(SectorAngle),
      offset + props.radius,
    ];
  };

  const pathCommands = () =>
    [
      `M ${props.strokeWeight} ${props.strokeWeight}`,
      `a ${props.radius} ${props.radius} 0 0 1 ${
        props.radius * Math.sin(SectorAngle)
      } ${props.radius * (1 - Math.cos(SectorAngle))}`,
      `L ${props.strokeWeight} ${props.strokeWeight + props.radius}`,
      `v ${-props.radius}`,
      "Z",
    ].join(" ");

  const isPicking = () => {
    const start = startHour();
    const hovered = hoveredHour();

    if (start === null || hovered === null) return false;

    let diff = hovered - start;

    if (diff < 0) {
      diff += 24;
    }

    if (diff <= 12) {
      return start <= props.hour && props.hour <= hovered;
    } else {
      return props.hour <= start || props.hour >= hovered;
    }
  };

  const isPicked = () =>
    hours().some((picked, hour) => picked && hour === props.hour);

  const classList = () => {
    const classes: ClassValue[] = ["cursor-pointer", "pointer-events-auto"],
      picked = isPicked(),
      picking = isPicking();

    // background color
    if (picking && !picked) {
      classes.push("fill-green-200");
    } else if (picking && picked) {
      classes.push("fill-green-400");
    } else if (picked) {
      classes.push("fill-green-700");
    } else {
      classes.push("fill-slate-200");
    }

    return classes;
  };

  const handleMouseEnter = () => setHoveredHour(props.hour);
  const handleMouseLeave = () => setHoveredHour(null);
  const handleMouseDown = () => setStartHour(props.hour);
  const handleMouseUp = () => selectHours(props.hour);

  return (
    <svg
      class="top-0 right-0"
      width={svgDimensions()[0]}
      height={svgDimensions()[1]}
      viewBox={`0 0 ${sectorDimensions()[0]} ${sectorDimensions()[1]}`}
    >
      <path
        class={cn(classList())}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onmousedown={handleMouseDown}
        onmouseup={handleMouseUp}
        d={pathCommands()}
        // fill={props.fill}
        // stroke={props.stokeColor}
        // stroke-width={props.strokeWeight}
      />
    </svg>
  );
};

export default ClockSector;

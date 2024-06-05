import { mergeProps, type Component } from "solid-js";

interface ClockSectorProps {
  radius?: number;
  fill?: string;
  stokeColor?: string;
  strokeWeight?: number;
  angle: number;
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

  const width = () =>
    props.angle < Math.PI / 2
      ? 2 * props.strokeWeight + props.radius * Math.sin(props.angle)
      : 2 * props.strokeWeight + props.radius;

  const height = () => 2 * props.strokeWeight + props.radius;

  const pathCommands = () =>
    [
      `M ${props.strokeWeight} ${props.strokeWeight}`,
      `a ${props.radius} ${props.radius} 0 0 1 ${
        props.radius * Math.sin(props.angle)
      } ${props.radius * (1 - Math.cos(props.angle))}`,
      `L ${props.strokeWeight} ${props.strokeWeight + props.radius}`,
      `v ${-props.radius}`,
      "Z",
    ].join(" ");

  return (
    <svg
      width={width()}
      height={height()}
      viewBox={`0 0 ${width()} ${height()}`}
    >
      <path
        class="cursor-pointer"
        d={pathCommands()}
        fill={props.fill}
        stroke={props.stokeColor}
        stroke-width={props.strokeWeight}
      />
    </svg>
  );
};

export default ClockSector;

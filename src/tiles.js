import React from "react";

//
// EIGHT
//
export const getTileEight = ({
  width,
  height,
  x,
  y,
  lineColour = "#000",
  totalStripes,
  stripeSpacing
}) => {
  const stripes = [];
  const horizontalOffset = width / totalStripes;

  for (let s = 0; s <= totalStripes; s++) {
    stripes.push(
      <line
        key={s}
        x1={width - s * horizontalOffset}
        x2={width}
        y1={s * stripeSpacing}
        y2={s * stripeSpacing}
      />
    );
  }

  return (
    <g
      key={`x${x},y${y}`}
      transform={`translate(${x} ${y})`}
      stroke={lineColour}
    >
      <polygon
        points={`${0},${height} ${0},${0} ${width},${0}`}
        fill={"#000"}
      />
      {stripes}
    </g>
  );
};

//
// SEVEN
//
export const getTileSeven = ({ width, height, x, y, lineColour = "#000" }) => {
  return (
    <g
      key={`x${x},y${y}`}
      transform={`translate(${x} ${y})`}
      stroke={lineColour}
    >
      <line x1={0} x2={width / 2} y1={height / 2} y2={0} />
      <line x1={0} x2={width} y1={height} y2={0} />
      <line x1={width / 2} x2={width} y1={height} y2={height / 2} />
    </g>
  );
};

//
// SIX
//
export const getTileSix = ({
  width,
  height,
  x,
  y,
  lineColour = "#000",
  totalTightStripes
}) => {
  const hatchings = [];
  const verticalSpacing = height / totalTightStripes;
  const horizontalSpacing = width / totalTightStripes;

  for (let h = 0; h <= totalTightStripes; h++) {
    hatchings.push(
      <line
        key={h}
        x1={0}
        x2={width}
        y1={h * verticalSpacing}
        y2={h * verticalSpacing}
        strokeWidth={1}
        stroke={"#000"}
      />,
      <line
        key={h + "VERT"}
        x1={h * horizontalSpacing}
        x2={h * horizontalSpacing}
        y1={0}
        y2={height}
        strokeWidth={1}
        stroke={"#000"}
      />
    );
  }
  return (
    <g
      key={`x${x},y${y}`}
      transform={`translate(${x} ${y})`}
      stroke={lineColour}
    >
      {hatchings}
    </g>
  );
};

//
// FIVE
//
export const getTileFive = ({
  width,
  height,
  x,
  y,
  lineColour = "#000",
  totalStripes,
  stripeSpacing,
  options = { top: false, right: false, bottom: false, left: false }
}) => {
  const stripes = [];
  for (let s = 0; s <= totalStripes; s++) {
    stripes.push(
      <line
        key={s}
        x1={0}
        x2={width}
        y1={s * stripeSpacing}
        y2={s * stripeSpacing}
      />
    );
  }

  return (
    <g
      key={`x${x},y${y}`}
      transform={`translate(${x} ${y})`}
      stroke={lineColour}
    >
      {stripes}

      {options.top && (
        <line x1={0} y1={0} x2={width} y2={0} stroke={lineColour} />
      )}
      {options.bottom && (
        <line x1={0} y1={height} x2={width} y2={height} stroke={lineColour} />
      )}
      {options.left && (
        <line x1={0} y1={0} x2={0} y2={height} stroke={lineColour} />
      )}
      {options.right && (
        <line x1={width} y1={0} x2={width} y2={height} stroke={lineColour} />
      )}
    </g>
  );
};

//
// FOUR
//
export const getTileFour = ({ width, height, x, y, lineColour = "#000" }) => {
  return (
    <g
      key={`x${x},y${y}`}
      transform={`translate(${x} ${y})`}
      stroke={lineColour}
    >
      <polygon
        points={`${0},${height} ${0},${0} ${width},${0}`}
        fill={"#000"}
      />
      <line x1={0} x2={width} y1={height} y2={0} />
      <line x1={width / 2} x2={width} y1={height} y2={height / 2} />
    </g>
  );
};

//
// THREE
//
export const getTileThree = ({
  width,
  height,
  x,
  y,
  lineColour = "#000",
  totalStripes,
  totalTightStripes,
  stripeSpacing,
  options = { top: false, right: false, bottom: false, left: false }
}) => {
  const stripes = [];
  const hatchings = [];
  const verticalSpacing = height / totalTightStripes;
  const horizontalSpacing = width / totalTightStripes;

  const horizontalOffset = width / totalStripes;

  for (let h = 0; h <= totalTightStripes; h++) {
    hatchings.push(
      <line
        key={h + "horz"}
        x1={width - h * horizontalSpacing}
        x2={width}
        y1={h * verticalSpacing}
        y2={h * verticalSpacing}
        strokeWidth={4}
        stroke={"#000"}
      />,
      <line
        key={h + "VERT"}
        x1={h * horizontalSpacing}
        x2={h * horizontalSpacing}
        y1={height - h * verticalSpacing}
        y2={height}
        strokeWidth={4}
        stroke={"#000"}
      />
    );
  }

  for (let s = 0; s <= totalStripes; s++) {
    stripes.push(
      <line
        key={s}
        x1={0}
        x2={width - s * horizontalOffset}
        y1={s * stripeSpacing}
        y2={s * stripeSpacing}
      />
    );
  }

  return (
    <g
      key={`x${x},y${y}`}
      transform={`translate(${x} ${y})`}
      stroke={lineColour}
    >
      {stripes}
      {hatchings}
      {/* <polygon
        points={`${0},${height} ${width},${0} ${width},${height}`}
        fill={"#000"}
      /> */}

      {options.top && (
        <line x1={0} y1={0} x2={width} y2={0} stroke={lineColour} />
      )}
      {options.bottom && (
        <line x1={0} y1={height} x2={width} y2={height} stroke={lineColour} />
      )}
      {options.left && (
        <line x1={0} y1={0} x2={0} y2={height} stroke={lineColour} />
      )}
      {options.right && (
        <line x1={width} y1={0} x2={width} y2={height} stroke={lineColour} />
      )}
    </g>
  );
};

//
// TWO
//
export const getTileTwo = ({
  width,
  height,
  x,
  y,
  lineColour = "#000",
  totalStripes,
  stripeSpacing
}) => {
  const stripes = [];
  const horizontalOffset = width / totalStripes;

  for (let s = 0; s <= totalStripes; s++) {
    stripes.push(
      <line
        key={s}
        x1={width - s * horizontalOffset}
        x2={width}
        y1={s * stripeSpacing}
        y2={s * stripeSpacing}
      />
    );
  }

  return (
    <g
      key={`x${x},y${y}`}
      transform={`translate(${x} ${y})`}
      stroke={lineColour}
    >
      <line x1={0} x2={width / 2} y1={height / 2} y2={0} />
      <line x1={0} x2={width} y1={height} y2={0} />
      {stripes}
    </g>
  );
};

//
// ONE
//
export const getTileOne = ({
  width,
  height,
  x,
  y,
  lineColour = "#000",
  fill = "#fff",
  options = { top: false, right: false, bottom: false, left: false }
}) => {
  return (
    <g key={`x${x},y${y}`} transform={`translate(${x} ${y})`}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        stroke={"none"}
        fill={"none"}
      />

      {/* {options.top && (
        <line x1={0} y1={0} x2={width} y2={0} stroke={lineColour} />
      )}*/}
      {options.bottom && (
        <line x1={0} y1={height} x2={width} y2={height} stroke={lineColour} />
      )}
      {options.left && (
        <line x1={0} y1={0} x2={0} y2={height} stroke={lineColour} />
      )}
      {/* {options.right && (
        <line x1={width} y1={0} x2={width} y2={height} stroke={lineColour} />
      )} */}
    </g>
  );
};

//
// ErrorTile
//
export const getErrorTile = ({ size, x, y, lineColour = "#000" }) => {
  return (
    <rect
      key={`x${x},y${y}`}
      x={x}
      y={y}
      width={size}
      height={size}
      stroke={"none"}
      fill={"none"}
    />
  );
};

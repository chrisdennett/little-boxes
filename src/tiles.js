import React from "react";

//
// EIGHT
//
export const getTileEight = ({
  size,
  x,
  y,
  lineColour = "#000",
  totalStripes,
  stripeSpacing
}) => {
  const stripes = [];
  for (let s = 1; s <= totalStripes; s++) {
    stripes.push(
      <line
        key={s}
        x1={size - s * stripeSpacing}
        x2={size}
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
      <polygon points={`${0},${size} ${0},${0} ${size},${0}`} fill={"#000"} />
      {stripes}
    </g>
  );
};

//
// SEVEN
//
export const getTileSeven = ({
  size,
  x,
  y,
  lineColour = "#000",
  totalStripes,
  stripeSpacing
}) => {
  return (
    <g
      key={`x${x},y${y}`}
      transform={`translate(${x} ${y})`}
      stroke={lineColour}
    >
      <line x1={0} x2={size / 2} y1={size / 2} y2={0} />
      <line x1={0} x2={size} y1={size} y2={0} />
      <line x1={size / 2} x2={size} y1={size} y2={size / 2} />
    </g>
  );
};

//
// SIX
//
export const getTileSix = ({ size, x, y, lineColour = "#000" }) => {
  return (
    <rect
      key={`x${x},y${y}`}
      x={x}
      y={y}
      width={size}
      height={size}
      stroke={"none"}
      fill={"#000"}
    />
  );
};

//
// FIVE
//
export const getTileFive = ({
  size,
  x,
  y,
  lineColour = "#000",
  totalStripes,
  stripeSpacing,
  options = { top: false, right: false, bottom: false, left: false }
}) => {
  const stripes = [];
  for (let s = 1; s <= totalStripes; s++) {
    stripes.push(
      <line
        key={s}
        x1={0}
        x2={size}
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
        <line x1={0} y1={0} x2={size} y2={0} stroke={lineColour} />
      )}
      {options.bottom && (
        <line x1={0} y1={size} x2={size} y2={size} stroke={lineColour} />
      )}
      {options.left && (
        <line x1={0} y1={0} x2={0} y2={size} stroke={lineColour} />
      )}
      {options.right && (
        <line x1={size} y1={0} x2={size} y2={size} stroke={lineColour} />
      )}
    </g>
  );
};

//
// FOUR
//
export const getTileFour = ({
  size,
  x,
  y,
  lineColour = "#000",
  totalStripes,
  stripeSpacing
}) => {
  return (
    <g
      key={`x${x},y${y}`}
      transform={`translate(${x} ${y})`}
      stroke={lineColour}
    >
      <polygon points={`${0},${size} ${0},${0} ${size},${0}`} fill={"#000"} />
      <line x1={0} x2={size} y1={size} y2={0} />
      <line x1={size / 2} x2={size} y1={size} y2={size / 2} />
    </g>
  );
};

//
// THREE
//
export const getTileThree = ({
  size,
  x,
  y,
  lineColour = "#000",
  totalStripes,
  stripeSpacing
}) => {
  const stripes = [];
  for (let s = 1; s <= totalStripes; s++) {
    stripes.push(
      <line
        key={s}
        x1={0}
        x2={size - s * stripeSpacing}
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
      <polygon
        points={`${0},${size} ${size},${0} ${size},${size}`}
        fill={"#000"}
      />
    </g>
  );
};

//
// TWO
//
export const getTileTwo = ({
  size,
  x,
  y,
  lineColour = "#000",
  totalStripes,
  stripeSpacing
}) => {
  const stripes = [];
  for (let s = 1; s <= totalStripes; s++) {
    stripes.push(
      <line
        key={s}
        x1={size - s * stripeSpacing}
        x2={size}
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
      <line x1={0} x2={size / 2} y1={size / 2} y2={0} />
      <line x1={0} x2={size} y1={size} y2={0} />
      {stripes}
    </g>
  );
};

//
// ONE
//
export const getTileOne = ({
  size,
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
        width={size}
        height={size}
        stroke={"none"}
        fill={fill}
      />

      {options.top && (
        <line x1={0} y1={0} x2={size} y2={0} stroke={lineColour} />
      )}
      {options.bottom && (
        <line x1={0} y1={size} x2={size} y2={size} stroke={lineColour} />
      )}
      {options.left && (
        <line x1={0} y1={0} x2={0} y2={size} stroke={lineColour} />
      )}
      {options.right && (
        <line x1={size} y1={0} x2={size} y2={size} stroke={lineColour} />
      )}
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
      fill={"#FF0000"}
    />
  );
};

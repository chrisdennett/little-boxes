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
  lineThickness,
  totalStripes,
  totalTightStripes,
  stripeSpacing
}) => {
  const stripes = [];
  const horizontalOffset = width / totalStripes;

  const hatchings = getStripesForTriangle({
    height,
    width,
    totalStripes: totalTightStripes
  });

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
      strokeWidth={lineThickness}
    >
      {hatchings}
      {stripes}
    </g>
  );
};

//
// SEVEN
//
export const getTileSeven = ({
  width,
  height,
  x,
  y,
  lineColour = "#000",
  lineThickness
}) => {
  return (
    <g
      key={`x${x},y${y}`}
      transform={`translate(${x} ${y})`}
      stroke={lineColour}
      strokeWidth={lineThickness}
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
  lineThickness,
  totalTightStripes
}) => {
  const hatchings = getStripesForRectangle({
    height,
    width,
    totalStripes: totalTightStripes
  });

  return (
    <g
      key={`x${x},y${y}`}
      transform={`translate(${x} ${y})`}
      stroke={lineColour}
      strokeWidth={lineThickness}
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
  lineThickness,
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
      strokeWidth={lineThickness}
    >
      {stripes}
    </g>
  );
};

//
// FOUR
//
export const getTileFour = ({
  width,
  height,
  x,
  y,
  lineColour = "#000",
  lineThickness,
  totalTightStripes
}) => {
  const hatchings = getStripesForTriangle({
    height,
    width,
    totalStripes: totalTightStripes
  });

  return (
    <g
      key={`x${x},y${y}`}
      transform={`translate(${x} ${y})`}
      stroke={lineColour}
      strokeWidth={lineThickness}
    >
      {hatchings}

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
  lineThickness,
  totalTightStripes,
  stripeSpacing,
  options = { top: false, right: false, bottom: false, left: false }
}) => {
  const hatchings = getStripesForTriangle({
    height,
    width,
    totalStripes: totalTightStripes,
    isBottomRight: true
  });

  const stripes = [];
  const horizontalOffset = width / totalStripes;

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
      strokeWidth={lineThickness}
    >
      {stripes}
      {hatchings}
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
  lineThickness,
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
      strokeWidth={lineThickness}
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
  lineThickness,
  options = { top: false, right: false, bottom: false, left: false }
}) => {
  return (
    <g
      key={`x${x},y${y}`}
      transform={`translate(${x} ${y})`}
      stroke={lineColour}
      strokeWidth={lineThickness}
    >
      {/* <rect
        x={0}
        y={0}
        width={width}
        height={height}
        stroke={"none"}
        fill={"none"}
      /> */}

      {/* {options.top && (
        <line x1={0} y1={0} x2={width} y2={0} stroke={lineColour} />
      )}*/}
      {options.bottom && <line x1={0} y1={height} x2={width} y2={height} />}
      {options.left && <line x1={0} y1={0} x2={0} y2={height} />}
      {options.right && (
        <line x1={width} y1={0} x2={width} y2={height} stroke={lineColour} />
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
      fill={"#FF00FF"}
    />
  );
};

//
// Striped rectangle
//
const getStripesForRectangle = ({ height, width, totalStripes }) => {
  const hatchings = [];
  const verticalSpacing = height / totalStripes;
  const horizontalSpacing = width / totalStripes;

  for (let h = 1; h <= totalStripes * 2; h++) {
    let startY = h * verticalSpacing;
    let endY = 0;

    let startX = 0;
    let endX = h * horizontalSpacing;

    if (startY > height) {
      startY = height;
      endY = h * verticalSpacing - height;
    }

    if (endX > width) {
      startX = h * horizontalSpacing - width;
      endX = width;
    }

    hatchings.push(
      <line key={h} x1={startX} x2={endX} y1={startY} y2={endY} />
    );
  }

  return hatchings;
};

//
// Striped triangle
//
const getStripesForTriangle = ({
  height,
  width,
  totalStripes,
  isBottomRight = false
}) => {
  const hatchings = [];
  const verticalSpacing = height / totalStripes;
  const horizontalSpacing = width / totalStripes;

  for (let h = 0; h <= totalStripes; h++) {
    let startY = h * verticalSpacing;
    let endY = 0;

    let startX = 0;
    let endX = h * horizontalSpacing;

    if (isBottomRight) {
      startY = height;
      endY = h * verticalSpacing;

      startX = h * horizontalSpacing;
      endX = width;
    }

    hatchings.push(
      <line
        key={h + "" + startX + "" + startY}
        x1={startX}
        x2={endX}
        y1={startY}
        y2={endY}
      />
    );
  }

  return hatchings;
};

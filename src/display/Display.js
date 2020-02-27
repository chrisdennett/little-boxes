import React from "react";
import styled from "styled-components";
import { GetTiles, getTileTypes } from "../utils";

const width = 2550;
const height = 3300;
const tilesPerWidth = 20;

const Display = ({ appData }) => {
  // const { lineThickness } = appData.settings;
  const lineColour = "#ff0000";

  const tiles = GetTiles({ width, height, tilesPerWidth, lineColour });
  const keyTiles = getTileTypes({});

  console.log("keyTiles: ", keyTiles);

  return (
    <Container id="svgHolder">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width / 2} ${height}`}
      >
        {keyTiles}

        {/* <rect x={0} y={0} width={width} height={height} fill={"#fff"} />
        {tiles}
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={"none"}
          strokeWidth={2}
          stroke={lineColour}
        /> */}
      </svg>
    </Container>
  );
};

export default Display;

export const RGBtoCMYK = (R, G, B) => {
  const r = R / 255;
  const g = G / 255;
  const b = B / 255;

  let k = Math.min(1 - r, 1 - g, 1 - b);
  let c = (1 - r - k) / (1 - k);
  let m = (1 - g - k) / (1 - k);
  let y = (1 - b - k) / (1 - k);

  c = isNaN(c) ? 0 : c;
  m = isNaN(m) ? 0 : m;
  y = isNaN(y) ? 0 : y;

  c = Math.round(c * 100);
  m = Math.round(m * 100);
  y = Math.round(y * 100);
  k = Math.round(k * 100);

  return { c, m, y, k };
};

export const CMYKtoRGB = (C, M, Y, K) => {
  const c = C / 100;
  const m = M / 100;
  const y = Y / 100;
  const k = K / 100;

  let r = 1 - Math.min(1, c * (1 - k) + k);
  let g = 1 - Math.min(1, m * (1 - k) + k);
  let b = 1 - Math.min(1, y * (1 - k) + k);

  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  return { r, g, b };
};

// STYLES
const Container = styled.div`
  background: white;
  width: 100%;
  height: 100%;

  svg {
    max-width: 100%;
    max-height: 100%;
  }
`;

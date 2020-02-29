import React from "react";
import styled from "styled-components";
import { GetTiles, getTileTypes } from "../utils";

const Display = ({ appData }) => {
  const { lineColour, showOuterBox, lineThickness, showKey } = appData;
  const tileWidth = 250;
  const tileHeight = 250;
  const tilesWide = 10;
  const tilesHigh = 10;
  const tightLinesPerHeight = 16;
  const midLinesPerHeight = 8;
  const looseLinesPerHeight = 3;

  const tiles = GetTiles({
    tileWidth,
    tileHeight,
    tilesWide,
    tilesHigh,
    lineColour: lineColour,
    lineThickness: lineThickness,
    tightLinesPerHeight,
    midLinesPerHeight,
    looseLinesPerHeight
  });

  const keyTiles = getTileTypes({
    tileWidth,
    tileHeight,
    lineColour,
    lineThickness
  });
  const svgWidth = tileWidth * tilesWide;
  const svgHeight = tileHeight * tilesHigh;

  const margin = 100;
  const svgWidthAfterMargin = svgWidth - margin * 2;
  const svgHeightAfterMargin = svgHeight - margin * 2;
  const svgScaleWidth = svgWidthAfterMargin / svgWidth;
  const svgScaleHeight = svgHeightAfterMargin / svgHeight;

  return (
    <Container>
      <SvgHolder id="svgHolder">
        {showKey && (
          <TilesSVG
            className="keySVG"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${tileWidth * 1.3} ${svgHeight}`}
          >
            <g
              transform={`translate(${0} ${margin}) scale(${svgScaleWidth} ${svgScaleHeight})`}
            >
              {keyTiles}
            </g>
          </TilesSVG>
        )}

        <MainSVG
          className="mainSVG"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        >
          <g
            transform={`translate(${margin} ${margin}) scale(${svgScaleWidth} ${svgScaleHeight})`}
          >
            <rect
              x={0}
              y={0}
              width={svgWidth}
              height={svgHeight}
              fill={"#fff"}
            />
            {tiles}

            {showOuterBox && (
              <rect
                x={0}
                y={0}
                width={svgWidth}
                height={svgHeight}
                fill={"none"}
                strokeWidth={lineThickness}
                stroke={lineColour}
              />
            )}
          </g>
        </MainSVG>
      </SvgHolder>
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
  /* padding: 40px; */
  background: #fff;
  border-radius: 10px;
  /* border: 50px solid #000; */
  background-image: url(./img/cutting-mat-tile.png);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const SvgHolder = styled.div`
  width: 95%;
  height: 95%;
  display: flex;
`;

const MainSVG = styled.svg`
  background: white;
  border-radius: 5px;
  flex: 1;
`;

const TilesSVG = styled.svg`
  margin-right: 10px;
  background: white;
  border-radius: 5px;
  flex: 1;
  flex: 1;
  max-width: 200px;
  max-height: 700px;
`;

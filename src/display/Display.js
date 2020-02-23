import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GetTiles } from "../utils";

const width = 2550;
const height = 3300;
const tilesPerWidth = 20;

const Display = ({ sizeInfo, appData }) => {
  const { totalBlocksAlongLongestSide } = appData.settings;

  const tiles = GetTiles({ width, height, tilesPerWidth });

  return (
    <Container id="svgHolder">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
      >
        {tiles}
      </svg>
    </Container>
  );
};

export default Display;

const getCMYKBlockData = inputCanvas => {
  const { width: inputW, height: inputH } = inputCanvas;
  const blockData = {
    width: inputW,
    height: inputH,
    rows: [],
    cols: []
  };

  const inputCtx = inputCanvas.getContext("2d");
  let imgData = inputCtx.getImageData(0, 0, inputW, inputH);
  let pixels = imgData.data;

  let i, r, g, b, cFrac, mFrac, yFrac, kFrac, x, y;

  for (y = 0; y < inputH; y++) {
    const row = [];

    for (x = 0; x < inputW; x++) {
      i = (y * inputW + x) * 4;

      r = pixels[i];
      g = pixels[i + 1];
      b = pixels[i + 2];

      const { c, m, y: yellow, k } = RGBtoCMYK(r, g, b);

      cFrac = c / 100;
      mFrac = m / 100;
      yFrac = yellow / 100;
      kFrac = k / 100;

      row.push([cFrac, mFrac, yFrac, kFrac]);
    }
    blockData.rows.push(row);
  }

  // loop through the rows and the values in them
  // for each rom push the values each into a different col

  let cellsPerRow = blockData.rows[0].length;
  for (let rowIndex = 0; rowIndex < blockData.rows.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < cellsPerRow; cellIndex++) {
      // add col array if not made yet
      if (!blockData.cols[cellIndex]) blockData.cols[cellIndex] = [];

      // add the row value to the correct col in the correct place
      blockData.cols[cellIndex][rowIndex] = blockData.rows[rowIndex][cellIndex];
    }
  }

  return blockData;
};

const getRGBBlockData = inputCanvas => {
  const { width: inputW, height: inputH } = inputCanvas;
  const blockData = {
    width: inputW,
    height: inputH,
    rows: [],
    cols: []
  };

  const inputCtx = inputCanvas.getContext("2d");
  let imgData = inputCtx.getImageData(0, 0, inputW, inputH);
  let pixels = imgData.data;

  let i, r, g, b, rFrac, gFrac, bFrac, x, y;

  for (y = 0; y < inputH; y++) {
    const row = [];

    for (x = 0; x < inputW; x++) {
      i = (y * inputW + x) * 4;

      r = pixels[i];
      g = pixels[i + 1];
      b = pixels[i + 2];

      rFrac = 1 - r / 255;
      gFrac = 1 - g / 255;
      bFrac = 1 - b / 255;

      row.push([rFrac, gFrac, bFrac]);
    }
    blockData.rows.push(row);
  }

  // loop through the rows and the values in them
  // for each rom push the values each into a different col

  let cellsPerRow = blockData.rows[0].length;
  for (let rowIndex = 0; rowIndex < blockData.rows.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < cellsPerRow; cellIndex++) {
      // add col array if not made yet
      if (!blockData.cols[cellIndex]) blockData.cols[cellIndex] = [];

      // add the row value to the correct col in the correct place
      blockData.cols[cellIndex][rowIndex] = blockData.rows[rowIndex][cellIndex];
    }
  }

  return blockData;
};

const getBlockData = inputCanvas => {
  const { width: inputW, height: inputH } = inputCanvas;
  const blockData = {
    width: inputW,
    height: inputH,
    rows: [],
    cols: []
  };

  const inputCtx = inputCanvas.getContext("2d");
  let imgData = inputCtx.getImageData(0, 0, inputW, inputH);
  let pixels = imgData.data;

  let i, r, g, b, brightness, decimalPercentage, x, y;

  for (y = 0; y < inputH; y++) {
    const row = [];

    for (x = 0; x < inputW; x++) {
      i = (y * inputW + x) * 4;

      r = pixels[i];
      g = pixels[i + 1];
      b = pixels[i + 2];

      brightness = r * 0.2126 + g * 0.7152 + b * 0.0722;

      decimalPercentage = 1 - brightness / 255;
      row.push([decimalPercentage]);
    }
    blockData.rows.push(row);
  }

  // loop through the rows and the values in them
  // for each rom push the values each into a different col

  let cellsPerRow = blockData.rows[0].length;
  for (let rowIndex = 0; rowIndex < blockData.rows.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < cellsPerRow; cellIndex++) {
      // add col array if not made yet
      if (!blockData.cols[cellIndex]) blockData.cols[cellIndex] = [];

      // add the row value to the correct col in the correct place
      blockData.cols[cellIndex][rowIndex] = blockData.rows[rowIndex][cellIndex];
    }
  }

  return blockData;
};

const getDimensions = (sourceW, sourceH, maxWidth, maxHeight) => {
  const widthToHeightRatio = sourceH / sourceW;
  const heightToWidthRatio = sourceW / sourceH;

  // set size based on max width
  let w = maxWidth;
  let h = w * widthToHeightRatio;

  // if that makes the h bigger than max
  if (h > maxHeight) {
    //set size based on max height
    h = maxHeight;
    w = h * heightToWidthRatio;
  }

  // return the output width and height so it can be used to position canvas
  return { width: w, height: h };
};

const createSmallCanvas = (source, maxWidth, maxHeight) => {
  const sourceW = source.width;
  const sourceH = source.height;

  const wToHRatio = sourceH / sourceW;
  const hToWRatio = sourceW / sourceH;

  // allow maxHeight or maxWidth to be null
  if (!maxWidth) maxWidth = source.width;
  if (!maxHeight) maxHeight = source.height;

  let targetW = maxWidth;
  let targetH = targetW * wToHRatio;

  if (sourceH > maxHeight) {
    targetH = maxHeight;
    targetW = targetH * hToWRatio;
  }

  const smallCanvas = document.createElement("canvas");
  const ctx = smallCanvas.getContext("2d");
  smallCanvas.width = targetW;
  smallCanvas.height = targetH;

  ctx.drawImage(source, 0, 0, sourceW, sourceH, 0, 0, targetW, targetH);

  return smallCanvas;
};

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
`;

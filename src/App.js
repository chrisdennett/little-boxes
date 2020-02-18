import React from "react";
import "./styles.css";
// comps
import { GetTiles } from "./utils";

const width = 900;
const height = 900;
const tilesPerWidth = 15;

export default function App() {
  const tiles = GetTiles({ width, height, tilesPerWidth });

  return (
    <svg width={width} height={height}>
      {tiles}
    </svg>
  );
}

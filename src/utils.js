import React from "react";
import {
  getErrorTile,
  getTileEight,
  getTileSeven,
  getTileSix,
  getTileFive,
  getTileFour,
  getTileThree,
  getTileTwo,
  getTileOne
} from "./tiles";

//
// STEP 1: generate front faces (white) squares
//
export const getRandomFrontFaceData = ({
  tileWidth,
  tileHeight,
  tilesWide,
  tilesHigh
}) => {
  const tileDataArray = [];

  for (let tileRow = 0; tileRow < tilesHigh; tileRow++) {
    for (let tileCol = 0; tileCol < tilesWide; tileCol++) {
      const nullIndex = -1;

      const isFirstRow = tileRow === 0;
      const isFirstCol = tileCol === 0;
      const isLastRow = tileRow === tilesWide - 1;
      const isLastCol = tileCol === tilesHigh - 1;

      const index = tileCol + tileRow * tilesWide;

      const indexAbove = isFirstRow ? nullIndex : index - tilesWide;
      const indexAboveLeft =
        isFirstRow || isFirstCol ? nullIndex : indexAbove - 1;
      const indexAboveRight =
        isFirstRow || isLastCol ? nullIndex : indexAbove + 1;

      const indexBelow = isLastRow ? nullIndex : index + tilesWide;
      const indexBelowLeft =
        isLastRow || isFirstCol ? nullIndex : indexBelow - 1;
      const indexBelowRight =
        isLastRow || isLastCol ? nullIndex : indexBelow + 1;

      const indexToLeft = isFirstCol ? nullIndex : index - 1;
      const indexToRight = isLastCol ? nullIndex : index + 1;

      const addTile = Math.random() < 0.5;

      let tileData = {
        row: tileRow,
        col: tileCol,
        isFirstRow,
        isFirstCol,
        isLastCol,
        index,
        indexAbove,
        indexAboveLeft,
        indexAboveRight,
        indexBelow,
        indexBelowLeft,
        indexBelowRight,
        indexToLeft,
        indexToRight,
        x: tileCol * tileWidth,
        y: tileRow * tileHeight,
        width: tileWidth,
        height: tileHeight
      };

      if (addTile) {
        tileData.key = "t1";
        tileData.func = tileTypes.t1.func;
      } else {
        tileData.key = "t7";
        tileData.func = tileTypes.t7.func;
      }
      tileDataArray.push(tileData);
    }
  }

  return tileDataArray;
};

//
// STEP 1.5: Add surrounding tile info
//
export const addTileNeighborInfo = tileDataArray => {
  for (let tileData of tileDataArray) {
    const {
      indexAbove,
      indexAboveLeft,
      indexAboveRight,
      indexBelow,
      indexBelowLeft,
      indexBelowRight,
      indexToLeft,
      indexToRight
    } = tileData;

    tileData.tileAbove = tileDataArray[indexAbove];
    tileData.tileAboveLeft = tileDataArray[indexAboveLeft];
    tileData.tileAboveRight = tileDataArray[indexAboveRight];

    tileData.tileBelow = tileDataArray[indexBelow];
    tileData.tileBelowLeft = tileDataArray[indexBelowLeft];
    tileData.tileBelowRight = tileDataArray[indexBelowRight];

    tileData.tileToLeft = tileDataArray[indexToLeft];

    tileData.tileToRight = tileDataArray[indexToRight];
  }

  return tileDataArray;
};

//
// STEP 2: add outlines to front faces (white) squares
//
export const addFrontFaceOutlineData = tileDataArray => {
  for (let tileData of tileDataArray) {
    const { key, tileAbove, tileBelow, tileToLeft, tileToRight } = tileData;

    if (key === "t1") {
      const addTopLine = !tileAbove || tileAbove.key !== "t1";
      const addBottomLine = !tileBelow || tileBelow.key !== "t1";
      const addLeftLine = !tileToLeft || tileToLeft.key !== "t1";
      const addRightLine = !tileToRight || tileToRight.key !== "t1";

      tileData.options = {
        top: addTopLine,
        right: addRightLine,
        bottom: addBottomLine,
        left: addLeftLine
      };
    }
  }

  return tileDataArray;
};

//
// STEP 3: add tile 8s
//
export const addTileFirstPass = tileDataArray => {
  for (let tileData of tileDataArray) {
    const { key, tileBelow, tileToLeft, isFirstCol } = tileData;

    const isCurrentlyBg = key === "t7";

    const tileToLeftIsWhite = tileToLeft && tileToLeft.key === "t1";
    const tileBelowIsWhite = tileBelow && tileBelow.key === "t1";

    if (isCurrentlyBg) {
      // WHITE TO LEFT
      if (tileToLeftIsWhite) {
        if (tileBelowIsWhite) {
          tileData.key = "t8";
          tileData.func = tileTypes.t8.func;
        }
      }

      // BACKGROUND EDGE CONNECTOR
      if (isFirstCol && tileBelowIsWhite) {
        tileData.key = "t2";
        tileData.func = tileTypes.t2.func;
      }

      if (tileToLeftIsWhite && !tileBelow) {
        tileData.key = "t4";
        tileData.func = tileTypes.t4.func;
      }
    }
  }

  return tileDataArray;
};

//
// STEP 4: rows, cols and corners
//
export const addBlackEdgesAndConnectors = tileDataArray => {
  let tilesChanged = 1;

  // keep adding
  while (tilesChanged > 0) {
    tilesChanged = 0;

    for (let tileData of tileDataArray) {
      const { key, tileBelow, tileToLeft, tileBelowLeft } = tileData;

      const isCurrentlyBg = key === "t7";

      const tileToLeftIs8 = tileToLeft && tileToLeft.key === "t8";
      const tileToLeftIs5 = tileToLeft && tileToLeft.key === "t5";
      const tileToLeftIs2 = tileToLeft && tileToLeft.key === "t2";
      const tileToLeftIs3 = tileToLeft && tileToLeft.key === "t3";
      const tileBelowIs8 = tileBelow && tileBelow.key === "t8";
      const tileBelowIs5 = tileBelow && tileBelow.key === "t5";
      const tileBelowIs4 = tileBelow && tileBelow.key === "t4";
      const tileBelowIs3 = tileBelow && tileBelow.key === "t3";
      const tileBelowIsWhite = tileBelow && tileBelow.key === "t1";
      const tileBelowIsBlack = tileBelow && tileBelow.key === "t6";
      const tileToLeftIsWhite = tileToLeft && tileToLeft.key === "t1";
      const tileBelowLeftIsWhite = tileBelowLeft && tileBelowLeft.key === "t1";
      const tileToLeftIsBlack = tileToLeft && tileToLeft.key === "t6";

      const stripesOnLeft = tileToLeftIs2 || tileToLeftIs5 || tileToLeftIs8;
      const stripesBelow = tileBelowIs5 || tileBelowIs3;
      const blackOnLeft = tileToLeftIs3 || tileToLeftIsBlack;
      const blackBelow = tileBelowIsBlack || tileBelowIs8 || tileBelowIs4;

      if (isCurrentlyBg) {
        // Stripe-to-black corner
        if (stripesOnLeft && blackBelow) {
          tileData.key = "t3";
          tileData.func = tileTypes.t3.func;
          tilesChanged++;
        }
        if (stripesOnLeft && !tileBelowIsWhite && tileBelowLeftIsWhite) {
          tileData.key = "t3";
          tileData.func = tileTypes.t3.func;
          tilesChanged++;
        }

        // Black-to-stripe corner
        if (blackOnLeft && stripesBelow) {
          tileData.key = "t8";
          tileData.func = tileTypes.t8.func;
          tilesChanged++;
        }
        if (blackOnLeft && tileBelowIsWhite) {
          tileData.key = "t8";
          tileData.func = tileTypes.t8.func;
          tilesChanged++;
        }
        if (tileToLeftIsWhite && stripesBelow) {
          tileData.key = "t8";
          tileData.func = tileTypes.t8.func;
          tilesChanged++;
        }

        // Black-to-white corner
        if (tileToLeftIsBlack && tileBelowIsWhite) {
          tileData.key = "t8";
          tileData.func = tileTypes.t8.func;
          tilesChanged++;
        }

        // Black-to-black corner
        if (blackOnLeft && blackBelow) {
          tileData.key = "t6";
          tileData.func = tileTypes.t6.func;
          tilesChanged++;
        }

        // fill col of black
        if (tileToLeftIsWhite && blackBelow) {
          tileData.key = "t6";
          tileData.func = tileTypes.t6.func;
          tilesChanged++;
        }

        // fill row of stripes
        if (tileToLeftIs5 && tileBelowIsWhite) {
          tileData.key = "t5";
          tileData.func = tileTypes.t5.func;
          tilesChanged++;
        }
        if (tileToLeftIs8 && tileBelowIsWhite) {
          tileData.key = "t5";
          tileData.func = tileTypes.t5.func;
          tilesChanged++;
        }
        if (tileToLeftIs2 && tileBelowIsWhite) {
          tileData.key = "t5";
          tileData.func = tileTypes.t5.func;
          tilesChanged++;
        }
        if (stripesOnLeft && stripesBelow) {
          tileData.key = "t5";
          tileData.func = tileTypes.t5.func;
          tilesChanged++;
        }
      }
    }
  }

  return tileDataArray;
};

//
// STEP 4: rows, cols and corners
//
export const addBackgroundEdgesAndConnectors = tileDataArray => {
  let tilesChanged = 1;

  // keep adding
  while (tilesChanged > 0) {
    tilesChanged = 0;

    for (let tileData of tileDataArray) {
      const {
        key,
        tileBelow,
        tileToLeft,
        tileToRight,
        tileBelowLeft
      } = tileData;

      const isCurrentlyBg = key === "t7";
      const tileToLeftIsWhite = tileToLeft && tileToLeft.key === "t1";
      const tileBelowIsWhite = tileBelow && tileBelow.key === "t1";
      const tileLeftIsWhite = tileToLeft && tileToLeft.key === "t1";
      const tileRightIsWhite = tileToRight && tileToRight.key === "t1";
      const tileToLeftIs7 = tileToLeft && tileToLeft.key === "t7";
      const tileToLeftIs4 = tileToLeft && tileToLeft.key === "t4";
      const tileToLeftIsBg = tileToLeftIs7 || tileToLeftIs4;
      const tileBelowLeftIsBg = tileBelowLeft && tileBelowLeft.key === "t7";
      const tileBelowIsBlack = tileBelow && tileBelow.key === "t4";
      //const tileBelowRightIsWhite = tileBelowRight && tileBelowRight.key === "t1";
      const tileBelowLeftIsWhite = tileBelowLeft && tileBelowLeft.key === "t1";

      if (isCurrentlyBg) {
        // Stripe-to-black corner
        if (tileLeftIsWhite && tileBelowLeftIsBg) {
          tileData.key = "t4";
          tileData.func = tileTypes.t4.func;
          tilesChanged++;
        }
        if (tileBelowIsBlack && tileRightIsWhite && tileToLeftIsWhite) {
          tileData.key = "t6";
          tileData.func = tileTypes.t6.func;
          tilesChanged++;
        }

        /*
        if stripes to the left, stripes above, white left and bottom
        */
        if (tileToLeftIsBg && !tileBelowLeftIsWhite && tileBelowIsWhite) {
          tileData.key = "t2";
          tileData.func = tileTypes.t2.func;
          tilesChanged++;
        }

        /*
        if bg below and white on left and white not on bottom left
        */
        if (tileToLeftIsWhite && !tileBelowLeftIsWhite) {
          tileData.key = "t4";
          tileData.func = tileTypes.t4.func;
          tilesChanged++;
        }
      }
    }
  }

  return tileDataArray;
};

export const GetTestTiles = ({ width, height, tilesWide, tileKey = "t2" }) => {
  const tileWidth = width / tilesWide;
  const tilesHigh = tilesWide;
  const tileHeight = height / tilesHigh;

  const tiles = [];
  const stripeSpacing = tileHeight / 10;
  const totalStripes = 10;

  for (let tileRow = 0; tileRow < tilesHigh; tileRow++) {
    for (let tileCol = 0; tileCol < tilesWide; tileCol++) {
      tiles.push(
        tileTypes[tileKey].func({
          width: tileWidth,
          height: tileHeight,
          x: tileCol * tileWidth,
          y: tileRow * tileHeight,
          lineColour: "#000",
          fill: "#fff",
          totalStripes,
          stripeSpacing,
          options: { top: true, left: true }
        })
      );
    }
  }

  return tiles;
};

export const GetTiles = ({
  tileWidth,
  tileHeight,
  tilesWide,
  tilesHigh,
  lineColour,
  lineThickness = 2,
  tightLinesPerHeight,
  midLinesPerHeight,
  looseLinesPerHeight
}) => {
  const hatchLooseSpacing = tileHeight / looseLinesPerHeight;
  const hatchMediumSpacing = tileHeight / midLinesPerHeight;
  const hatchTightSpacing = tileHeight / tightLinesPerHeight;

  const tileData1 = getRandomFrontFaceData({
    tileWidth,
    tileHeight,
    tilesWide,
    tilesHigh
  });

  const tileData2 = addTileNeighborInfo(tileData1);
  const tileData3 = addTileFirstPass(tileData2);
  const tileData4 = addBlackEdgesAndConnectors(tileData3);
  const tileData5 = addBackgroundEdgesAndConnectors(tileData4);
  const tileData6 = addBlackEdgesAndConnectors(tileData5);

  const tileData = addFrontFaceOutlineData(tileData6);

  const tiles = [];

  const totalTightHatchLines = tileHeight / hatchTightSpacing;
  const totalMediumHatchLines = tileHeight / hatchMediumSpacing;
  const totalLooseHatchLines = tileHeight / hatchLooseSpacing;

  const stripeSpacing = tileHeight / 10;
  const totalStripes = 10;
  const totalTightStripes = totalStripes * 2;

  for (let titleInfo of tileData) {
    if (titleInfo) {
      tiles.push(
        titleInfo.func({
          lineColour,
          lineThickness,
          width: tileWidth,
          height: tileHeight,
          x: titleInfo.x,
          y: titleInfo.y,
          fill: "#fff",
          totalTightStripes: totalTightHatchLines,
          totalStripes: totalMediumHatchLines,
          stripeSpacing: hatchMediumSpacing,
          options: titleInfo.options
        })
      );
    }
  }

  return tiles;
};

export const getTileTypes = ({
  tileWidth = 350,
  tileHeight = 350,
  hatchLooseSpacing = 40,
  hatchMediumSpacing = 30,
  hatchTightSpacing = 20,
  lineColour = "#000",
  lineThickness = 2
}) => {
  const tileKeys = Object.keys(tileTypes);
  const tiles = [];

  const totalTightHatchLines = tileHeight / hatchTightSpacing;
  const totalMediumHatchLines = tileHeight / hatchMediumSpacing;
  const totalLooseHatchLines = tileHeight / hatchLooseSpacing;

  let x = 0;
  let y = 0;
  const padding = 50;
  const fontSize = 120;

  for (let key of tileKeys) {
    const titleInfo = tileTypes[key];

    tiles.push(
      titleInfo.func({
        lineColour,
        lineThickness,
        width: tileWidth,
        height: tileHeight,
        x: x,
        y: y,
        fill: "#fff",
        totalTightStripes: totalTightHatchLines,
        totalStripes: totalMediumHatchLines,
        stripeSpacing: hatchMediumSpacing,
        options: { top: true, bottom: true, left: true, right: true }
      })
    );

    tiles.push(
      <rect
        key={"rect" + x + "" + y}
        x={x}
        y={y}
        width={tileWidth}
        height={tileHeight}
        fill={"none"}
        stroke={"#000"}
        strokeWidth={4}
      />
    );

    tiles.push(
      <text
        key={"text" + x + "" + y}
        x={x + tileWidth + padding}
        y={y + (fontSize + tileHeight) / 2}
        style={{ font: `bold ${fontSize}px sans-serif` }}
      >
        = {titleInfo.name}
      </text>
    );

    y += tileHeight + padding;
  }

  return tiles;
};

const tileTypes = {
  t1: {
    name: "1",
    allowedOnRight: ["t1", "t8"],
    allowedBelow: ["t1", "t3", "t5", "t8"],
    func: getTileOne
  },
  t2: {
    name: "2",
    allowedOnRight: [1, 3],
    allowedBelow: [1, 3],
    func: getTileTwo
  },
  t3: {
    name: "3",
    allowedOnRight: ["t8"],
    allowedBelow: ["t8"],
    func: getTileThree
  },
  t4: {
    name: "4",
    allowedOnRight: [2, 7],
    allowedBelow: [2, 7],
    func: getTileFour
  },
  t5: {
    name: "5",
    allowedOnRight: ["t1", "t3", "t5"],
    allowedBelow: ["t1", "t5"],
    func: getTileFive
  },
  t6: {
    name: "6",
    allowedOnRight: [3, 4, 7, 8],
    allowedBelow: [7],
    func: getTileSix
  },
  t7: {
    name: "7",
    allowedOnRight: [1, 2, 7],
    allowedBelow: [2, 7],
    func: getTileSeven
  },
  t8: {
    name: "8",
    allowedOnRight: ["t1", "t3", "t5"],
    allowedBelow: ["t1"],
    func: getTileEight
  }
};

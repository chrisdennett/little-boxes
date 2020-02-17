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

// const allKeys = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"];
const allKeys = ["t1", "t5", "t8"];

export const getRandomAllowedTileData = ({
  x,
  y,
  size,
  tileAbove,
  tileToLeft
}) => {
  const tilesAllowedOnRight = tileToLeft ? tileToLeft.allowedOnRight : [];
  const tilesAllowedBelow = tileAbove ? tileAbove.allowedBelow : [];

  const keys = getKeysInBothArrays(
    tilesAllowedOnRight,
    tilesAllowedBelow,
    allKeys
  );
  const key = getRandomKey(keys);
  const tInfo = tileTypes[key];
  const { allowedOnRight, allowedBelow, func } = tInfo;

  const options = getTileOptions({ key, tileToLeft, tileAbove });

  const t = {
    x,
    y,
    key,
    size,
    allowedOnRight,
    allowedBelow,
    func,
    options
  };

  return t;
};

const showTopLineWhen = ({ options, key, tileAbove, matches }) => {
  for (let m of matches) {
    if (tileAbove && tileAbove.key === m) {
      options.top = true;
    }
  }
};

const showLeftLineWhen = ({ options, key, tileToLeft, matches }) => {
  for (let m of matches) {
    if (tileToLeft && tileToLeft.key === m) {
      options.left = true;
    }
  }
};

const getTileOptions = ({ key, tileToLeft, tileAbove }) => {
  let options = {};

  if (key === "t1") {
    showTopLineWhen({ options, key: "t1", tileAbove, matches: ["t5", "t8"] });
    showLeftLineWhen({ options, key: "t1", tileToLeft, matches: ["t5", "t8"] });
  }

  if (key === "t5") {
    showTopLineWhen({ options, key: "t5", tileAbove, matches: ["t1"] });
    // showLeftLineWhen({ options, key: "t1", tileToLeft, matches: ["t5", "t8"] });
  }

  return options;
};

const getKeysInBothArrays = (array1, array2, defaultArr) => {
  // if both arrays are null
  if (!array1 && !array2) return defaultArr;

  // if both arrays are empty
  if (array1.length < 1 && array2.length < 1) return defaultArr;

  if (array1.length < 1) return array2;
  if (array2.length < 1) return array1;

  const returnArray = array1.filter(key => array2.indexOf(key) !== -1);

  return returnArray.length < 1 ? defaultArr : returnArray;
};

const getRandomKey = array => {
  const randIndex = Math.floor(Math.random() * array.length);
  return array[randIndex];
};

export const GetTiles = ({ width, height, tilesPerWidth }) => {
  const tileSize = width / tilesPerWidth;
  const tileData = GenerateTileData({ width, height, tileSize, tilesPerWidth });

  // console.log("tileData: ", tileData);

  const tiles = [];
  const stripeSpacing = tileSize / 10;
  const totalStripes = 10;

  for (let titleInfo of tileData) {
    if (titleInfo) {
      tiles.push(
        titleInfo.func({
          size: titleInfo.size,
          x: titleInfo.x,
          y: titleInfo.y,
          lineColour: "#000",
          totalStripes,
          stripeSpacing,
          options: titleInfo.options
        })
      );
    } else {
      tiles.push(
        tileTypes.t9.func({
          size: tileSize,
          x: titleInfo.x,
          y: titleInfo.y,
          lineColour: "#000",
          totalStripes,
          stripeSpacing
        })
      );
    }
  }

  return tiles;
};

export const GenerateTileData = ({
  width,
  height,
  tilesPerWidth,
  tileSize
}) => {
  const tilesPerHeight = Math.floor(height / tileSize);
  const tileDataArray = [];

  for (let y = 0; y < tilesPerHeight; y++) {
    for (let x = 0; x < tilesPerWidth; x++) {
      const index = x + y * tilesPerWidth;
      const indexAbove = index - tilesPerWidth;
      const indexToLeft = x === 0 ? -1 : index - 1;
      const tileAbove = indexAbove < 0 ? null : tileDataArray[indexAbove];
      const tileToLeft = indexToLeft < 0 ? null : tileDataArray[indexToLeft];

      const tileData = getRandomAllowedTileData({
        x: x * tileSize,
        y: y * tileSize,
        size: tileSize,
        tileAbove,
        tileToLeft
      });

      tileDataArray.push(tileData);
    }
  }

  return tileDataArray;
};

const tileTypes = {
  t1: {
    allowedOnRight: ["t1", "t8"],
    allowedBelow: ["t1", "t5", "t8"],
    func: getTileOne
  },
  t2: {
    allowedOnRight: [1, 3],
    allowedBelow: [1, 3],
    func: getTileTwo
  },
  t3: {
    allowedOnRight: [1, 8],
    allowedBelow: [4, 6, 7],
    func: getTileThree
  },
  t4: {
    allowedOnRight: [2, 7],
    allowedBelow: [2, 7],
    func: getTileFour
  },
  t5: {
    allowedOnRight: ["t1", "t5"],
    allowedBelow: ["t1", "t5"],
    func: getTileFive
  },
  t6: {
    allowedOnRight: [3, 4, 7, 8],
    allowedBelow: [7],
    func: getTileSix
  },
  t7: {
    allowedOnRight: [1, 2, 7],
    allowedBelow: [2, 7],
    func: getTileSeven
  },
  t8: {
    allowedOnRight: ["t1", "t5"],
    allowedBelow: ["t1"],
    func: getTileEight
  },
  t9: {
    allowedOnRight: ["t1"],
    allowedBelow: ["t1"],
    func: getErrorTile
  }
};

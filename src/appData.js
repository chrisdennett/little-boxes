const defaultAppData = {
  title: "Tiles with Rules",
  infoUrl: "https://artfly.io/little-boxes/",
  settings: {
    showKey: {
      label: "Show Key",
      type: "boolean",
      defaultValue: true,
    },

    tilesWide: {
      label: "Tiles Wide",
      type: "range",
      min: 1,
      max: 50,
      step: 1,
      defaultValue: 10,
    },

    tilesHigh: {
      label: "Tiles High",
      type: "range",
      min: 1,
      max: 50,
      step: 1,
      defaultValue: 10,
    },

    lineColour: {
      label: "Line Colour",
      type: "colour",
      defaultValue: "#4db39e",
    },

    lineThickness: {
      label: "Line Thickness",
      type: "range",
      min: 1,
      max: 10,
      defaultValue: 2.5,
    },

    sectionHeader: {
      label: "Tile Design",
      type: "sectionHeader",
    },

    stripesPerBox1: {
      label: "Tile Diagonal stripes",
      type: "range",
      min: 4,
      max: 42,
      step: 2,
      defaultValue: 4,
    },

    stripesPerBox2: {
      label: "Tile Horizontal stripes",
      type: "range",
      min: 3,
      max: 42,
      step: 1,
      defaultValue: 14,
    },

    stripesPerBox3: {
      label: "Tile Diagonal 2 Stripes",
      type: "range",
      min: 4,
      max: 42,
      step: 2,
      defaultValue: 36,
    },
  },
};

export const getAppData = (srcData = defaultAppData) => {
  // add easy access values from default data
  const appData = { ...defaultAppData };
  const settingsKeys = Object.keys(defaultAppData.settings);

  for (let key of settingsKeys) {
    if (defaultAppData.settings[key].type === "sectionHeader") continue;

    appData[key] = defaultAppData.settings[key].defaultValue;
  }

  return appData;
};

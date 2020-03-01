const defaultAppData = {
  title: "Tiles with Rules",
  infoUrl: "https://artfly.io/little-boxes/",
  settings: {
    showKey: {
      label: "Show Key",
      type: "boolean",
      defaultValue: true
    },

    stripesPerBox1: {
      label: "BG Diagonal sections",
      type: "range",
      min: 4,
      max: 42,
      step: 2,
      defaultValue: 4
    },

    stripesPerBox2: {
      label: "Horizontal sections",
      type: "range",
      min: 3,
      max: 42,
      step: 1,
      defaultValue: 14
    },

    stripesPerBox3: {
      label: "Side Diagonal sections",
      type: "range",
      min: 4,
      max: 42,
      step: 2,
      defaultValue: 36
    },

    showOuterBox: {
      label: "Outer Box",
      type: "boolean",
      defaultValue: true
    },

    lineColour: {
      label: "Line Colour",
      type: "colour",
      defaultValue: "#4db39e"
    },

    lineThickness: {
      label: "Line Thickness",
      type: "range",
      min: 1,
      max: 10,
      defaultValue: 2.5
    },

    tilesWide: {
      label: "Tiles Wide",
      type: "range",
      min: 1,
      max: 50,
      step: 1,
      defaultValue: 10
    },

    tilesHigh: {
      label: "Tiles High",
      type: "range",
      min: 1,
      max: 50,
      step: 1,
      defaultValue: 10
    }
  }
};

export const getAppData = (srcData = defaultAppData) => {
  // add easy access values from default data
  const appData = { ...defaultAppData };
  const settingsKeys = Object.keys(defaultAppData.settings);

  for (let key of settingsKeys) {
    appData[key] = defaultAppData.settings[key].defaultValue;
  }

  return appData;
};

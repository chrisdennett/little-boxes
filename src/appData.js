const defaultAppData = {
  title: "Tiles with Rules",
  infoUrl: "https://artfly.io/binary-hands",
  settings: {
    showOuterBox: {
      label: "Outer Box",
      type: "boolean",
      defaultValue: true
    },

    lineColour: {
      label: "Line Colour",
      type: "colour",
      defaultValue: "#FF0000"
    },

    lineThickness: {
      label: "Line Thickness",
      type: "range",
      min: 1,
      max: 10,
      defaultValue: 2.5
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

  console.log("appData: ", appData);

  return appData;
};

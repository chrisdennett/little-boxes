export const defaultAppData = {
  title: "Tiles with Rules",
  infoUrl: "https://artfly.io/binary-hands",
  settings: {
    // fringeFraction: 0.03,

    showOuterBox: {
      label: "Outer Box",
      type: "boolean",
      value: true
    },

    lineColour: {
      label: "Line Colour",
      type: "colour",
      value: "#FF0000"
    },

    lineThickness: {
      label: "Line Thickness",
      type: "range",
      min: 1,
      max: 10,
      value: 2.5
    }
  }
};

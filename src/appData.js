export const defaultAppData = {
  title: "Tiles with Rules",
  infoUrl: "https://artfly.io/binary-hands",
  settings: {
    fringeFraction: 0.03,
    showBlackHorizontal: {
      label: "Black Horizontal",
      type: "boolean",
      value: false
    },

    lineThickness: {
      label: "Line Thickness",
      type: "range",
      min: 1,
      max: 10,
      value: 1.3
    }
  }
};

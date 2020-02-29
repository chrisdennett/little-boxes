import React from "react";
import styled from "styled-components";
import { saveAs } from "file-saver";
import "@material/button/dist/mdc.button.css";
import { Button } from "@rmwc/button";
// comps
import SliderControl from "./sliderControl/SliderControl";
import { SwitchControl } from "./switchControl/SwitchControl";
import ColourPicker from "../components/colourPicker/ColourPicker";

const Controls = ({ appData, onUpdate, wrap = false }) => {
  const { settings } = appData;

  const updateSettings = (key, newValue) => {
    onUpdate({ ...appData, [key]: newValue });
  };

  const settingsKeys = Object.keys(settings);

  const onSaveSvgClick = ({ name = "tiles-art", svgClass = "mainSVG" }) => {
    let full_svg = document.getElementsByClassName(svgClass)[0].outerHTML;
    full_svg = full_svg.split(">").join(`>`);

    var blob = new Blob([full_svg], { type: "image/svg+xml" });
    saveAs(blob, `artfly-${name}.svg`);
  };

  return (
    <Container>
      <ControlsUI wrap={wrap}>
        <ButtHolder>
          <Button label="Save SVG" raised onClick={onSaveSvgClick} />
        </ButtHolder>

        {appData.showKey && (
          <ButtHolder>
            <Button
              label="Save KEY SVG"
              raised
              onClick={() =>
                onSaveSvgClick({ name: "tile-art-key", svgClass: "keySVG" })
              }
            />
          </ButtHolder>
        )}

        {settingsKeys.map(key => {
          const currSetting = settings[key];
          const currValue = appData[key];

          if (currSetting.type === "colour") {
            return (
              <ColourPicker
                key={key}
                label={currSetting.label}
                value={currValue}
                onChange={value => updateSettings(key, value)}
              />
            );
          }

          if (currSetting.type === "boolean") {
            return (
              <SwitchControl
                key={key}
                label={currSetting.label}
                value={currValue}
                onChange={value => updateSettings(key, value)}
              />
            );
          }

          if (currSetting.type === "range") {
            return (
              <SliderControl
                key={key}
                labelStyle={{ minWidth: 150 }}
                label={currSetting.label}
                displayValue={true}
                min={currSetting.min}
                max={currSetting.max}
                value={currValue}
                onChange={value => updateSettings(key, value)}
              />
            );
          }

          return null;
        })}
      </ControlsUI>
    </Container>
  );
};

export default Controls;

// STYLES
const Container = styled.div`
  padding-top: 5px;
  background: black;
  color: white;
`;

const ControlsUI = styled.div`
  margin: 15px;
  display: ${props => (props.wrap ? "flex" : "")};
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const ButtHolder = styled.div`
  margin: 5px;
`;

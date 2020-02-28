import React from "react";
import styled from "styled-components";
import "./colourPicker_styles.css";

/*
 *   SOURCES
 *   color picker: https://codepen.io/elainehuang/pen/yPWxRX?editors=1010
 * */

const ColourPicker = ({ value = "#FF0000", onChange, label = value }) => {
  const onInputChange = e => {
    const newColour = e.target.value;
    if (onChange) {
      onChange(newColour);
    }
  };

  return (
    <Container>
      <StyledLabel>
        <span className="colourPicker--circle" style={{ background: value }} />
        <StyledInput
          type="color"
          value={value}
          onChange={onInputChange}
          className="colourPicker--input--hidden"
        />
      </StyledLabel>

      {label && <LabelText>{label}</LabelText>}
    </Container>
  );
};

export default ColourPicker;

const Container = styled.div`
  margin: 0 15px 5px 0;
  display: flex;
  align-items: center;
`;

const StyledLabel = styled.label`
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const LabelText = styled.p`
  margin-left: 10px;
`;

const StyledInput = styled.input`
  position: absolute;
  left: 0;
  opacity: 0;
`;

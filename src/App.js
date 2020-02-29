import React, { useState } from "react";
import * as Space from "react-spaces";
// comps
//
import TopBar from "./top-bar/TopBar";
import Display from "./display/Display";
import Controls from "./controls/Controls";
import { getAppData } from "./appData";
import useWindowDimensions from "./hooks/usWindowDimensions";

export default function App() {
  const [appData, setAppData] = useState(getAppData());
  const [optionsVisible, setOptionsVisible] = useState(true);
  const { width } = useWindowDimensions();

  const showMenuOnLeft = width > 700;

  return (
    <Space.ViewPort>
      {/* TOP BAR - uses size info to hide things */}
      <Space.Top size={60}>
        <Space.Info>
          {sizeInfo => (
            <TopBar
              title={appData.title}
              infoUrl={appData.infoUrl}
              optionsVisible={optionsVisible}
              setOptionsVisible={setOptionsVisible}
              width={sizeInfo.width}
            />
          )}
        </Space.Info>
      </Space.Top>

      {/* HOLDER for menu and main panel */}
      <Space.Fill>
        {/* MENU */}
        {optionsVisible && showMenuOnLeft && (
          <Space.LeftResizable size={200} scrollable={true}>
            <Controls onUpdate={setAppData} appData={appData} wrap={false} />
          </Space.LeftResizable>
        )}

        {optionsVisible && !showMenuOnLeft && (
          <Space.BottomResizable size={"40%"} scrollable={true}>
            <Controls onUpdate={setAppData} appData={appData} wrap={true} />
          </Space.BottomResizable>
        )}

        {/* MAIN CONTENT */}
        <Space.Fill
          trackSize={true}
          style={{
            padding: 40,
            background: "#fff",
            borderRadius: 10,
            border: "5px solid"
          }}
        >
          <Space.Info>
            {sizeInfo => <Display sizeInfo={sizeInfo} appData={appData} />}
          </Space.Info>
        </Space.Fill>
      </Space.Fill>
    </Space.ViewPort>
  );
}

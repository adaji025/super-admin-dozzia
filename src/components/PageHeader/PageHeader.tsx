import React from "react";
import useTheme from "../../hooks/useTheme";
import "./page-header.scss";

const PageHeader = ({ title, desc }: { title: string; desc: string }) => {
  const { dark } = useTheme();

  return (
    <div
      className="page-info"
      style={{
        borderBottom: `1px solid ${dark ? "#2c2e33" : "#e9ecef"}`,
        color: dark ? "white" : "#4e4e4e",
      }}
    >
      <div
        className="page-title"
        style={{
          color: dark ? "white" : "black",
        }}
      >
        {title}
      </div>
      <div
        className="page-desc"
        style={{
          color: dark ? "#a6a7ab" : "#868e96",
        }}
      >
        {desc}
      </div>
    </div>
  );
};

export default PageHeader;

import React, { Component } from "react";

const labelStyle = {
  position: "relative",
  fontFamily: "Roboto",
  fontSize: 14,
  letterSpacing: 0.6,
  padding: "5px 0px",
  display: "inline-block"
};

const underlineStyle = {
  position: "absolute",
  bottom: -1,
  borderBottom: "2px solid #db251c",
  width: "100%"
};

const dividerStyle = {
  borderBottom: "1px solid rgba(5, 5, 5, 0.12)"
};

class DividerWithLabel extends Component {
  render() {
    const { labelProps, label } = this.props;
    return (
      <div style={dividerStyle}>
        <div style={{ ...labelStyle, ...labelProps.style }}>
          <span>{label}</span>
          <div style={underlineStyle} />
        </div>
      </div>
    );
  }
}
export default DividerWithLabel;

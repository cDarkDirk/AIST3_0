import React from "react";
import "./style.css";

class Header extends React.Component {
  render() {
    const {
      owner
    } = this.props;
    return (
      <header className={"header"} >
       <text> Привет, {owner} </text>
      </header>


    )
  }
}

export default Header;

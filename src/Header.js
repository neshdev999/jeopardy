import React, { Component } from 'react';
import "./Header.css";
import dstar from "./images/jeopardy_banner.jpg";

/* Header */

class Header extends Component {

    render() {
        return (
            <div className="titleHeaderContainer">
                <div className="titleHeader">
                    <img src={dstar} alt="logo of jeopardy"/>
                </div>
            </div>
        );
    }
}

export default Header;
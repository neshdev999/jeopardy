import React, { Component } from 'react';
import "./Footer.css";

/* Footer */
/* @desc GetCopyRightCurrentYear => generates dynamic copyright year */
function GetCopyRightCurrentYear() {
    var today = new Date();
    var year = today.getFullYear();
    return year;
}

class Footer extends Component {

    render() {
        return (
            <div className="FooterContainer">
                <div className="Footer">
                    <span>nesh &copy; <GetCopyRightCurrentYear /></span>
                </div>
            </div>
        );
    }

}

export default Footer;
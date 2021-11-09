import React from "react";
import "./style.css";

function Myinfobar({ handlePageChange }) {
  return (
    <ul className="nav d-md-block">
      <li className="nav-item">
        <a
          href="#myinfo"
          onClick={() => handlePageChange('Myinfo')}
          // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className='nav-link subnav'
        >
          About
        </a>
      </li>
      <li className="nav-item ">
        <a
          href="#Order"
          onClick={() => handlePageChange('Order')}
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className= 'nav-link subnav'
        >
          Order
        </a>
      </li>
    </ul>
  );
}

export default Myinfobar;
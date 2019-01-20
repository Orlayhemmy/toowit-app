import React, { Fragment } from 'react';
import './spinner.scss';

const Spinner = (props) => (
  <div className="spinner-container">
    <div className="spinner"/>
    <span>...{props.displayText}</span>
  </div>
)

export default Spinner;
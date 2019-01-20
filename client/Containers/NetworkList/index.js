import React, { Fragment } from 'react';
import './networklist.scss';

const NetworkList = () => (
  <Fragment>
    <div className="ntwk-img-body">
      <div className="ntwk-img" />
      <img src="../../assets/images/mtn.png" className="ntwk-img" />
      <img src="../../assets/images/glo.jpg" className="ntwk-img" />
      <img src="../../assets/images/etisalat.gif" className="ntwk-img" />
      <img src="../../assets/images/airtel.jpg" className="ntwk-img" />
    </div>
  </Fragment>
);

export default NetworkList;

import React, { useState, useEffect } from "react";
import axios from "axios";


const FetchRawData = ({url}) => {


  return (
    <div>
      <h2>Toilet Paper Status</h2>
      <h2>{url}</h2>
    </div>
  );
};

export default FetchRawData;
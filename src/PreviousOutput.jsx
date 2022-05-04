import React from "react";

const PreviousOutput = ({ previousValues }) => {
  return previousValues?.map((value, index) => (
    <span key={index}>{value}</span>
  ));
};

export default PreviousOutput;

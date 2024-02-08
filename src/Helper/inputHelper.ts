import React from "react";

//Function: It takes an event representing a change in an input element
//and updates a data object with the new value entered into the input.
const inputHelper = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  data: any
) => {
  //operator (...). It's a way to create a shallow copy of an object in JavaScript.
  const tempData: any = { ...data };
  tempData[e.target.name] = e.target.value;
  return tempData;
};

export default inputHelper;

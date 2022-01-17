import React, { useRef } from "react";
import InputMask from "react-input-mask";

const FaleConosco = ({ name, inputType, divStyle, ...rest }) => {
  const inputRef = useRef(null);
  const defaultStyles =
    "w-full border-theme-middle-blue h-full rounded-3xl border-2 p-8 placeholder-theme-middle-blue hover:border-theme-green focus:border-theme-green focus:text-theme-green text-theme-middle-blue focus:outline-none active:border-theme-green focus:placeholder-theme-green uppercase";

  return (
    <div className={divStyle}>
      {inputType === "input" && (
        <input ref={inputRef} {...rest} className={defaultStyles} />
      )}
      {inputType === "mask" && (
        <InputMask ref={inputRef} {...rest} className={defaultStyles} />
      )}
      {inputType === "textarea" && (
        <textarea ref={inputRef} {...rest} className={defaultStyles} />
      )}
    </div>
  );
};

export default FaleConosco;

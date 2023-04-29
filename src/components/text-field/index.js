import React from "react";

import "./text-field.css";

const TextField = ({
  label,
  searchIcon,
  icon,
  placeholder,
  name,
  handleClick,
  handleChange,
  type,
  className,
  errorMessage,
  error,
  register,
  readyOnly,
  disabled,
  handleIconClick,
  value,
  styleField,
  inputDivStyle,
  defaultValue,
  id,
  onFocusText,
  sign,
  icon_class,
  htmlfor,
  ref,
  autoComplete,
  pattern,
  ...restOfProps
}) => {
  const handleKeyDown = (e) => {
    const symbolArr = ["e"];
    if (symbolArr.includes(e.key)) {
      e.preventDefault();
    } else {
      return false;
    }
  };
  return (
    <div className={`${className}`} style={styleField}>
      {label && <label htmlFor={htmlfor}>{label}</label>}

      <div className={"ClassName"} onClick={handleClick && handleClick}>
        <input
          type={type || "text"}
          className={inputDivStyle}
          placeholder={placeholder}
          ref={ref}
          id={id}
          name={name || ""}
          value={value && value}
          onChange={handleChange && handleChange}
          defaultValue={defaultValue}
          autoComplete="new-password"
          {...(register && register(name))}
          onKeyPress={type === "number" ? handleKeyDown : undefined}
          onBlur={onFocusText}
          disabled={disabled || false}
          readOnly={readyOnly || false}
        />
        {icon && (
          <img
            src={icon}
            alt=""
            className={"icon"}
            onClick={handleIconClick && handleIconClick}
          />
        )}
      </div>

      {errorMessage && <span className={"error_message"}>{errorMessage}</span>}
    </div>
  );
};

export default TextField;

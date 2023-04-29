import React from "react";
import Loading from "components/loading";
import "./button.css";

const Button = ({
  className,
  title,
  icon,
  handleClick,
  type,
  isLoading,
  disabled,
}) => {
  return (
    <>
      <button
        className={`classname ${className}`}
        onClick={handleClick && handleClick}
        type={type}
        disabled={disabled || isLoading || false}
        style={{
          pointerEvents: isLoading || disabled ? "none" : "auto",
        }}
      >
        {isLoading ? (
          <Loading loaderClass={style.loaderClass} />
        ) : (
          <>
            {icon && <img className={style.image} src={icon} alt="" />}
            {title}
          </>
        )}
      </button>
    </>
  );
};

export default Button;

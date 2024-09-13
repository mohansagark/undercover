import "./styles.scss";

const Button = (props) => {
  const { title, clickMethod, disabled, type } = props;

  const buttonClass = () => {
    let tempClass = type === "primary" ? "primaryButton" : "secondaryButton";
    if (disabled) {
      tempClass += " disabled";
    }
    return tempClass;
  };

  return (
    <div className={buttonClass()} onClick={clickMethod}>
      <span>{title}</span>
    </div>
  );
};

Button.defaultProps = {
  title: "Button",
  clickMethod: () => {},
  disabled: false,
  type: "primary",
};

export default Button;

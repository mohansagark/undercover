import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import "./styles.scss";

function CheckBox(props) {
  const { title, onCheck, checked } = props;

  return (
    <div className="checkBoxContainer">
      <span>{title}</span>
      <div className="check-box" onClick={onCheck}>
        {checked ? <IoMdCheckboxOutline /> : <MdOutlineCheckBoxOutlineBlank />}
      </div>
    </div>
  );
}

CheckBox.defaultProps = {
  title: "Checkbox",
  onCheck: () => {},
  checked: false,
};

export default CheckBox;

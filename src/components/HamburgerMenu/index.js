import { IoMdPerson } from "react-icons/io";
import { MdAlternateEmail, MdLiveHelp, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

const HamburgerMenu = ({ onLogout }) => {
  let navigate = useNavigate();
  const animation = () => {
    var icon1 = document.getElementById("a");
    var icon2 = document.getElementById("b");
    var icon3 = document.getElementById("c");
    var nav = document.getElementById("nav");
    var blue = document.getElementById("blue");

    icon1.classList.toggle("a");
    icon2.classList.toggle("c");
    icon3.classList.toggle("b");
    nav.classList.toggle("show");
    blue.classList.toggle("slide");
  };

  return (
    <div className="hamburger-menu">
      <header>
        <div className="hamburger-icon" id="icon" onClick={animation}>
          <div className="icon-1" id="a"></div>
          <div className="icon-2" id="b"></div>
          <div className="icon-3" id="c"></div>
          <div className="clear"></div>
        </div>

        <nav id="nav">
          <ul>
            <li
              onClick={() => {
                navigate("/myProfile");
              }}
            >
              <IoMdPerson />
              <p>Profile</p>
            </li>
            <li
              onClick={() => {
                navigate("/contact-us");
              }}
            >
              <MdAlternateEmail />
              <p>Contact</p>
            </li>
            <li
              onClick={() => {
                navigate("/help");
              }}
            >
              <MdLiveHelp />
              <p>Help</p>
            </li>
            <li
              onClick={() => {
                onLogout();
              }}
            >
              <MdLogout />
              <p>Logout</p>
            </li>
          </ul>
          <li className="copyrights">
            Copyrights reserved - Authentication Template © 2022
          </li>
        </nav>

        <div className="dark-blue" id="blue"></div>
      </header>
    </div>
  );
};

export default HamburgerMenu;

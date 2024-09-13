import "./style.scss";
import { IoMdArrowBack, IoMdPerson } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const BackNavigation = ({ title, navigateTo }) => {
  let navigate = useNavigate();

  return (
    <Row className="back-navigation">
      <Col className="back-icon">
        <IoMdArrowBack size={25} onClick={() => navigate(navigateTo)} />
      </Col>
      <Col>
        <h3 className="text-center">{title}</h3>
      </Col>
      <Col className="profile-icon">
        <IoMdPerson
          size={30}
          onClick={() => {
            navigate("/myProfile");
          }}
        />
      </Col>
    </Row>
  );
};

BackNavigation.defaultProps = {
  title: "Auth Template",
  navigateTo: "/",
};

export default BackNavigation;

import { useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { connect } from "react-redux";
import { resetUserInfo } from "./store/actions/login.actions";
import { ConditionalModal } from "./components/Modal";
import menuItems from "./constants/menuItems.json";
import "./App.scss";
import HamburgerMenu from "./components/HamburgerMenu";

function App({ onLogout }) {
  let navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const logout = () => {
    onLogout();
  };

  return (
    <Container fluid className="auth-template-container">
      <Row className="nav">
        <Col xs={8} sm={8} md={8} className="links">
          <span className="project-title">Auth Template</span>
        </Col>
        <Col xs={2} sm={2} md={2} className="desktop-nav" />
        <Col
          xs={1}
          sm={1}
          md={1}
          className="profile-icon desktop-nav"
          onClick={() => {
            navigate("/myProfile");
          }}
        >
          <IoMdPerson id="dropdown-basic" size={30} />
        </Col>

        <Col
          xs={1}
          sm={1}
          md={1}
          className="logout-icon desktop-nav"
          onClick={() => {
            setShowLogoutModal(true);
          }}
        >
          <MdLogout size={30} />
        </Col>
        <Col xs={2} sm={2} md={2} className="menu-nav" />
      </Row>
      <Row className="menu-tiles-container">
        {menuItems.map((item, index) => {
          return (
            <Col key={String(index)} lg={3} md={4} sm={4} xs={12}>
              <Card
                key={item.id}
                onClick={() => {
                  item.active && navigate(item.navigation);
                }}
              >
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <ConditionalModal
        show={showLogoutModal}
        handleClose={() => setShowLogoutModal(false)}
        headerBody={"Are you sure you want to logout?"}
        headerTitle={"Confirm Logout"}
        yesText={"Okay"}
        noText={"Cancel"}
        handleYes={() => {
          logout();
        }}
      />
      <div className="menu-nav">
        <HamburgerMenu
          onLogout={() => {
            setShowLogoutModal(true);
          }}
        />
      </div>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => {
    dispatch(resetUserInfo());
  },
});

export default connect(null, mapDispatchToProps)(App);

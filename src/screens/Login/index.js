import "./styles.scss";
import { connect } from "react-redux";
import { Col, Container, Row, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";
import {
  gitHubLogin,
  googleLogin,
  metaLogin,
  userEmailLogin,
} from "../../store/actions/login.actions";
import { useNavigate } from "react-router-dom";
import { TbBrandMeta } from "react-icons/tb";
import { VscGithub } from "react-icons/vsc";
import { BiShow, BiHide } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import LoginTheme from "../../assets/login-theme1.png";
import { toast } from "react-toastify";
import { validateEmail } from "../../helpers/general";

const Login = (props) => {
  let navigate = useNavigate();
  const { onUserEmailLogin, onGoogleLogin, onGitHubLogin, onMetaLogin } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    const successMethod = () => navigate("/");
    const errorMethod = (error) => toast.error(error);
    if (validateEmail(email) && password >= 8)
      onUserEmailLogin(email, password, successMethod, errorMethod);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSocialMediaLogin = (media) => {
    const successMethod = () => {};
    const errorMethod = (error) => toast.error(error);
    switch (media) {
      case "google":
        onGoogleLogin(successMethod, errorMethod);
        break;
      case "github":
        onGitHubLogin(successMethod, errorMethod);
        break;
      case "meta":
        onMetaLogin(successMethod, errorMethod);
        break;

      default:
        break;
    }
  };

  return (
    <Container fluid className="loginContainer">
      <Row>
        <Col lg={10} className="login-form-bg">
          <Row style={{ height: "100%" }} className="align-items-center">
            <Col xs md={6}>
              <img
                width={"100%"}
                src={LoginTheme}
                className="theme-image"
                alt="login"
              />
            </Col>
            <Col xs md={6}>
              <h1 className="text-center">React Auth Template</h1>
              <Form>
                <Form.Label>Username</Form.Label>
                <InputGroup className="mb-3 password-field">
                  <Form.Control
                    type="username"
                    placeholder="Type your username"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </InputGroup>
                <Form.Label>Password</Form.Label>
                <InputGroup className="mb-3 password-field">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Type your password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <InputGroup.Text
                    onClick={() => {
                      togglePasswordVisibility();
                    }}
                    className="eye-icon"
                  >
                    {showPassword ? <BiShow /> : <BiHide />}
                  </InputGroup.Text>
                </InputGroup>
              </Form>
              <Row className="sub-options">
                <Col>
                  <Form.Text
                    className="verify-email"
                    onClick={() => navigate("/verify-email")}
                  >
                    Verify email?
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Text
                    className="forgot-password"
                    onClick={() => navigate("/forgotPassword")}
                  >
                    Forgot password?
                  </Form.Text>
                </Col>
              </Row>
              <div className="button-container">
                <button
                  type="submit"
                  className={
                    email && password.length >= 8
                      ? "login-btn btn"
                      : "login-btn btn disabled"
                  }
                  onClick={onLogin}
                >
                  Login
                </button>
              </div>
              <Row>
                <Col lg={12}>
                  <h6 className="signup-text">Or Signup using</h6>
                </Col>
                <Col lg={2} />

                <Col lg={8} className="social-media-links">
                  <button
                    type="submit"
                    className="social-media-btn"
                    onClick={() => onSocialMediaLogin("google")}
                  >
                    <FcGoogle />
                  </button>
                  <button
                    type="submit"
                    className="social-media-btn"
                    onClick={() => onSocialMediaLogin("github")}
                  >
                    <VscGithub />
                  </button>
                  <button
                    type="submit"
                    className="social-media-btn blue-btn"
                    onClick={() => onSocialMediaLogin("meta")}
                  >
                    <TbBrandMeta />
                  </button>
                </Col>
                <Col lg={2} />
              </Row>
              <Row>
                <Col lg={12}>
                  <h6 className="signup-text">
                    Or Don't have an account?{" "}
                    <label onClick={() => navigate("/signup")}>Sign up</label>
                  </h6>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onUserEmailLogin: (email, password, successMethod, errorMethod) => {
    dispatch(userEmailLogin(email, password, successMethod, errorMethod));
  },
  onGoogleLogin: (successMethod, errorMethod) => {
    dispatch(googleLogin(successMethod, errorMethod));
  },
  onGitHubLogin: (successMethod, errorMethod) => {
    dispatch(gitHubLogin(successMethod, errorMethod));
  },
  onMetaLogin: (successMethod, errorMethod) => {
    dispatch(metaLogin(successMethod, errorMethod));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

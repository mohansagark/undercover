import "./styles.scss";
import { connect } from "react-redux";
import { Col, Container, Row, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SignUpTheme from "../../assets/sign-up-theme-2.png";
import { useState } from "react";
import { signUpWithEmail } from "../../store/actions/login.actions";
import { toast } from "react-toastify";
import { validateEmail } from "../../helpers/general";
import { BiShow, BiHide } from "react-icons/bi";

const SignUpComponent = ({ onSignUp }) => {
  let navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const signUp = (e) => {
    e.preventDefault();

    const data = {
      username: email,
      firstName,
      lastName,
      password,
      displayName: firstName + " " + lastName,
      email,
    };
    const successMethod = () => {
      toast.success(
        "A verification mail has been sent to your registered email. Please check and verify your email."
      );
    };
    const errorMethod = (e) => {
      toast.error(e);
    };
    validateData() && onSignUp(data, successMethod, errorMethod);
  };

  const validateData = () => {
    switch (true) {
      case firstName.length < 3:
        setErrors({
          firstName: true,
        });
        break;
      case lastName.length < 3:
        setErrors({
          lastName: true,
        });
        break;
      case !validateEmail(email):
        setErrors({
          email: true,
        });
        break;
      case password.length < 8:
        setErrors({
          password: true,
        });
        break;
      case password !== confirmPassword:
        setErrors({
          confirmPassword: true,
        });
        break;

      default:
        break;
    }

    if (
      firstName.length > 2 &&
      lastName.length > 2 &&
      validateEmail(email) &&
      password.length > 7 &&
      password === confirmPassword
    ) {
      return true;
    } else {
      return false;
    }
  };

  console.log(errors, "errors");

  return (
    <Container fluid className="signUpContainer">
      <Row className="top-row">
        <Col lg={10} className="login-form-bg">
          <Row style={{ height: "100%" }} className="align-items-center">
            <Col xs md={6}>
              <img
                width="100%"
                src={SignUpTheme}
                alt="login"
                className="theme-image"
              />
            </Col>
            <Col xs md={6}>
              <Form>
                <h1 className="text-center">Sign Up</h1>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter your firstname"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setErrors({});
                    }}
                    required
                    isInvalid={errors.firstName}
                  />
                  <Form.Control.Feedback type={"invalid"}>
                    First Name should be more than 3 charecters
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter your lastname"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setErrors({});
                    }}
                    required
                    isInvalid={errors.lastName}
                  />
                  <Form.Control.Feedback type={"invalid"}>
                    Last Name should be more than 3 charecters
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({});
                    }}
                    required
                    isInvalid={errors.email}
                  />
                  <Form.Control.Feedback type={"invalid"}>
                    Enter a valid email address
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({});
                      }}
                      required
                      isInvalid={errors.password}
                    />
                    <InputGroup.Text
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      className="eye-icon"
                    >
                      {showPassword ? <BiShow /> : <BiHide />}
                    </InputGroup.Text>
                    <Form.Control.Feedback type={"invalid"}>
                      Password should be atleast of 8 charecters.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="formBasicConfirmPassword"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors({});
                      }}
                      required
                      isInvalid={errors.confirmPassword}
                    />
                    <InputGroup.Text
                      onClick={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                      className="eye-icon"
                    >
                      {showConfirmPassword ? <BiShow /> : <BiHide />}
                    </InputGroup.Text>
                    <Form.Control.Feedback type={"invalid"}>
                      Confirm password is not matching with the password.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Form>
              <div className="button-container">
                <button
                  type="submit"
                  onClick={(e) => {
                    signUp(e);
                  }}
                  className="login-btn btn"
                >
                  Sign Up
                </button>
              </div>
              <label
                className="back-to-login"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </label>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  onSignUp: (data, successMethod, errorMethod) => {
    dispatch(signUpWithEmail(data, successMethod, errorMethod));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);

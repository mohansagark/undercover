import { Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import "./style.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { sendpasswordResetEmail } from "../../store/actions/login.actions";
import { validateEmail } from "../../helpers/general";

const ForgotPasswordComponent = ({ onForgotPassword }) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");

  const forgotPassword = async (e) => {
    e.preventDefault();
    const successMethod = () => {
      toast.success(
        "A passowrd reset mail has been sent to your registered mail address. Please check your email and update your password"
      );
    };
    const errorMethod = (e) => {
      toast.error(e);
    };
    onForgotPassword(email, successMethod, errorMethod);
  };

  return (
    <Container fluid className="forgot-password-container">
      <Container fluid className="divider-1">
        <Row>
          <Col lg={12}>
            <h1 className="forgotPs-title">Auth Template</h1>
          </Col>
        </Row>
      </Container>
      <Container fluid className="divider-2">
        <Row>
          <Col lg={3} md={6} sm={8} className="forgotPs-form">
            <RiLockPasswordFill
              className="forgotPs-img"
              size={100}
              color={"#191970"}
            />
            <h1 className="forgotPs-label">Forgot Password</h1>
            <Form.Text className="forgotPs-desc">
              Enter your email and we'll send you a link to reset your password
            </Form.Text>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className={
                    validateEmail(email) ? "submit-btn" : "submit-btn disabled"
                  }
                  onClick={
                    validateEmail(email)
                      ? (e) => {
                          forgotPassword(e);
                        }
                      : null
                  }
                >
                  Reset password
                </button>
              </Form.Group>
            </Form>

            <Row>
              <Col lg={3}></Col>
              <Col lg={6}>
                <label
                  className="back-to-login"
                  onClick={() => navigate("/login")}
                >
                  Back to Login
                </label>
              </Col>
              <Col lg={3}></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onForgotPassword: (email, successMethod, errorMethod) => {
    dispatch(sendpasswordResetEmail(email, successMethod, errorMethod));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordComponent);

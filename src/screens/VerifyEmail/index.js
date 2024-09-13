import { Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useState } from "react";
import { validateEmail } from "../../helpers/general";
import { FiMail } from "react-icons/fi";
import { sendpasswordResetEmail } from "../../store/actions/login.actions";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const VerifyEmail = ({ onResendVerificationEmail }) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");

  const onVerifyEmail = async (e) => {
    e.preventDefault();
    const successMethod = () => {
      toast.success(
        "A verification mail has been sent to your registered email. Please check and verify your email."
      );
    };
    const errorMethod = (e) => {
      toast.error(e);
    };
    onResendVerificationEmail(email, successMethod, errorMethod);
  };

  return (
    <Container fluid className="verify-email-container">
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
            <FiMail size={100} className="forgotPs-img" color={"#191970"} />
            <h1 className="forgotPs-label">Verify Email</h1>
            <Form.Text className="forgotPs-desc">
              Enter your email and we'll send you a verification link
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
                          onVerifyEmail(e);
                        }
                      : null
                  }
                >
                  Send verification email
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
  onResendVerificationEmail: (email, successMethod, errorMethod) => {
    dispatch(sendpasswordResetEmail(email, successMethod, errorMethod));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);

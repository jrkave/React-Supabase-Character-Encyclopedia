import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import '../styles/Forms.css';

// Login component
const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      // Make sure all fields are filled in
      if (!passwordRef.current?.value || !emailRef.current?.value) {
        setErrorMsg("Please fill in all fields.");
        return;
      }
      // User, session, and error come back from supabase request
      const {
        data: { user, session },
        error
      } = await login(emailRef.current.value, passwordRef.current.value);
      if (error) setErrorMsg(error.message); // Unsuccessful
      if (user && session) navigate("/"); // Navigate to home page
    // Login didn't work 
    } catch (error) {
      setErrorMsg("Incorrect email or password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <Card border="secondary">
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" id="email-input" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" id="password-input" ref={passwordRef} required />
            </Form.Group>
            {errorMsg && (
              <Alert
                variant="danger"
                onClose={() => setErrorMsg("")}
                dismissible>
                {errorMsg}
              </Alert>
            )}
            <div className="text-center mt-2">
              <Button disabled={loading} id="login-btn" size="med" type="submit" className="w-50">
                Login
              </Button>
            </div>
          </Form>
        </Card.Body>
        <div className="links w-100 text-center mt-2">
          New User? <Link to={"/register"}>Register</Link>
        </div>
        <div className="links w-100 text-center mt-2">
          Forgot Password? <Link to={"/passwordreset"}>Click Here</Link>
        </div>
      </Card>
    </>
  );
};

export default Login;

import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";

const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const displayNameRef = useRef(null); 
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (email, password, displayName) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value ||
      !displayNameRef.current?.value
    ) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("Passwords don't match. Please try again.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {
      const { user, error } = await register(
        emailRef.current.value, 
        passwordRef.current.value, 
        displayNameRef.current.value
      );

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
      } else if (user) {
        setMsg("Registration successful. Check your email to confirm your account.");
      }
    } catch (error) {
      console.error('Error in creating account:', error);
      setErrorMsg("Error in creating account.");
    } finally {
      if (user && session) navigate("/"); // Navigate to home page
      setLoading(false);
    }
  };

  return (
    <>
      <Card border="secondary">
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} required />
            </Form.Group>
            <Form.Group id="display-name">
              <Form.Label>Display Name</Form.Label>
              <Form.Control type="text" ref={displayNameRef} required />
            </Form.Group>
            {errorMsg && <Alert variant="danger" onClose={() => setErrorMsg("")} dismissible>{errorMsg}</Alert>}
            {msg && <Alert variant="success" onClose={() => setMsg("")} dismissible>{msg}</Alert>}
            <div className="text-center mt-2">
              <Button disabled={loading} type="submit" className="w-50">
                Register
              </Button>
            </div>
          </Form>
          <div className="links w-100 text-center mt-2">
            Already a User? <Link to={"/login"}>Login</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Register;

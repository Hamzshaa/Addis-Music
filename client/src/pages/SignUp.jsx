import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { signup } from "../actions/userActions";

export default function SignUp() {
  const [inputs, setinputs] = useState({
    email: "",
    password1: "",
    password2: "",
  });
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setinputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signup(inputs));
  };

  return (
    <Sign>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {error && <Error>{error}</Error>}

        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            onChange={handleChange}
            value={inputs.email}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            id="password1"
            onChange={handleChange}
            value={inputs.password1}
          />
        </div>
        <div>
          <label>Confirm password</label>
          <input
            type="password"
            id="password2"
            onChange={handleChange}
            value={inputs.password2}
          />
        </div>
        <button type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>

      <LinkToSignIn>
        <p>Don&apos;t have an account?</p>
        <Link to="/signin">
          <span>Sign In</span>
        </Link>
      </LinkToSignIn>
    </Sign>
  );
}

const Sign = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin-bottom: 2rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  input {
    padding: 0.5rem;
  }
  button {
    padding: 0.5rem 1rem;
    background: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background: #ac2efb;
  }
  button:active {
    background: #6f2f9e;
  }
`;

const Error = styled.div`
  background-color: #f2a9a9;
  border-radius: 4px;
  color: #c20101;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 1rem;
  padding: 0.5rem;
  text-align: center;
`;

const LinkToSignIn = styled.div`
  display: flex;
  flex-direction: row !important;
  a {
    text-decoration: none;
  }
  margin-top: 2rem;
`;

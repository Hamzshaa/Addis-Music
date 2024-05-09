import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../actions/userActions";

export default function SignIn() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((state) => state.user);
  //   const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handle Submit");
    dispatch(login(inputs));
  };

  return (
    <Sign>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {error && <Error>{error}</Error>}
        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            value={inputs.email}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            value={inputs.password}
          />
        </div>
        <button type="submit" disabled={loading}>
          Sign In
        </button>
      </form>

      <LinkToSignUp>
        <p>Don&apos;t have an account?</p>
        <Link to="/signup">
          <span>Sign Up</span>
        </Link>
      </LinkToSignUp>
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

const LinkToSignUp = styled.div`
  display: flex;
  flex-direction: row !important;
  a {
    text-decoration: none;
  }
  margin-top: 2rem;
`;

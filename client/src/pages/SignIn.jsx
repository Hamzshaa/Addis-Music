import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SignIn() {
  return (
    <Sign>
      <h1>Sign In</h1>
      <form>
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <button type="submit">Sign In</button>
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

const LinkToSignUp = styled.div`
  display: flex;
  flex-direction: row !important;
  a {
    text-decoration: none;
  }
  margin-top: 2rem;
`;

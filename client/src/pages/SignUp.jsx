import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SignUp() {
  const [inputs, setinputs] = useState({
    email: "",
    password1: "",
    password2: "",
  });
  //   const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  const handleChange = (e) => {
    setinputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  console.log(inputs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //   dispatch(signInStart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();

      if (res.ok) {
        // dispatch(signInSuccess(null));
        navigate("/signin");
      } else {
        // dispatch(signInFailure(data.message));
      }
    } catch (error) {
      //   dispatch(signInFailure(error.message));
    }
  };

  return (
    <Sign>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Sign Up</button>
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

const LinkToSignIn = styled.div`
  display: flex;
  flex-direction: row !important;
  a {
    text-decoration: none;
  }
  margin-top: 2rem;
`;

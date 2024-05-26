import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userLogout } from "../actions/userActions";

export default function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    dispatch(userLogout());
  };

  return (
    <NavContainer>
      <NavInnerWrapper>
        <Nav>
          <Link to="/">
            {" "}
            <Logo>
              <img src="logo.png" alt="" />
              <h2>Addis Music</h2>
            </Logo>
          </Link>
          <Menus>
            <Link
              to="/      
      "
            >
              <p>Home</p>
            </Link>
            <Link
              to="/add   
         "
            >
              <p>Add</p>
            </Link>
          </Menus>
        </Nav>
        {currentUser ? (
          <Sign onClick={handleSignout}>Sign Out</Sign>
        ) : (
          <Sign>
            <Link to="signin">Sign In</Link>
          </Sign>
        )}
      </NavInnerWrapper>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #333;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  a {
    text-decoration: none;
  }
`;

const NavInnerWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin-inline: auto;
  display: flex;
  align-items: center;
  text-align: center;
`;

const Nav = styled.nav`
  color: white;
  padding: 0rem 2rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex: 1;

  @media (max-width: 576px) {
    padding: 1rem 1rem 1rem 0.4rem;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    object-fit: cover;
    height: 45px;
    margin-top: 5px;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 576px) {
    font-size: 0.8rem;
    img {
      height: 30px;
    }
  }
`;

const Menus = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  p {
    font-size: 1rem;
    font-weight: 500;
    color: #d1d0d0;
    cursor: pointer;
  }
  p:hover {
    color: #ffffff;
  }
  p:active {
    color: #ffffff;
  }

  @media (max-width: 576px) {
    gap: 0.8rem;
    p {
      font-size: 0.9rem;
    }
  }
`;

const Sign = styled.div`
  border-left: 1px solid #d1d0d0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccc;
  width: 100px;
  height: 30px;
  margin: auto;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #fff;
  }
  a {
    color: white;
    text-decoration: none;
  }
`;

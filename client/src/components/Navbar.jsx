import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Navbar() {
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);

  return (
    <NavContainer>
      <Nav>
        <Link to="/">
          {" "}
          <Logo>Addis Music</Logo>
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
          {/* <Link
            to="/about 
           "
          >
            <p>About</p>
          </Link>
          <Link
            to="contact
            "
          >
            <p>Contact</p>
          </Link> */}
        </Menus>
      </Nav>
      {currentUser ? (
        <Sign>Sign Out</Sign>
      ) : (
        <Sign>
          <Link to="signin">Sign In</Link>
        </Sign>
      )}
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
  a {
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  color: white;
  padding: 1rem 2rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
  max-width: 800px;
  width: 100%;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
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
`;

const Sign = styled.div`
  padding: 0rem 0.5rem;
  background: #bb69ed;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  margin: auto;
  transition: all 0.3s;
  &:hover {
    background: #6f2f9e;
  }
`;

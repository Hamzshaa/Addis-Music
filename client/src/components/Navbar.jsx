import styled from "styled-components";

export default function Navbar() {
  return (
    <NavContainer>
      <Nav>
        <Logo>Addis Music</Logo>
        <Menus>
          <p>Home</p>
          <p>Add Music</p>
          <p>About</p>
          <p>Contact</p>
        </Menus>
      </Nav>
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

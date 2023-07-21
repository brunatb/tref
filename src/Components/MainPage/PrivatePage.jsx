/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import ThemeSwitcher from "../ThemeSwitcher";
import Header from "./Header";
import Menu from "./Menu";

export default function PrivatePage({ children }) {
  const { userData } = useContext(UserContext);

  if (localStorage.getItem("hash") && userData.token) {
    return (
      <Wrapper>
        <Header />
        <ThemeSwitcher />
        {children}
        <Menu />
      </Wrapper>
    );
  } else {
    return <Navigate to="/" replace />;
  }
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 90px 20px;
`;

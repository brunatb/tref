/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function Header() {
  const { setUserData, userData } = useContext(UserContext);
  const [isOpened, setIsOpened] = useState(false);

  return (
    <TopTitle isOpened={isOpened} data-test="header">
      <MinimizedMenu>
        <h1>TrackIt</h1>
        {isOpened ? (
          <ion-icon
            name="chevron-up-circle-outline"
            onClick={() => setIsOpened(!isOpened)}
          ></ion-icon>
        ) : (
          <ion-icon
            name="chevron-down-circle-outline"
            onClick={() => setIsOpened(!isOpened)}
          ></ion-icon>
        )}
        <img
          src={userData.image}
          alt="Profile"
          data-test="avatar"
          onClick={() => setIsOpened(!isOpened)}
        />
      </MinimizedMenu>
      <ExpandedHeader
        isOpened={isOpened}
        userData={userData}
        setUserData={setUserData}
      />
    </TopTitle>
  );
}

function ExpandedHeader({ isOpened, userData, setUserData }) {
  const navigate = useNavigate();
  const [toConfirm, setToConfirm] = useState(false);

  function logout() {
    localStorage.clear();
    setUserData([]);
    navigate("/");
  }

  return (
    <MaximizedMenu>
      <OverlayConfirm toConfirm={toConfirm}>
        <ConfirmBox>
          <h5>Você quer mesmo sair?</h5>
          <div>
            <button onClick={logout}>Sim</button>
            <button onClick={() => setToConfirm(false)}>Não</button>
          </div>
        </ConfirmBox>
      </OverlayConfirm>
      {isOpened ? <h2>Olá, {userData.name}!</h2> : <></>}
      {isOpened ? <h2 onClick={() => setToConfirm(true)}>Logout</h2> : <></>}
    </MaximizedMenu>
  );
}

const TopTitle = styled.header`
  width: 100%;
  height: ${(props) => (props.isOpened ? "140px" : "70px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => (props.isOpened ? "flex-start" : "center")};
  padding: 0 18px;
  background-color: ${(props) => props.theme.header.background};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  border-bottom-left-radius: ${(props) => (props.isOpened ? "20px" : "0")};
  border-bottom-right-radius: ${(props) => (props.isOpened ? "20px" : "0")};
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.3s;
  z-index: 3;
  gap: 20px;

  h1 {
    font-family: "Playball", sans-serif;
    font-size: 39px;
    color: ${(props) => props.theme.header.text};
  }

  img {
    height: ${(props) => (props.isOpened ? "70px" : "51px")};
    width: ${(props) => (props.isOpened ? "70px" : "51px")};
    object-fit: cover;
    border-radius: 50px;
  }

  ion-icon {
    color: white;
    font-size: 24px;
    position: absolute;
    bottom: 0;
    right: 47%;
  }

  h2 {
    color: ${(props) => props.theme.header.text};
    font-size: 20px;
    font-weight: 500;
  }

  h2:nth-of-type(2) {
    text-decoration: underline;
  }
`;

const MinimizedMenu = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  padding-top: 18px;
  justify-content: space-between;
  align-items: center;
`;

const MaximizedMenu = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OverlayConfirm = styled.div`
  width: 100vw;
  height: 100vh;
  display: ${(props) => (props.toConfirm ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
`;

const ConfirmBox = styled.div`
  width: 280px;
  height: 15%;
  padding: 10px;
  background-color: ${(props) => props.theme.header.confirmBox};
  border: 2px solid #126ba5;
  border-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  h5 {
    font-size: 21px;
    font-weight: 500;
    color: ${(props) => props.theme.header.confirmTitle};
  }

  div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    button {
      width: 80px;
      height: 30px;
      background-color: #126ba5;
      border: none;
      border-radius: 8px;
      color: white;
      font-size: 18px;
      font-weight: 500;
    }
  }
`;

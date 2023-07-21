import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function ThemeSwitcher(){
  const {setIsDarkTheme, isDarkTheme} = useContext(UserContext);

  return(
    <>
      <ThemeContainer isDarkTheme={isDarkTheme}>
        <div>
          <Light onClick={() => setIsDarkTheme(false)}>Light</Light>
          <Dark onClick={() => setIsDarkTheme(true)}>Dark</Dark>
        </div>
      </ThemeContainer>
    </>
  )
}

const ThemeContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 70px;
  height: 50px;
  background-color: ${props => props.theme.themeContainer.background};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  gap:8px;
  border: 1px solid #747474;
  z-index: 8;
  
  div{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
`;

const Light = styled.button`
  width: 50px;
  border: none;
  border-radius: 50px;
  background-color: ${props => props.isDarkTheme ? props.theme.themeContainer.buttonOff : props.theme.themeContainer.buttonOn};
  color: ${props => props.isDarkTheme ? props.theme.themeContainer.textOff : props.theme.themeContainer.textOn};
  font-weight: 500;
  border: 1px solid #747474;
`;

const Dark = styled.button`
  width: 50px;
  border: none;
  border-radius: 50px;
  background-color: ${props => props.isDarkTheme ? props.theme.themeContainer.buttonOn : props.theme.themeContainer.buttonOff};
  color: ${props => props.isDarkTheme ? props.theme.themeContainer.textOn : props.theme.themeContainer.textOff};
  font-weight: 500;
  border: 1px solid #747474;
`;
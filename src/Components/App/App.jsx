import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import ProgressContext from "../../contexts/ProgressContext";
import UserContext from "../../contexts/UserContext";
import { Reset, GlobalStyle } from "../../globalStyle";
import dark from "../../themes/dark";
import light from "../../themes/light";
import Habits from "../MainPage/HabitsRoute/Habits";
import Historic from "../MainPage/HistoricRoute/Historic";
import PrivatePage from "../MainPage/PrivatePage";
import Today from "../MainPage/TodayRoute/Today";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

export default function App() {
  const [userData, setUserData] = useState({});
  const [todaysHabits, setTodaysHabits] = useState([]);
  const [reloadHabits, setReloadHabits] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <>
      <ThemeProvider theme={isDarkTheme ? dark : light}>
        <UserContext.Provider
          value={{ userData, setUserData, isDarkTheme, setIsDarkTheme }}
        >
          <ProgressContext.Provider
            value={{
              todaysHabits,
              setTodaysHabits,
              reloadHabits,
              setReloadHabits,
            }}
          >
            <Reset />
            <GlobalStyle />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/cadastro" element={<SignUp />} />
                <Route
                  path="/hoje"
                  element={
                    <PrivatePage>
                      <Today />
                    </PrivatePage>
                  }
                />
                <Route
                  path="/habitos"
                  element={
                    <PrivatePage>
                      <Habits />
                    </PrivatePage>
                  }
                />
                <Route
                  path="/historico"
                  element={
                    <PrivatePage>
                      <Historic />
                    </PrivatePage>
                  }
                />
              </Routes>
            </BrowserRouter>
          </ProgressContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
}

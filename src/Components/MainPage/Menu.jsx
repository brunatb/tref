import { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProgressContext from "../../contexts/ProgressContext";

export default function Menu() {
  const { todaysHabits } = useContext(ProgressContext);
  const totalHabits = todaysHabits.length;
  const checkedHabits = todaysHabits.filter((habit) => habit.done).length;

  return (
    <BottomMenu data-test="menu">
      <Link to="/habitos" data-test="habit-link">
        <span>Hábitos</span>
      </Link>
      <Link to="/hoje" data-test="today-link">
        <CircularProgressbar
          value={
            checkedHabits === 0 || totalHabits === 0
              ? 0
              : (checkedHabits / totalHabits) * 100
          }
          text={<tspan dominantBaseline="middle">Hoje</tspan>}
          background
          backgroundPadding={6}
          styles={buildStyles({
            backgroundColor: "#52B6FF",
            textColor: "#fff",
            pathColor: "#fff",
            trailColor: "transparent",
            strokeLinecap: "round",
            textSize: "18px",
            pathTransitionDuration: 0.5,
          })}
        />
      </Link>
      <Link to="/historico" data-test="history-link">
        <span>Histórico</span>
      </Link>
    </BottomMenu>
  );
}

const BottomMenu = styled.footer`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 33px;
  background-color: ${(props) => props.theme.menu.background};
  position: fixed;
  bottom: 0;
  left: 0;

  span {
    font-size: 18px;
    color: ${(props) => props.theme.menu.text};
  }

  svg {
    width: 91px;
    height: 91px;
    margin-bottom: 40px;
    text-anchor: middle;
  }
`;

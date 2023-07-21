/* eslint-disable react/prop-types */
import { useContext } from "react";
import styled from "styled-components";
import {
  postCompletedHabit,
  postUncompletedHabit,
} from "../../../services/trackit";
import ProgressContext from "../../../contexts/ProgressContext";
import { useNavigate } from "react-router-dom";

export default function TodaysHabit({
  name,
  id,
  done,
  currentSequence,
  highestSequence,
  color,
}) {
  const { todaysHabits, reloadHabits, setReloadHabits } =
    useContext(ProgressContext);
  const navigate = useNavigate();

  function checkHabit() {
    if (done) {
      const promise = postUncompletedHabit(todaysHabits, id);
      promise
        .then(() => {
          setReloadHabits(!reloadHabits);
        })
        .catch((res) => {
          alert(
            `Aconteceu um erro inesperado!\nDescrição: ${
              res.response.data.details
                ? res.response.data.details[0]
                : res.response.data.message
            }`
          );
          navigate("/");
        });
    } else {
      const promise = postCompletedHabit(todaysHabits, id);
      promise
        .then(() => {
          setReloadHabits(!reloadHabits);
        })
        .catch((res) => {
          alert(
            `Aconteceu um erro inesperado!\nDescrição: ${
              res.response.data.details
                ? res.response.data.details[0]
                : res.response.data.message
            }`
          );
          navigate("/");
        });
    }
  }

  return (
    <HabitCard color={color} data-test="today-habit-container">
      <div>
        <HabitName data-test="today-habit-name">{name}</HabitName>
        <Sequences
          color={color}
          currentSequence={currentSequence}
          highestSequence={highestSequence}
        >
          <h4 data-test="today-habit-sequence">
            Sequência atual: <strong>{currentSequence} dias</strong>
          </h4>
          <h4 data-test="today-habit-record">
            Seu recorde: <strong>{highestSequence} dias</strong>
          </h4>
        </Sequences>
      </div>
      <ion-icon
        name="checkbox"
        onClick={checkHabit}
        data-test="today-habit-check-btn"
      ></ion-icon>
    </HabitCard>
  );
}

const HabitCard = styled.div`
  width: 100%;
  height: 94px;
  background-color: ${(props) => props.theme.mainPage.secundary};
  border-radius: 5px;
  padding: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  position: relative;

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  ion-icon {
    width: 87px;
    height: 87px;
    color: ${(props) => (props.color ? props.color : "#ebebeb")};
    position: absolute;
    top: 5px;
    right: 5px;
  }
`;

const Sequences = styled.div`
  && {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  h4:nth-of-type(1) {
    font-size: 13px;
    color: ${(props) => props.theme.fontColor.text};

    strong {
      color: ${(props) =>
        props.color ? "#8FC549" : props.theme.fontColor.text};
    }
  }

  h4:nth-of-type(2) {
    font-size: 13px;
    color: ${(props) => props.theme.fontColor.text};

    strong {
      color: ${(props) =>
        props.currentSequence === props.highestSequence &&
        props.highestSequence !== 0
          ? "#8FC549"
          : props.theme.fontColor.text};
    }
  }
`;

const HabitName = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.fontColor.text};
`;

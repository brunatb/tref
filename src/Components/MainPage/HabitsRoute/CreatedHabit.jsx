/* eslint-disable react/prop-types */
import styled from "styled-components";
import { getTodayHabits, removeHabit } from "../../../services/trackit";
import ProgressContext from "../../../contexts/ProgressContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatedHabit({
  name,
  days,
  id,
  refreshList,
  setRefreshList,
}) {
  const week = ["D", "S", "T", "Q", "Q", "S", "S"];
  const { setTodaysHabits } = useContext(ProgressContext);
  const navigate = useNavigate();

  function deleteHabit() {
    if (window.confirm("Você tem certeza que quer deletar esse hábito?")) {
      const promise = removeHabit(id);
      promise
        .then(() => {
          setRefreshList(!refreshList);
          //PROMISE PARA ATUALIZAR O PROGRESSO DO BOTÃO CIRCULAR
          const promise = getTodayHabits();
          promise.then((res) => setTodaysHabits(res.data));
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
    <HabitCard data-test="habit-container">
      <HabitName data-test="habit-name">{name}</HabitName>
      <WeekContainer>
        {week.map((day, index) =>
          days.includes(index) ? (
            <StyledDay key={index} selected={true} data-teste="habit-day">
              {day}
            </StyledDay>
          ) : (
            <StyledDay key={index} selected={false} data-teste="habit-day">
              {day}
            </StyledDay>
          )
        )}
      </WeekContainer>
      <ion-icon
        onClick={deleteHabit}
        name="trash-outline"
        data-test="habit-delete-btn"
      ></ion-icon>
    </HabitCard>
  );
}

const HabitCard = styled.div`
  height: 91px;
  background-color: ${(props) => props.theme.mainPage.secundary};
  border-radius: 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 10px;
  position: relative;

  ion-icon {
    width: 17px;
    height: 17px;
    position: absolute;
    top: 11px;
    right: 10px;
    color: ${(props) => props.theme.fontColor.text};
  }
`;

const WeekContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 30px;
`;

const HabitName = styled.h3`
  font-size: 20px;
  color: ${(props) => props.theme.fontColor.text};
`;

const StyledDay = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  color: ${(props) =>
    props.selected
      ? props.theme.fontColor.weekdayNone
      : props.theme.fontColor.weekdaySelected};
  background-color: ${(props) =>
    props.selected
      ? props.theme.mainPage.weekdayNone
      : props.theme.mainPage.weekdaySelected};
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

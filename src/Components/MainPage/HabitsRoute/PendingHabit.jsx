/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProgressContext from "../../../contexts/ProgressContext";
import { getTodayHabits, postHabit } from "../../../services/trackit";

export default function PendingHabit({
  setCreateHabit,
  refreshList,
  setRefreshList,
  habitName,
  setHabitName,
  days,
  setDays,
}) {
  const week = ["D", "S", "T", "Q", "Q", "S", "S"];
  const [savedHabit, setSavedHabit] = useState(false);
  const [isCreatingHabit, setIsCreatingHabit] = useState(false);
  const { setTodaysHabits } = useContext(ProgressContext);
  const navigate = useNavigate();

  function sendHabit() {
    if (days.length === 0) {
      alert("Você precisa selecionar pelo menos um dia da semana.");
    } else {
      setSavedHabit(true);
      const habitObject = {
        name: habitName,
        days,
      };
      setIsCreatingHabit(true);
      const promise = postHabit(habitObject);
      promise
        .then(() => {
          setCreateHabit(false);
          setHabitName("");
          setDays([]);
          setRefreshList(!refreshList);
          //PROMISE PARA ATUALIZAR O PROGRESSO DO BOTÃO CIRCULAR
          const promise = getTodayHabits();
          promise.then((res) => setTodaysHabits(res.data));
        })
        .catch((res) => {
          alert(
            `Não foi possível enviar seu hábito.Tente novamente.\nDescrição: ${
              res.response.data.details
                ? res.response.data.details[0]
                : res.response.data.message
            }`
          );
          setSavedHabit(false);
          navigate("/");
        })
        .finally(() => {
          setIsCreatingHabit(false);
        });
    }
  }

  return (
    <HabitCard data-test="habit-create-container">
      <input
        type="text"
        placeholder="nome do hábito"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        disabled={savedHabit ? true : false}
        data-test="habit-name-input"
      />
      <WeekContainer>
        {week.map((day, index) =>
          days.includes(index) ? (
            <Day
              key={index}
              day={day}
              setDays={setDays}
              days={days}
              index={index}
              savedHabit={savedHabit}
              color={"white"}
              background="#cfcfcf"
              isCreatingHabit={isCreatingHabit}
            />
          ) : (
            <Day
              key={index}
              day={day}
              setDays={setDays}
              days={days}
              index={index}
              savedHabit={savedHabit}
              isCreatingHabit={isCreatingHabit}
            />
          )
        )}
      </WeekContainer>
      <Buttons savedHabit={savedHabit}>
        <button
          onClick={() => {
            setCreateHabit(false);
          }}
          data-test="habit-create-cancel-btn"
          disabled={isCreatingHabit}
        >
          Cancelar
        </button>
        {savedHabit ? (
          <button data-test="habit-create-save-btn" disabled>
            <Bars width={30} color="white" />
          </button>
        ) : (
          <button onClick={sendHabit} data-test="habit-save-btn">
            Salvar
          </button>
        )}
      </Buttons>
    </HabitCard>
  );
}

function Day({
  day,
  setDays,
  days,
  index,
  savedHabit,
  color,
  background,
  isCreatingHabit,
}) {
  const [isClicked, setIsClicked] = useState(false);

  function handleDays() {
    const aux = days.filter((value) => value === index);
    setIsClicked(!isClicked);

    if (!savedHabit) {
      if (!color) {
        if (aux.length === 0) {
          setDays([...days, index]);
        }
      } else {
        const indexAux = days.findIndex((value) => value === aux[0]);
        const filteredDays = days.filter((value, index) => index !== indexAux);
        setDays(filteredDays);
      }
    }
  }

  return (
    <StyledDay
      color={color}
      background={background}
      isClicked={isClicked}
      savedHabit={savedHabit}
      onClick={handleDays}
      data-test="habit-day"
      disabled={isCreatingHabit}
    >
      {day}
    </StyledDay>
  );
}

const HabitCard = styled.div`
  height: 180px;
  background-color: ${(props) => props.theme.mainPage.secundary};
  border-radius: 5px;
  padding: 18px;
  margin-bottom: 15px;

  input {
    width: 100%;
    height: 45px;
    border: 1px solid #d4d4d4;
    font-size: 20px;
    padding-left: 11px;
    border-radius: 5px;
    color: ${(props) => props.theme.fontColor.text};
    margin-bottom: 8px;
    background-color: ${(props) => props.theme.signPages.secundary};

    &::placeholder {
      color: #dbdbdb;
    }
  }
`;

const WeekContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 30px;
`;

const StyledDay = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  color: ${(props) =>
    props.color
      ? props.theme.fontColor.weekdayNone
      : (props) => props.theme.fontColor.weekdaySelected};
  background-color: ${(props) =>
    props.color
      ? props.theme.mainPage.weekdayNone
      : (props) => props.theme.mainPage.weekdaySelected};
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.savedHabit ? "0.5" : "initial")};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 23px;

  span {
    color: #52b6ff;
    font-size: 16px;
  }

  button {
    width: 84px;
    height: 35px;
    border: none;
    background-color: ${(props) => (props.savedHabit ? "#86CCFF" : "#52B6FF")};
    border-radius: 5px;
    color: #ffffff;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

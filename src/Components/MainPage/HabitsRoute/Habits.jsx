import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getHabits } from "../../../services/trackit";
import { Comment, Title } from "../../../common";
import CreatedHabit from "./CreatedHabit";
import PendingHabit from "./PendingHabit";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [createHabit, setCreateHabit] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [days, setDays] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const promise = getHabits();

    promise
      .then((res) => {
        setHabits(res.data);
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
  }, [refreshList, navigate]);

  return (
    <>
      <TitleContainer>
        <Title>Meus hábitos</Title>
        <div onClick={() => setCreateHabit(true)} data-test="habit-create-btn">
          +
        </div>
      </TitleContainer>
      {createHabit ? (
        <PendingHabit
          setCreateHabit={setCreateHabit}
          refreshList={refreshList}
          setRefreshList={setRefreshList}
          habitName={habitName}
          setHabitName={setHabitName}
          days={days}
          setDays={setDays}
        />
      ) : (
        ""
      )}
      {habits.length === 0 ? (
        <Comment>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!
        </Comment>
      ) : (
        habits.map(({ name, days, id }) => (
          <CreatedHabit
            key={id}
            name={name}
            days={days}
            id={id}
            refreshList={refreshList}
            setRefreshList={setRefreshList}
          />
        ))
      )}
    </>
  );
}

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  div {
    width: 40px;
    height: 35px;
    background-color: #52b6ff;
    color: #ffffff;
    font-size: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding-bottom: 3px;
  }
`;

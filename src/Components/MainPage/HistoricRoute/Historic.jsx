import { Title } from "../../../common";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import { getHistoric } from "../../../services/trackit";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

export default function Historic() {
  const [date, setDate] = useState(new Date());
  const [habitsHistoric, setHabitsHistoric] = useState([]);
  const [daysWithHabits, setDaysWithHabits] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState([]);

  useEffect(() => {
    const promise = getHistoric();
    promise.then((res) => {
      setHabitsHistoric(res.data);
      const aux = res.data.map((habit) => habit.day);
      setDaysWithHabits(aux);
    });
  }, []);

  function tileClassName({ date, view }) {
    if (view === "month") {
      const calendarDay = dayjs(date).format("DD/MM/YYYY");
      const today = dayjs().format("DD/MM/YYYY");
      if (daysWithHabits.includes(calendarDay) && calendarDay !== today) {
        const currentDayIndex = habitsHistoric.findIndex(
          (day) => day.day === calendarDay
        );
        const hasFalse = habitsHistoric[currentDayIndex].habits.filter(
          (habit) => !habit.done
        );
        if (hasFalse.length === 0) {
          return "successed";
        } else {
          return "failed";
        }
      }
    }
  }

  function showDayInfos(date) {
    const today = dayjs().format("DD/MM/YYYY");
    const formatedDay = dayjs(date).format("DD/MM/YYYY");
    if (daysWithHabits.includes(formatedDay) && formatedDay !== today) {
      const aux = habitsHistoric.filter((day) => day.day === formatedDay);
      const currentDay = {
        ...aux[0],
      };
      setSelectedDay(currentDay);
      setIsOpen(true);
    }
  }

  return (
    <>
      <Title>Histórico</Title>
      <CalendarWrapper data-test="calendar">
        <Calendar
          calendarType="US"
          locale="pt-br"
          onChange={setDate}
          date={date}
          formatDay={(locale, date) => dayjs(date).format("DD")}
          tileClassName={tileClassName}
          onClickDay={showDayInfos}
        />
      </CalendarWrapper>
      <OptionOverlay isOpen={isOpen}>
        <HabitBox>
          <h2>{`${dayjs(date).locale("pt-br").format("dddd")}, ${
            selectedDay.day
          }`}</h2>
          {selectedDay.length === 0 ? (
            <></>
          ) : (
            selectedDay.habits.map((habit, index) =>
              habit.done ? (
                <div key={index}>
                  <h6>{habit.name}</h6>
                  <ion-icon
                    name="checkmark-circle"
                    style={{ color: "green" }}
                  ></ion-icon>
                </div>
              ) : (
                <div key={index}>
                  <h6>{habit.name}</h6>
                  <ion-icon
                    name="close-circle"
                    style={{ color: "red" }}
                  ></ion-icon>
                </div>
              )
            )
          )}
          <button onClick={() => setIsOpen(false)}>Fechar</button>
        </HabitBox>
      </OptionOverlay>
      {/* <div>Em breve você poderá ver o histórico dos seus hábitos aqui!</div> */}
    </>
  );
}

const CalendarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  .react-calendar {
    width: 100%;
    max-width: 500px;
    height: 400px;
    border: none;
    border-radius: 10px;
    font-size: 18px;
  }

  .react-calendar__month-view__weekdays {
    text-decoration: underline;
  }

  .react-calendar__month-view__days {
    height: 290px;
  }

  .react-calendar__month-view__days__day {
    font-size: 18px;
  }

  .react-calendar__tile--active {
    background: #006edc;
    color: white;
    clip-path: circle();
  }

  .react-calendar__tile--now {
    background: #ffff76;
    clip-path: circle();
  }

  .successed {
    clip-path: circle();
    background-color: #8cc654;
  }

  .failed {
    clip-path: circle();
    background-color: #ea5766;
  }
`;

const OptionOverlay = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 1;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
`;

const HabitBox = styled.div`
  width: 70%;
  height: auto;
  background-color: ${(props) => props.theme.mainPage.primary};
  border-radius: 15px;
  border: 2px solid #126ba5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  color: ${(props) => props.theme.fontColor.text};

  h2 {
    font-size: 23px;
    color: ${(props) => props.theme.fontColor.titles};
    margin-bottom: 20px;
  }

  div {
    width: 100%;
    height: 50px;
    border-radius: 8px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #c3c3c3;
    background-color: ${(props) => props.theme.mainPage.secundary};
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;

    ion-icon {
      font-size: 30px;
    }
  }

  button {
    width: 150px;
    height: 40px;
    border: 1px solid #126ba5;
    background-color: #1b80c4;
    font-size: 20px;
    font-weight: 300;
    color: white;
    border-radius: 20px;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
  }
`;

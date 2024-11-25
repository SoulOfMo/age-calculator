import { useState } from "react";

export default function App() {
  const [yearResult, setYearResult] = useState("--");
  const [monthResult, setMonthResult] = useState("--");
  const [dayResult, setDayResult] = useState("--");

  function HandleYearResult(yearResult, monthResult, dayResult) {
    setYearResult(yearResult);
    setMonthResult(monthResult);
    setDayResult(dayResult);
  }

  return (
    <main className="container">
      <Form onYearResult={HandleYearResult} />
      <Result
        yearResult={yearResult}
        monthResult={monthResult}
        dayResult={dayResult}
      />
    </main>
  );
}

function Form({ onYearResult }) {
  // const [check, setCheck] = useState(true);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const [day, setDay] = useState("");

  const handleCheck = function (e) {
    e.preventDefault();
    console.log(year, month, day);
    const date = new Date(year, month - 1, day);
    const currentDate = new Date();
    const BirthdayDate = Math.floor(
      (currentDate - date) / (1000 * 60 * 60 * 24 * 365.35)
    );
    const monthResult = Math.floor(currentDate.getMonth() - date.getMonth());
    const dayResult = Math.floor(currentDate.getDate() - date.getDate());
    console.log(
      date,
      date.getDate() === parseInt(day, 10),
      date.getMonth() === month - 1,
      date.getFullYear() === parseInt(year, 10)
    );
    const okay =
      date.getFullYear() === parseInt(year, 10) &&
      date.getMonth() === month - 1 &&
      date.getDate() === parseInt(day, 10)
        ? ("valid ", BirthdayDate)
        : "7";

    console.log("hello", okay);
    onYearResult(BirthdayDate, monthResult, dayResult);
  };

  return (
    <form onSubmit={handleCheck}>
      <label>
        Day
        <input
          className="no-spinners"
          type="number"
          maxLength={2}
          placeholder="DD"
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
        ></input>
        <span className="error hidden">This field is required</span>
      </label>
      <label>
        Month
        <input
          className="no-spinners"
          type="number"
          maxLength={2}
          placeholder="MM"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        ></input>
      </label>
      <label>
        Year
        <input
          className="no-spinners"
          type="number"
          maxLength={4}
          placeholder="YYYY"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        ></input>
      </label>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="46"
          height="44"
          viewBox="0 0 46 44"
        >
          <g fill="none" stroke="#FFF" stroke-width="2">
            <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
          </g>
        </svg>
      </button>
    </form>
  );
}

function Result({ yearResult, monthResult, dayResult }) {
  return (
    <div className="results">
      <div className="year">
        <span className="result">{yearResult}</span>Years
      </div>
      <div className="month">
        <span className="result">{monthResult}</span>
        Months
      </div>
      <div className="day">
        <span className="result">{dayResult}</span>
        Days
      </div>
    </div>
  );
}

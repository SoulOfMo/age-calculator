import { useState } from "react";

export default function App() {
  const [yearResult, setYearResult] = useState("--");
  const [monthResult, setMonthResult] = useState("--");
  const [dayResult, setDayResult] = useState("--");

  function handleResult(yearResult, monthResult, dayResult) {
    setYearResult(yearResult);
    setMonthResult(monthResult);
    setDayResult(dayResult);
  }

  return (
    <main className="container">
      <Form
        onResult={handleResult}
        setYearResult={setYearResult}
        setMonthResult={setMonthResult}
        setDayResult={setDayResult}
      />
      <Result
        yearResult={yearResult}
        monthResult={monthResult}
        dayResult={dayResult}
      />
    </main>
  );
}

function Form({ onResult, setYearResult, setMonthResult, setDayResult }) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [emptyError, setEmptyError] = useState(false);

  //Submitting the form
  const handleCheck = function (e) {
    e.preventDefault();
    console.log(emptyError);
    setEmptyError(() => year === "" || month === "" || day === "");

    console.log(emptyError);
    if (year === "" || month === "" || day === "") {
      return;
    }

    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    if (birthDate > currentDate) {
      setYearResult(() => "--");
      setMonthResult(() => "--");
      setDayResult(() => "--");
      return console.log("error");
    }

    //Continue from here
    let yearResult = currentDate.getFullYear() - birthDate.getFullYear();
    let monthResult = currentDate.getMonth() - birthDate.getMonth();
    //
    if (monthResult < 0) {
      yearResult--;
      monthResult += 12;
    }

    // Calculating Month and Days
    let dayResult = currentDate.getDate() - birthDate.getDate();
    if (dayResult < 0) {
      let lastMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );

      dayResult += lastMonth.getDate();
      monthResult--;
      if (monthResult < 0) {
        yearResult--;
        monthResult += 12;
      }
    }

    const okay =
      birthDate.getFullYear() === parseInt(year, 10) &&
      birthDate.getMonth() === month - 1 &&
      birthDate.getDate() === parseInt(day, 10)
        ? ("valid ", yearResult)
        : "7";

    console.log("hello", okay);
    onResult(yearResult, monthResult, dayResult);
  };

  return (
    <form onSubmit={handleCheck}>
      <label>
        Day
        <input
          className="no-spinners"
          type="number"
          placeholder="DD"
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
        ></input>
        <span className={`error ${emptyError ? "show" : "hidden"}`}>
          This field is required
        </span>
      </label>
      <label>
        Month
        <input
          className="no-spinners"
          type="number"
          placeholder="MM"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        ></input>
        <span className={`error ${emptyError ? "show" : "hidden"}`}>
          This field is required
        </span>
      </label>
      <label>
        Year
        <input
          className="no-spinners"
          type="number"
          placeholder="YYYY"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        ></input>
        <span className={`error ${emptyError ? "show" : "hidden"}`}>
          This field is required
        </span>
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

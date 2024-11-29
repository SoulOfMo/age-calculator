import { useState } from "react";
import Form from "./Form";
import Result from "./Result";

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
      <Form onResult={handleResult} />
      <Result
        yearResult={yearResult}
        monthResult={monthResult}
        dayResult={dayResult}
      />
    </main>
  );
}

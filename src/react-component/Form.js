import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function Form({ onResult }) {
  const [yearInput, setYearInput] = useState("");
  const [monthInput, setMonthInput] = useState("");
  const [dayInput, setDayInput] = useState("");
  const [err, setErr] = useState(false);
  const [yearErr, setYearErr] = useState("");
  const [monthErr, setMonthErr] = useState("");
  const [dayErr, setDayErr] = useState("");

  function handleResultOnErr() {
    setErr(true);
    onResult("--", "--", "--");
  }

  function onFocusInput() {
    setErr(false);
    setDayErr("");
    setMonthErr("");
    setYearErr("");
  }
  //Submitting the form
  const handleCheck = function (e) {
    //Preventing Default
    e.preventDefault();
    setErr(false);
    //getting birthdayInput and setting it to a new date
    const birthDate = new Date(yearInput, monthInput - 1, dayInput);
    //checking for validity of the birthday Date
    if (dayInput === "" && monthInput === "" && yearInput === "") {
      setDayErr("This field is required");
      setMonthErr("This field is required");
      setYearErr("This field is required");
      handleResultOnErr();
      return;
    }

    if (dayInput === "") {
      setDayErr("This field is required");
      handleResultOnErr();
      return;
    }

    if (monthInput === "") {
      setMonthErr("This field is required");
      handleResultOnErr();
      return;
    }

    if (monthInput > 12) {
      setMonthErr("Must be a valid month");
      handleResultOnErr();
      return;
    }

    if (yearInput === "") {
      setYearErr("This field is required");
      setErr(true);
      return;
    }

    if (birthDate.getDate() !== parseInt(dayInput, 10)) {
      setDayErr("Must be a valid day");
      handleResultOnErr();
      return;
    }

    const currentDate = new Date(); //getting present day date
    if (birthDate > currentDate) {
      // checking if the birthday is greater than the present date
      setErr(true);
      setYearErr(`Must be in the past`);
      handleResultOnErr();
      return;
    }

    let yearResult = currentDate.getFullYear() - birthDate.getFullYear();
    let monthResult = currentDate.getMonth() - birthDate.getMonth();

    if (monthResult < 0) {
      yearResult--;
      monthResult += 12;
    }

    // Calculating Month and Days
    let dayResult = currentDate.getDate() - birthDate.getDate();
    if (dayResult < 0) {
      //this will get the number of days in last month
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
    // setting the Result (Age Differnces)
    onResult(yearResult, monthResult, dayResult);
  };

  return (
    <form onSubmit={handleCheck}>
      <Input
        placeholder={"DD"}
        value={dayInput}
        setValue={setDayInput}
        error={err}
        errMsg={dayErr}
        onFocus={onFocusInput}
      >
        Day
      </Input>

      <Input
        placeholder={"MM"}
        value={monthInput}
        setValue={setMonthInput}
        error={err}
        errMsg={monthErr}
        onFocus={onFocusInput}
      >
        Month
      </Input>

      <Input
        placeholder={"YYYY"}
        value={yearInput}
        setValue={setYearInput}
        error={err}
        errMsg={yearErr}
        onFocus={onFocusInput}
      >
        Year
      </Input>

      <Button />
    </form>
  );
}

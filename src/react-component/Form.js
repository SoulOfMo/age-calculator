import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function Form({ onResult }) {
  const [yearInput, setYearInput] = useState("");
  const [monthInput, setMonthInput] = useState("");
  const [dayInput, setDayInput] = useState("");
  const [errors, setErrors] = useState({
    dayErr: "",
    monthErr: "",
    yearErr: "",
  });

  function handleResultOnErr() {
    onResult("--", "--", "--");
  }

  function onFocusInput() {
    setErrors({ dayErr: "", monthErr: "", yearErr: "" });
  }
  //Submitting the form
  const handleCheck = function (e) {
    //Preventing Default
    e.preventDefault();
    //getting birthdayInput and setting it to a new date
    const birthDate = new Date(yearInput, monthInput - 1, dayInput);
    //checking for validity of the birthday Date
    if (dayInput === "" && monthInput === "" && yearInput === "") {
      setErrors({
        dayErr: "This field is required",
        monthErr: "This field is required",
        yearErr: "This field is required",
      });

      handleResultOnErr();
      return;
    }

    if (dayInput === "") {
      setErrors({ ...errors, dayErr: "This field is required" });
      handleResultOnErr();
      return;
    }

    if (monthInput === "") {
      setErrors({ ...errors, monthErr: "This field is required" });
      handleResultOnErr();
      return;
    }

    if (monthInput > 12) {
      setErrors({ ...errors, monthErr: "Must be a valid month" });
      handleResultOnErr();
      return;
    }

    if (yearInput === "") {
      setErrors({ ...errors, yearErr: "This field is required" });
      return;
    }

    if (birthDate.getDate() !== parseInt(dayInput, 10)) {
      setErrors({ ...errors, dayErr: "Must be a valid day" });
      handleResultOnErr();
      return;
    }

    const currentDate = new Date(); //getting present day date
    if (birthDate > currentDate) {
      // checking if the birthday is greater than the present date
      handleResultOnErr();
      setErrors({ ...errors, yearErr: `Must be in the past` });
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
        errMsg={errors.dayErr}
        onFocus={onFocusInput}
      >
        Day
      </Input>

      <Input
        placeholder={"MM"}
        value={monthInput}
        setValue={setMonthInput}
        errMsg={errors.monthErr}
        onFocus={onFocusInput}
      >
        Month
      </Input>

      <Input
        placeholder={"YYYY"}
        value={yearInput}
        setValue={setYearInput}
        errMsg={errors.yearErr}
        onFocus={onFocusInput}
      >
        Year
      </Input>

      <Button />
    </form>
  );
}

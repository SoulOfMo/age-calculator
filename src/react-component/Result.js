export default function Result({ yearResult, monthResult, dayResult }) {
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

export default function Input({
  children,
  placeholder,
  value,
  error,
  errMsg,
  setValue,
  onFocus,
}) {
  return (
    <label className={`${error ? "label-error" : ""}`}>
      {children}
      <input
        className="no-spinners"
        type="number"
        placeholder={placeholder}
        value={value}
        onFocus={onFocus}
        onChange={(e) => setValue(Number(e.target.value))}
      ></input>
      <span className={`error ${error ? "show" : "hidden"}`}>{errMsg}</span>
    </label>
  );
}

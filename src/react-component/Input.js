export default function Input({
  children,
  placeholder,
  value,
  errMsg,
  setValue,
  onFocus,
}) {
  return (
    <label className={`${errMsg !== "" ? "label-error" : ""}`}>
      {children}
      <input
        className="no-spinners"
        type="number"
        placeholder={placeholder}
        value={value}
        onFocus={onFocus}
        onChange={(e) => setValue(Number(e.target.value))}
      ></input>
      <span className={`error ${errMsg !== "" ? "show" : "hidden"}`}>
        {errMsg}
      </span>
    </label>
  );
}

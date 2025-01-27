//reusable for dropdown
export default function Dropdown(props) {
  const { label, guide, options } = props.field;
  const value = props.value;
  const setValue = props.setValue;

  function handleChange(e) {
    setValue(e.target.value);
  }

  if (props.onChange) {
    props.onChange();
  }

  const optionsComponent = options.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-between mb-2">
        <label className="text-small lg:text-large">
          <b>{label}</b>
        </label>
        <p className="text-gray-500 text-small lg:text-md">
          <i>{guide}</i>
        </p>
      </div>
      <select value={value} onChange={handleChange}>
        {optionsComponent}
      </select>
    </div>
  );
}

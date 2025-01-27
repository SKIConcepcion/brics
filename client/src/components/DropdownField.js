import Select from "react-select";

/*
MULTI-SELECT DROPDOWN FIELD
Accepts 4 props:
    label - field title
    guide - user guide on what to type
    value - value of the field (this is an array since this field is multiselect)
    setValue - adds a new value to the value array when user clicks another option

Functions
    handleChange - this is called when one of the options in the dropdown is clicked. option is added to the array
*/

export default function DropdownField(props) {
    const {label, guide, options} = props.field 
    const value = props.value
    const setValue = props.setValue

    
    const optionsComponent = options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ));

    function handleChange (selectedOption) {
        setValue(selectedOption);
    }

    return (
        
        <div className="flex flex-col w-full">
            <div className="flex flex-row w-full justify-between">
                <label className="lg:text-large text-small">{label}</label>
                <p className="text-gray-500 lg:text-large text-small"><i>{guide}</i></p>
            </div>
            <div className="text-start">
                <Select
                    isMulti
                    value={value}
                    options={options}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}
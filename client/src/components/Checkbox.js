export default function Checkbox(props){
    const {label} = props.field
    const options = props.options
    const value = props.value;
    const setValue = props.setValue;

    const optionsComponent = options.map((option, index) => (
        <div class="flex">
        <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-default-checkbox">
        </input>
        <label for="hs-default-checkbox" class="text-sm text-blue-500 ms-3 dark:text-neutral-400">{label}</label>
      </div>
      
    ));
    return optionsComponent;
}

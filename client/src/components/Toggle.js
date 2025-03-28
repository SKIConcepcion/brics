export default function Toggle(props){
    const {label} = props.field
   // const options = props.options
    const value = props.value;
    const setValue = props.setValue;
    

    return (
      <div className="flex flex-col w-full">
        <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" value ={value} checked={value}  onChange={(e) => {
          setValue(e.target.checked)
          // console.log(e.target.checked)
        }
          } class="sr-only peer" ></input>
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900"></span>
        </label>
      </div>
    )
     
}



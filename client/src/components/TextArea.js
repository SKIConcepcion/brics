export default function TextArea(props) {
    const { label, guide, placeholder, icon, type } = props.field;
    const value = props.value;
    const setValue = props.setValue;

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-row w-full justify-between mb-2">
                <label className="text-small lg:text-large"><b>{label}</b></label>
                <p className="text-gray-500 text-small lg:text-md"><i>{guide}</i></p>
            </div>
            <div className="text-start h-full relative">
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    className={`w-full h-full border rounded-md ${icon ? 'pl-8' : ''} px-3 py-2`} // Adjusted padding for textarea
                    style={{ resize: 'vertical', minHeight: '80px' }} // Allow vertical resizing and set minimum height
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}

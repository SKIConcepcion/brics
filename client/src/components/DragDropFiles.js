import { useRef } from "react"
import DropIcon from "../assets/drag_and_drop.png";

export default function DragDropFiles({ handleDrop, handleUpload, files }) {
    const inputRef = useRef();

    function handleClick(event){
        event.preventDefault();
        inputRef.current.click();
    }

    function handleDrag(event) {
        event.preventDefault();
    }

    return (
        <div className="w-full">
            <div className="w-full rounded-lg border border-dashed border-brics-blue bg-blue-50">
                <div className="p-10 text-center w-full flex flex-col items-center space-y-2"
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <img src={DropIcon} className="size-10" alt="Drag and drop icon" />
                    <input type="file" multiple 
                      onChange={event => handleUpload(event)}                      hidden ref={inputRef} />
                    <p>Drop your files here or <button onClick={handleClick}><b className="text-brics-blue">browse</b></button>.</p>
                    <p className="text-gray-500">Maximum size: 25MB</p>
                </div>
                {
                    files && 
                    <div className="p-2 flex flex-col justify-center">
                        {/* { console.log("i'm here")} */}
                        <div className="text-center">
                            <p>You uploaded:
                            {
                                Array.from(files).map((item, index) => {
                                    return (
                                        <span key={index}> {item.name}</span>
                                    )
                                })
                            }
                            </p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
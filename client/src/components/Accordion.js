import React, { useState } from "react";
import {Plus} from 'lucide-react'
import {Minus} from 'lucide-react'

const Accordion = ({ title, answer, isFirst }) => {
  const [accordionOpen, setAccordionOpen] = useState(isFirst);

  return (
    <div className="py-2">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full"
      >
        <span className="text-xl text-gray-600 lg:text-large ml-5" style={{ fontFamily: 'Satoshi-bold'}}>{title}</span>
        {accordionOpen ? <span><Minus color="gray"/></span> : <span><Plus color="gray"/></span>}
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
            <div className="mt-5 ml-5 mr-20 text-lg text-justify leading-loose text-base font-small" style={{ fontFamily: 'Satoshi-regular'}}>{answer}</div>
        </div>
        
      </div>
    </div>
  );
};

export default Accordion;
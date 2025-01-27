import React from "react";

export default function ReservationStepper({ status }) {
    const totalSteps = 3;

    const getActiveStep = () => {
        switch (status) {
            case "Awaiting Approval":
                return 1;
            case "Pending Payment":
                return 2;
            case "Finalized":
                return 3;
            case "Rejected":
                return 4;
            case "Cancelled":
                return 4;
            default:
                return 1; // Default to first step if status is not recognized
        }
    };

    const activeStep = getActiveStep();
    // Function to render each step based on status
    const renderStep = (stepNumber, title, description) => {
        // Check if the step should be highlighted based on status
        const isActiveStep = status === title;
        const isLastStep = stepNumber < totalSteps;
        
        // Check if the step is before or equal to the active step
        let isPreviousStepActive = stepNumber <= activeStep;
        
        // Disable all previous steps if status is "Rejected"
        if (status === "Rejected" || status === "Rejected") {
            isPreviousStepActive = false;
        }

        return (
            <div class="w-[300px] h-[149.70px] bg-white justify-start items-start gap-[7.27px] inline-flex">
                <div class="grow shrink basis-0 flex-col justify-center items-start gap-[7.27px] inline-flex">
                    <div class="self-stretch justify-start items-center gap-[7.27px] inline-flex">
                        <div class="self-stretch flex-col justify-start items-center gap-[4.54px] inline-flex">
                            <div class={`w-[25.43px] h-[25.43px] rounded-[907.43px] shadow justify-center items-center inline-flex ${isActiveStep ? (status !== "Rejected" ? 'bg-brics-blue text-white' : 'bg-custom-red text-white') : isPreviousStepActive ? 'bg-brics-blue text-white' : 'text-black'}`}>
                                <div class={`text-center text-black text-xl font-medium font-satoshi-regular leading-relaxed tracking-tight ${isActiveStep ? 'text-white' : 'text-gray-100'}`}>{stepNumber}</div>
                            </div>
                        </div>
                        {isLastStep && (<div className={`grow shrink basis-0 ${isActiveStep ? (status !== "Rejected" || status !== "Cancelled" ? 'bg-brics-blue h-[2.91px] text-white' : 'bg-custom-red text-white') : isPreviousStepActive ? 'bg-brics-blue h-[2.91px] text-white' : 'text-black'}`}></div>)}
                        
                    </div>
                    <div class="h-[117px] flex-col justify-start items-start flex">
                        <div class={`text-center text-lg text-left font-bold leading-[45px] ${isActiveStep || isPreviousStepActive ? 'text-gray-800' : 'text-gray-300'}`} style={{ fontFamily: 'Satoshi-regular'}}>{title}</div>
                        <div class={`w-[230px] text-sm text-left font-small leading-normal ${isActiveStep || isPreviousStepActive ? 'text-gray-800' : 'text-gray-300'}`} style={{ fontFamily: 'Satoshi-regular'}}>{description}</div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex justify-between">
            {renderStep(1, "Awaiting Approval", "Your reservation request is awaiting review and approval from the administrator.")}
            {renderStep(2, "Pending Payment", "Your reservation has been approved and is awaiting payment to finalize the booking.")}
            {renderStep(3, "Finalized", "Your reservation is confirmed and finalized after payment.")}
            {renderStep(4, "Rejected", "Your reservation request has been declined by the administrator.")}
        </div>
    );
}

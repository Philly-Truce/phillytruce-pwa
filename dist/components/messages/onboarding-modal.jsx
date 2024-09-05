import React, { useEffect, useState } from "react";
const tutorialContent = [
    "This is the chat interface for Report #3333:Would you like a tutorial on how to navigate this page:Yes",
    "Above the dotted line:Everything above this dotted line represents the conversation between the reporter and Philly Truce bot.:Next",
    "Below the dotted line:Everything below the line represents the conversation that YOU may have with the reporter.:Next",
    "Accessing the Report:By clicking this icon, you will be brought to the Report associated with this Message.:Finish Tutorial",
    "aa:bb:cc",
];
const updateThemeColor = (color) => {
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
        metaThemeColor.setAttribute("content", color);
    }
    else {
        const newMetaThemeColor = document.createElement("meta");
        newMetaThemeColor.name = "theme-color";
        newMetaThemeColor.content = color;
        document.head.appendChild(newMetaThemeColor);
    }
};
const OnboardingModal = ({ step, setOnboardingStep, }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shadowClass, setShadowClass] = useState("");
    const [isNoClicked, setIsNoClicked] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);
    // update the bg theme
    useEffect(() => {
        if (step < 4)
            updateThemeColor("#122c57");
        if (step >= 3 && isVisible === false)
            updateThemeColor("#1c4587");
        if (step === 0 && isNoClicked)
            updateThemeColor("#1c4587");
    }, [isVisible]);
    const handleNext = () => {
        if (step === 3) {
            console.log("hi");
            setIsVisible(false);
            setShadowClass("shadow-none duration-700");
            return;
        }
        if (step === 2) {
            setShadowClass("!visible");
        }
        setOnboardingStep((prevStep) => prevStep + 1);
    };
    const [title, text, buttonName] = tutorialContent[step].split(":");
    return (<>
      {/* Modal */}
      <div id="modal" className={`ease-in-out w-4/5 z-30 fixed ${isVisible && (step === 1 || step === 2) ? "top-[50%]" : "top-[40%]"} ${isVisible && step === 3 ? "top-[200px]" : "top-[40%]"} left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[28px] transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"} ${step === 0
            ? "modal-top"
            : step === 1
                ? "modal-bottom"
                : "modal-top-right"}`}>
        <div id="modal-title-text-wrapper" className="mx-6 mt-6 flex flex-col gap-4">
          <div id="modal-title" className="text-xl font-medium leading-8">
            {title}
          </div>
          <div id="modal-text" className="text-slate-700 text-sm font-normal leading-5 tracking-[0.1px];">
            {text}
          </div>
        </div>
        <div id="modal-button-wrapper" className="p-2 flex justify-end">
          {step === 0 && (<button id="modal-button" className="text-slate-700 text-center text-sm font-medium leading-5 tracking-[0.1px] px-3 py-[10px]" onClick={() => {
                setIsNoClicked(true);
                setIsVisible(false);
                setShadowClass("shadow-none duration-700");
            }}>
              No
            </button>)}
          <button id="modal-button" className="text-[#1C4587] text-sm font-extrabold leading-5 tracking-[0.1px] px-3 py-[10px]" onClick={handleNext}>
            {buttonName}
          </button>
        </div>
      </div>
      {/* Main Overlay */}
      <div id="overlay" className={`fixed w-screen h-screen z-10 transition-opacity duration-700 ${isVisible ? "bg-black opacity-35" : "opacity-0"} ${step < 3 && !isNoClicked && "bg-black inset-0 opacity-35"}`}/>
      {/* Report Spotlight */}
      <div id="document-icon-spotlight" className={`fixed w-14 h-14 z-20 top-2 right-3 transition-shadow invisible shadow-[0_0_0_9999px_rgba(0,0,0,0.35)] ${shadowClass}`}/>
    </>);
};
export default OnboardingModal;
// hitting no
// fixed w-screen h-screen z-10 transition-opacity duration-700 opacity-0 bg-black inset-0 opacity-35
// hitting last step
// fixed w-screen h-screen z-10 transition-opacity duration-700 opacity-0 false

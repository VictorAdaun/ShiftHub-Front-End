import React, {useState} from "react";

const FaqItem = ( faqPart ) =>{

    const [faqOpen, setfaqOpen] = useState(false);


    return (
        <div onClick={()=>{faqOpen ? setfaqOpen(false) : setfaqOpen(true)}} className={`flex p-6 justify-between items-center rounded-md bg-white gap-8 max-h-full cursor-pointer border border-solid border-grayscale-30 mb-4`}>
            <div className="flex flex-col gap-4 w-80">
                <p className="text-grayscale-100">{ faqPart.question? faqPart.question : "To be or not to be?" }</p>
                <p className={faqOpen ? `visible opacity-100 text-grayscale-60` : `hidden opacity-0 text-3xl`}>{ faqPart.answer? faqPart.answer : "Not" }</p>
            </div>

            <div className={faqOpen ? `transition ease-in-out duration-200 rotate-180` : `transition ease-in-out duration-200 rotate-0`}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 13.334L16 21.334L8 13.334L9.86667 11.4673L16 17.6007L22.1333 11.4673L24 13.334Z" fill="black"/>
            </svg>
            </div>
        </div>
    )

}

export default FaqItem;

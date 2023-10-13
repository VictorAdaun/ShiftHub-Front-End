import React, { useEffect } from 'react'

type drawerProps = {
    children: React.ReactNode,
    isOpen: boolean,
    handleClose: () => void
}

function Scheduledrawer(props: drawerProps) {

    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => e.key === "Escape" ? props.handleClose() : null;

        document.body.addEventListener("keydown", closeOnEscapeKey);

        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };

    }, [props.handleClose, props]);

    return (
        <div className="">
            <div onClick={props.handleClose} className={`bg-[#101323] bg-opacity-0 hidden backdrop-blur-5 h-screen w-full fixed left-0 bottom-0 z-[9]  ${props.isOpen ? "!bg-opacity-50 !block" : null}`}>
            </div>

            <div className={`drawer bg-white h-[95%] py-4 w-[30%] fixed right-[20px] top-[15px] transform transition-2 translate-x-full z-[10] rounded-lg  ${props.isOpen ? "!translate-x-0" : null}`}>
                {props.children}
            </div>
        </div>
    );
}
export default Scheduledrawer;

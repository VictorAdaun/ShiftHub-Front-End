import React, {useEffect} from 'react'
import "../styles/modal.scss"

type modalProps = {
    children: React.ReactNode,
    isOpen: boolean,
    handleClose: () => void
}

function Modal(props: modalProps) {

    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => e.key === "Escape" ? props.handleClose() : null;

        document.body.addEventListener("keydown", closeOnEscapeKey);

        return () => {
          document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
      }, [props.handleClose, props]);
    
      if (!props.isOpen) return null;

  return (
    <div className="">
        <div onClick={props.handleClose} className="bg-[#101323] bg-opacity-50 backdrop-blur-5 h-screen w-full fixed left-0 bottom-0 z-[9]">
        </div>

        <div className="modal w-auto py-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10] rounded-lg flex justify-center items-center">
            {props.children}
        </div>
    </div>
  );
}
export default Modal;

/* eslint-disable no-unused-vars */
import { useState, useLayoutEffect, useEffect } from 'react';
import { createPortal } from 'react-dom';

type portalProps = {
    children: React.ReactNode,
    wrapperId?: string
}

type wrapperElementProps = HTMLElement | null


export default function ReactPortal (props: portalProps, { wrapperId = "react-portal-wrapper" }){

  const [wrapperElement, setWrapperElement] = useState<wrapperElementProps>(null);

  useLayoutEffect(() => {
    
    const element = document.getElementById(wrapperId) as HTMLElement;

    setWrapperElement(element);

    console.log(element)

  }, [wrapperId])

  useEffect(() => {
    const element = document.getElementById(wrapperId) as HTMLElement;


    console.log(element)
  }, [])
  

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  return createPortal(props.children, wrapperElement);
}

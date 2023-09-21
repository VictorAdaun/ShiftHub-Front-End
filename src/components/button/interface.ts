import { ReactNode } from "react";

export interface ButtonProps{
    onClick?: () => void,
    className?: string,
    children: ReactNode,
    inverted?: boolean,
    sm?: boolean,
    type?: "button" | "reset" | "submit",
}
import { ButtonProps } from './interface'
import Button from '.'

function SecondaryButton({ onClick, className, children }: ButtonProps) {
    return (
        <Button
            onClick={onClick}
            className={`w-full py-[15px] border border-solid border-grayscale-40 rounded-md font-normal text-sm text-grayscale-100 ${className}`}
        >
            {children}
        </Button>
    )
}

export default SecondaryButton
import Button from ".";
import { ButtonProps } from "./interface";

function PrimaryButton({ onClick, className, children }: ButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`w-full py-[15px] border-none text-white bg-lydia rounded-md text-sm ${className}`}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;

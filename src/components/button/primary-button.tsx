import Button from ".";
import { ButtonProps } from "./interface";

function PrimaryButton({
  onClick,
  className,
  children,
  inverted,
  sm,
  type,
  disabled
 }: ButtonProps) {

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-[15px] border-none text-white bg-lydia rounded-md text-sm ${className} ${inverted ? "!bg-white !text-lydia" : ""} ${sm ? "!py-[8px] !w-1/3" : ""}`}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;

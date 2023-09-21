import Button from ".";
import { ButtonProps } from "./interface";

function PrimaryButton({
  onClick,
  className,
  children,
  inverted,
  sm,
  type,
 }: ButtonProps) {

  return (
    <Button
      type={type}
      onClick={onClick}
      className={`w-full py-[15px] border-none text-white bg-lydia rounded-md text-sm ${className} ${inverted ? "!bg-white !text-lydia" : ""} ${sm ? "!py-[8px] !w-1/3 !text-[10px]" : ""}`}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;

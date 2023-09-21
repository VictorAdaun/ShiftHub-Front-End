import { ButtonProps } from "./interface";

function Button({ onClick, className, children, type }: ButtonProps) {
  return (
    <button onClick={onClick} className={className} type={type}>
      {children}
    </button>
  );
}

export default Button;

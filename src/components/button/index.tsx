import { ButtonProps } from "./interface";

function Button({ onClick, className, children, type, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} className={className} type={type} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;

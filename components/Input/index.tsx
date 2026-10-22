import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = "", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      {...props}
      className={`rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 ${className}`}
    />
  );
});

export default Input;
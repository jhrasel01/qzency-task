"use client";

export default function CustomButton({ children, className, ...props }) {
  return (
    <>
      <button
        {...props}
        className={`text-sm flex items-center gap-2 rounded-md py-2 px-3 ${className}`}
      >
        {children}
      </button>
    </>
  );
}

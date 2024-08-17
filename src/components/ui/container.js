export default function CustomContainer({ children, className }) {
  return (
    <div className={`w-[90%] laptop:w-[1400px] m-auto ${className}`}>
      {children}
    </div>
  );
}

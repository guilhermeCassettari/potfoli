const Button: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className, style }) => {
  return (
    <button
      className={`${className} h-[60px] w-[311px] text-2xl font-medium border border-white`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;

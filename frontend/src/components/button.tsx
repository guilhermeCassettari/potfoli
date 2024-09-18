const Button: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className, style }) => {
  return (
    <button
      className={`${className} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mx-2 rounded-xl	`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;

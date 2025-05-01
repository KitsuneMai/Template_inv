interface CustomButtonProps {
    label: string;
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
  }
  
  export default function CustomButton({
    label,
    size = "md",
    onClick,
    className = "",
    type = "button",
  }: CustomButtonProps) {
    const baseStyle =
      "text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-center mb-2 transition-all duration-200";
  
    const sizeStyles = {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-5 py-2.5",
      lg: "text-lg px-6 py-3",
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseStyle} ${sizeStyles[size]} ${className}`}
      >
        {label}
      </button>
    );
  }
  
import { cn } from "@/lib/utils";

interface ThaiDividerProps {
  className?: string;
  icon?: React.ReactNode;
}

const ThaiDivider = ({ className, icon }: ThaiDividerProps) => {
  return (
    <div className={cn("thai-divider", className)}>
      {icon || (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <path
            d="M20 4L24 12L32 14L26 22L28 32L20 28L12 32L14 22L8 14L16 12L20 4Z"
            fill="currentColor"
            opacity="0.2"
          />
          <path
            d="M20 8L22.5 13.5L28 15L24 20.5L25.5 27L20 24L14.5 27L16 20.5L12 15L17.5 13.5L20 8Z"
            fill="currentColor"
          />
        </svg>
      )}
    </div>
  );
};

export default ThaiDivider;

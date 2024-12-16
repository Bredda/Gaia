import { LoaderCircleIcon, LucideProps } from "lucide-react";
import { Button, ButtonProps } from "../button";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  label: string;
  icon?: React.ReactNode;
  loadingIcon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  iconPosition?: "left" | "right";
}

const LoadingButton = ({
  loading,
  label,
  icon,
  iconPosition,
  ...props
}: LoadingButtonProps) => {
  const finalIconPosition = iconPosition || "left";

  return (
    <Button disabled={loading} {...props}>
      {loading && finalIconPosition === "left" && (
        <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
      )}
      {!loading && finalIconPosition === "left" && icon}
      <span>{label}</span>

      {loading && finalIconPosition === "right" && (
        <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
      )}
      {!loading && finalIconPosition === "right" && icon}
    </Button>
  );
};

export default LoadingButton;

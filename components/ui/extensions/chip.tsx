import { X } from "lucide-react";
import { Button } from "../button";

interface ChipProps {
  label: string;
  onRemove?: () => void;
}

const Chip = ({ label, onRemove }: ChipProps) => {
  return (
    <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900 dark:bg-gray-800 dark:text-gray-50">
      <span>{label}</span>
      {onRemove && (
        <Button
          onClick={onRemove}
          variant="ghost"
          size="icon"
          className="ml-2 -mr-1 rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default Chip;

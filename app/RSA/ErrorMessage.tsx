import { TriangleAlert } from "lucide-react";

interface ErrorMessageProps {
  errorMessage: string;
}

export const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <div className="flex items-center gap-1 text-red-500">
      <TriangleAlert size={20} />
      <p>{errorMessage}</p>
    </div>
  );
};

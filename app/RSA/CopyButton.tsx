import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  textToCopy: string;
}

export const CopyButton = ({ textToCopy }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Erreur lors de la copie :", error);
      });
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 transition-colors duration-300 rounded relative"
      title="Copier le message"
    >
      <div className="relative w-5 h-5">
        <Copy
          className={`absolute inset-0 transition-all duration-500 transform ${
            copied ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
          size={20}
        />
        <Check
          className={`absolute inset-0 text-green-400 transition-all duration-500 transform ${
            copied ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          size={20}
        />
      </div>
    </button>
  );
};

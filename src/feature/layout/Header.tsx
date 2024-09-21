import { ThemeToggle } from "@/src/theme/ThemeToggle";

export const Header = async () => {
  return (
    <header className="flex justify-between items-center pr-8 pl-8 pt-4 pb-4">
      <h2 className="text-2xl font-bold">Decrypto</h2>
      <ThemeToggle />
    </header>
  );
};

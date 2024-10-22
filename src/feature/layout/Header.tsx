import { ThemeToggle } from "@/src/theme/ThemeToggle";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

export const Header = async () => {
  return (
    <header className="flex items-center justify-between p-4 relative">
      <h2 className="text-2xl font-bold">
        <Link href="/" className="flex items-center">
          <LockKeyhole className="text-green-400" size={30} />
          <p className="text-green-400 pl-1">De</p>crypto
        </Link>
      </h2>
      <nav className="absolute left-1/2 transform -translate-x-1/2">
        <ul className="flex space-x-8 font-bold">
          <li>
            <Link href="/RSA">RSA</Link>
          </li>
          <li>
            <Link href="/Affine">Affine</Link>
          </li>
          <li>
            <Link href="/Cesar">César</Link>
          </li>
        </ul>
      </nav>
      <div className="flex">
        <ThemeToggle />
      </div>
    </header>
  );
};

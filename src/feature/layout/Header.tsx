import { ThemeToggle } from "@/src/theme/ThemeToggle";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

export const Header = async () => {
  return (
    <header className="flex justify-between items-center pr-8 pl-8 pt-4 pb-4">
      <h2 className="text-2xl font-bold">
        <Link href={"/"} className="flex">
          <LockKeyhole className="text-green-400" size={30} />
          <p className="text-green-400 pl-1">De</p>crypto
        </Link>
      </h2>
      <nav>
        <ul className="flex space-x-10 font-bold">
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
      <ThemeToggle />
    </header>
  );
};

"use client";

import { EncryptForm } from "./EncryptForm";
import { KeyCreationForm } from "./KeyCreationForm";

export default function Page() {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold text-green-400">RSA</h1>
      <h2 className="font-bold">Chiffrement</h2>
      <KeyCreationForm />
      <EncryptForm />
    </div>
  );
}

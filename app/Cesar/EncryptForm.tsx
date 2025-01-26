import React, { useState } from "react";
import { CopyButton } from "../RSA/CopyButton";

interface EncryptMessageProps {
  message: "";
  key: number | "";
  paquet: number;
}

export const EncryptForm = () => {
  const [encryptedMessage, setEncryptedMessage] = useState<string>("");
  const [formData, setFormData] = useState<EncryptMessageProps>({
    message: "",
    key: "",
    paquet: 1,
  });

  // Fonction qui retourne la position exacte d'une lettre dans l'alphabet. (A=0, ..., Z=25)
  const codex = (c: string) => {
    c = String(c);
    c = c[0].toUpperCase();

    const n = c.charCodeAt(0) - "A".charCodeAt(0);
    if (n > 25 || n < 0) {
      return -1;
    }
    return n;
  };

  const xedoc = (n: number): string => {
    if (isNaN(n)) {
      return "?";
    }
    if (n > 25 || n < 0) {
      return "?";
    }
    return String.fromCharCode(n + "A".charCodeAt(0));
  };

  const CesarEncrypt = (msg: string, key: number, paq: number) => {
    const res: string[] = [];
    msg = msg.replace(/[^A-Za-z]/g, "").toUpperCase();

    for (let i = 0; i < msg.length; i += paq) {
      let numberString = "";

      for (let j = 0; j < paq; j++) {
        const letterIndex = i + j;
        const letterCode =
          letterIndex < msg.length ? codex(msg[letterIndex]) : 0;

        if (letterCode === -1) {
          continue;
        }

        let letterString = letterCode.toString();

        if (letterString.length < 2) {
          letterString = "0" + letterString;
          numberString += letterString;
        } else {
          numberString += letterCode.toString();
        }
      }
      const numberPair = parseInt(numberString, 10);
      const encryptedPair = numberPair + key;
      if (paq > 1) {
        res.push(encryptedPair.toString());
      } else {
        res.push(xedoc(encryptedPair % 26));
      }
    }
    if (paq > 1) {
      return res.join("-");
    } else {
      return res.join("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]:
          name === "key" || name === "paquet"
            ? value === ""
              ? ""
              : Number(value)
            : value,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEncryptedMessage("");
    if (typeof formData.key === "number") {
      setEncryptedMessage(
        CesarEncrypt(formData.message, formData.key, formData.paquet)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col m-10 gap-5">
      <input
        name="message"
        placeholder={"message"}
        value={formData.message}
        type="text"
        pattern="[A-Za-z]+"
        title="Veuillez entrer uniquement des lettres."
        required
        onChange={handleChange}
        className="p-3 bg-background border rounded focus:border-green-400 focus:outline-none focus:outline-offset-0"
      />
      <input
        name="key"
        placeholder={"cle"}
        value={formData.key}
        type="number"
        pattern="[0-9]+"
        title="Veuillez entrer uniquement des nombres."
        required
        onChange={handleChange}
        className="p-3 bg-background border rounded focus:border-green-400 focus:outline-none focus:outline-offset-0"
      />
      <input
        name="paquet"
        placeholder={"paquet"}
        value={formData.paquet}
        type="number"
        pattern="[1-9]+"
        title="Veuillez entrer uniquement des nombres."
        required
        onChange={handleChange}
        className="p-3 bg-background border rounded focus:border-green-400 focus:outline-none focus:outline-offset-0"
      />
      <button
        type="submit"
        className="bg-green-400 p-2 rounded font-bold flex justify-center"
      >
        Chiffrer
      </button>
      {encryptedMessage && (
        <div className="flex flex-col">
          <p className="font-bold mb-1">Message chiffré</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={encryptedMessage}
              readOnly
              className="p-3 bg-background border rounded focus:border-green-400 focus:outline-none focus:outline-offset-0"
            />
            <CopyButton textToCopy={encryptedMessage} />
          </div>
        </div>
      )}
    </form>
  );
};

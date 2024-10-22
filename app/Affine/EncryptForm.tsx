import { useState } from "react";
import { CopyButton } from "../RSA/CopyButton";
import { ErrorMessage } from "../RSA/ErrorMessage";

interface formDataProps {
  a: number | "";
  b: number | "";
  paquet: number;
  message: string;
}

const EncryptForm = () => {
  const [error, setError] = useState<string>("");
  const [encryptedMessage, setEncryptedMessage] = useState<string>("");
  const [formData, setFormData] = useState<formDataProps>({
    a: "",
    b: "",
    paquet: 1,
    message: "",
  });

  // Fonction pour calculer le PGCD entre deux nombres
  function pgcd(a: number, b: number): number {
    if (b === 0) {
      return a;
    }
    return pgcd(b, a % b);
  }

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

  // Fonction qui la lettre de l'aphabet en fonctino du nombre passé en paramètre. (0=A, ..., 25=Z)
  const xedoc = (n: number): string => {
    if (isNaN(n)) {
      return "?";
    }
    if (n > 25 || n < 0) {
      return "?";
    }
    return String.fromCharCode(n + "A".charCodeAt(0));
  };

  // Fonction qui permet de definir la plage des paquets
  const mod2base = (paq: number) => {
    let res = 0;
    for (let i = 0; i < paq; i++) {
      res = 100 * res + 25;
    }
    return res + 1;
  };

  // Fonction pour vérifier que 'a' est valide (c'est-à-dire que PGCD(a, base) = 1)
  const isValidKey = (a: number, paq: number): boolean => {
    console.log(a, paq, "mode=", mod2base(2), pgcd(a, mod2base(paq)));
    return pgcd(a, mod2base(paq)) == 1;
  };

  // Fonction pour chiffrer un message avec la méthode affine par paquets
  const affineEncrypt = (
    msg: string,
    a: number,
    b: number,
    paq: number
  ): string => {
    const base = mod2base(paq);
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
        }
        numberString += letterString;
      }

      const numberPair = parseInt(numberString, 10);
      const encryptedPair = (a * numberPair + b) % base;
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
          name === "a" || name === "b" || name === "paquet"
            ? value === ""
              ? ""
              : Number(value)
            : value,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (typeof formData.a === "number" && typeof formData.b === "number") {
      if (isValidKey(formData.a, formData.paquet)) {
        setEncryptedMessage(
          affineEncrypt(
            formData.message,
            formData.a,
            formData.b,
            formData.paquet
          )
        );
      } else {
        setError(
          formData.a +
            " et " +
            mod2base(formData.paquet) +
            " ne sont pas premiers entre eux"
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col m-10 gap-5">
      <input
        name="a"
        placeholder="a"
        type="number"
        pattern="[0-9]+"
        title="Veuillez entrer uniquement des nombres."
        required
        value={formData.a}
        onChange={handleChange}
        className="p-3 bg-background border rounded focus:border-green-400 focus:outline-none focus:outline-offset-0"
      />
      <input
        name="b"
        placeholder="b"
        type="number"
        pattern="[0-9]+"
        title="Veuillez entrer uniquement des nombres."
        required
        value={formData.b}
        onChange={handleChange}
        className="p-3 bg-background border rounded focus:border-green-400 focus:outline-none focus:outline-offset-0"
      />
      <input
        name="paquet"
        placeholder="paquet"
        type="number"
        pattern="[1-9]+"
        title="Veuillez entrer uniquement des nombres."
        required
        value={formData.paquet}
        onChange={handleChange}
        className="p-3 bg-background border rounded focus:border-green-400 focus:outline-none focus:outline-offset-0"
      />
      <input
        name="message"
        placeholder="message"
        type="text"
        required
        value={formData.message}
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
      {error && <ErrorMessage errorMessage={error} />}
    </form>
  );
};

export default EncryptForm;

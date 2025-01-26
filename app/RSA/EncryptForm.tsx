import { Loader } from "@/components/ui/Loader";
import { useState } from "react";
import { CopyButton } from "./CopyButton";
import { ErrorMessage } from "./ErrorMessage";

interface FormDataProps {
  n: number | "";
  e: number | "";
  message: string;
}

export const EncryptForm = () => {
  const [encryptedMessage, setEncryptedMessage] = useState<string>("");
  const [formData, setFormData] = useState<FormDataProps>({
    n: "",
    e: "",
    message: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fonction pour calculer le PGCD entre deux nombres
  function pgcd(a: number, b: number): number {
    if (b === 0) {
      return a;
    }
    return pgcd(b, a % b);
  }

  // Fonction qui calcule phi(n) en fonction de n
  const calculatePhi = (n: number) => {
    for (let p = 2; p <= Math.sqrt(n); p++) {
      if (n % p === 0) {
        const q = n / p;
        return (p - 1) * (q - 1);
      }
    }
    return 0;
  };

  // Fonction qui permet de definir la plage des paquets
  const mod2base = (paq: number) => {
    let res = 0;
    for (let i = 0; i < paq; i++) {
      res = 100 * res + 25;
    }
    return res + 1;
  };

  // Fonction qui calcule la taille des paquets en fonction de n
  const taille_paquet = (n: number) => {
    let paq = 1;
    let maxIter = 100;
    while (mod2base(paq) <= n && maxIter > 0) {
      paq++;
      maxIter--;
    }
    return paq - 1;
  };

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

  // Fonction qui partage le message en fonction de la taille du paquet. paquet("ABCD", 2) = {0:1, 1:203}
  const paquet = (txt: string, paq: number = 1) => {
    if (paq < 0) {
      return {};
    }

    const res: string[] = [];
    const n = txt.length;
    let i = 0;
    let nb_paq = -1;

    while (i < n) {
      if (i % paq === 0) {
        nb_paq++;
        res.push("");
      }
      const x = codex(txt[i]);
      if (x === -1) {
        return {};
      }
      let xString = x.toString();
      if (xString.length < 2) {
        xString = "0" + xString;
      }
      res[nb_paq] = res[nb_paq] + xString;
      i++;
    }

    while (i % paq !== 0) {
      res[nb_paq] += "00";
      i++;
    }

    const result: { [key: number]: number } = {};
    res.forEach((value, index) => {
      result[index] = parseInt(value, 10);
    });

    return result;
  };

  const expoModRap = (a: number, e: number, n: number) => {
    if (n === 0) {
      throw new Error("Le module ne peut pas être zéro.");
    }
    let result = 1;
    while (e > 0) {
      if (e % 2 === 1) {
        result = (result * a) % n;
      }
      a = (a * a) % n;
      e = Math.floor(e / 2);
    }
    return result;
  };

  const RSAEncrypt = (n: number, e: number, message: string) => {
    const paqSize = taille_paquet(n);
    const paquetages = paquet(message, paqSize);

    const encrypted: string[] = [];
    for (const key in paquetages) {
      if (paquetages.hasOwnProperty(key)) {
        encrypted.push(expoModRap(paquetages[key], e, n).toString());
      }
    }
    if (paqSize > 1) {
      return encrypted.join("-");
    } else {
      return encrypted.join("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]:
          name === "n" || name === "e"
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
    setEncryptedMessage("");
    setIsLoading(true);
    if (
      typeof formData.n === "number" &&
      typeof formData.e === "number" &&
      typeof formData.message === "string"
    ) {
      if (pgcd(calculatePhi(formData.n), formData.e) === 1) {
        setEncryptedMessage(
          RSAEncrypt(formData.n, formData.e, formData.message)
        );
      } else {
        setError(
          formData.n + " et " + formData.e + " ne sont pas premier entre eux"
        );
      }
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col m-10 gap-5">
      <h2 className="font-bold">Chiffrer avec une clé publique</h2>
      <input
        type="number"
        name="n"
        required
        placeholder={"n"}
        value={formData.n}
        onChange={handleChange}
        className="p-3 bg-background border rounded focus:border-green-400 focus:outline-none focus:outline-offset-0"
      />
      <input
        type="number"
        name="e"
        required
        placeholder={"e"}
        value={formData.e}
        onChange={handleChange}
        className="p-3 bg-background border rounded focus:border-green-400 focus:outline-none focus:outline-offset-0"
      />
      <input
        type="text"
        name="message"
        required
        placeholder={"message"}
        value={formData.message}
        onChange={handleChange}
        className="p-3 bg-background border rounded focus:border-green-400 focus:outline-none focus:outline-offset-0"
      />
      <button
        type="submit"
        className="bg-green-400 p-2 rounded font-bold flex justify-center"
      >
        {isLoading ? <Loader size={20} /> : "Chiffrer"}
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

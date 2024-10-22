import { Loader } from "@/components/ui/Loader";
import { useEffect, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";

interface FormDataProps {
  p: number | "";
  q: number | "";
}

export const KeyCreationForm = () => {
  const [n, setN] = useState<number | "">("");
  const [phin, setPhin] = useState<number | "">("");
  const [e, setE] = useState<number | "">("");
  const [formData, setFormData] = useState<FormDataProps>({
    p: "",
    q: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fonction pour calculer le PGCD entre deux nombres
  function pgcd(a: number, b: number): number {
    if (b === 0) {
      return a;
    }
    return pgcd(b, a % b);
  }

  // Focntion qui vérifie si un nombre est premier
  const estPremier = (n: number): boolean => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  };

  // Fonction pour calculer un nombre e premier avec phi(n)
  const calculateE = (phin: number) => {
    for (let e = 2; e < phin; e++) {
      if (pgcd(e, phin) === 1) {
        return e;
      }
    }
    return 0;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value === "" ? "" : Number(value),
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setE("");
    setError("");
    if (typeof formData.p === "number" && typeof formData.q === "number") {
      if (estPremier(formData.p)) {
        if (estPremier(formData.q)) {
          if (phin) {
            setIsLoading(true);
            const eValue = calculateE(phin);
            setIsLoading(false);
            setE(eValue);
          } else {
            setError("Phi(n) ne peut pas être égale à " + phin);
          }
        } else {
          setError(formData.q + " n'est pas un nombre premier");
        }
      } else {
        setError(formData.p + " n'est pas un nombre premier");
      }
    }
  };

  useEffect(() => {
    const { p, q } = formData;
    if (p && q) {
      const nValue = p * q;
      const phinValue = (p - 1) * (q - 1);
      if (!isNaN(nValue)) {
        setN(nValue);
        setPhin(phinValue);
      } else {
        setN("");
        setPhin("");
      }
    } else {
      setN("");
      setPhin("");
    }
  }, [formData]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col m-10 gap-5">
      <h2 className="font-bold">Création d&apos;une clé publique</h2>
      <input
        type="number"
        placeholder={"p"}
        name="p"
        value={formData.p}
        onChange={handleChange}
        className="p-3 bg-background border rounded focus:border-green-400 focus:outline-none focus:outline-offset-0"
      />
      <input
        type="number"
        placeholder={"q"}
        name="q"
        value={formData.q}
        onChange={handleChange}
        className="p-3 bg-background border rounded focus:border-green-400 focus:outline-none focus:outline-offset-0"
      />
      <input
        type="number"
        placeholder={"n"}
        name="n"
        value={n}
        readOnly
        className="p-3 bg-background border rounded focus:border-green-400 focus:outline-none focus:outline-offset-0"
      />
      <input
        type="text"
        placeholder={"phi(n)"}
        name="phi(n)"
        value={phin}
        readOnly
        className="p-3 bg-background border rounded focus:border-green-400 focus:outline-none focus:outline-offset-0"
      />
      <button
        type="submit"
        className="bg-green-400 p-2 rounded font-bold flex justify-center"
      >
        {isLoading ? <Loader size={20} /> : "Trouver e"}
      </button>
      {e && (
        <div className="flex items-center gap-2">
          <p className="font-bold">e =</p>
          <input
            type="number"
            placeholder={"e"}
            value={e}
            readOnly
            className="p-3 bg-background border rounded focus:border-green-400 focus:outline-none focus:outline-offset-0"
          />
        </div>
      )}
      {error && <ErrorMessage errorMessage={error} />}
    </form>
  );
};

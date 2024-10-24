"use client";

import Latex from "react-latex";
import { EncryptForm } from "./EncryptForm";
import { KeyCreationForm } from "./KeyCreationForm";

export default function Page() {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold text-green-400">RSA</h1>
      <h2 className="font-bold">Chiffrement</h2>
      <KeyCreationForm />
      <EncryptForm />
      <div className="flex flex-col items-center p-4 max-w-md">
        <h1 className="text-2xl font-bold text-green-400">
          C&apos;est quoi le protocole RSA ?
        </h1>
        <br />
        <p className="text-justify">
          Le protocole RSA (Rivest, Shamir, Adleman) est l&apos;un des
          algorithmes de chiffrement asymétrique les plus utilisés pour
          sécuriser les échanges de données sur Internet. Contrairement au
          chiffrement symétrique, où une seule clé est utilisée pour chiffrer et
          déchiffrer les messages, RSA repose sur deux clés distinctes : une clé
          publique et une clé privée.
        </p>
        <br />
        <h2 className="text-2xl font-bold text-green-400">
          Principe de chiffrement
        </h2>
        <br />
        <p className="text-justify">
          RSA repose sur des concepts mathématiques liés à la factorisation des
          grands nombres premiers. Le processus commence par la génération de
          deux grands nombres premiers, notés 𝑝 et 𝑞. Ces nombres sont ensuite
          multipliés pour obtenir un nombre 𝑛, qui fait partie de la clé
          publique. La sécurité de RSA repose sur la difficulté de factoriser ce
          produit 𝑛 en ses facteurs premiers.
        </p>
        <br />
        <h2 className="text-2xl font-bold text-green-400">
          Étapes de génération des clés
        </h2>
        <br />
        <ol>
          <li>
            <strong>Choix des nombres premiers</strong> : On choisit deux grands
            nombres premiers 𝑝 et 𝑞.
          </li>
          <br />
          <li>
            <strong>Calcul de 𝑛 : 𝑛 = 𝑝 × 𝑞</strong>, utilisé dans la clé
            publique et privée.
          </li>
          <br />
          <li>
            <strong>Calcul de 𝜙 ( 𝑛 ) : 𝜙 ( 𝑛 ) = ( 𝑝 − 1 ) × ( 𝑞 − 1 )</strong>
            . Ce nombre est essentiel pour la génération de la clé privée.
          </li>
          <br />
          <li>
            <strong>Choix de l&apos;exposant public 𝑒</strong> : On choisit un
            nombre 𝑒 tel que 1 &lt; 𝑒 &lt; 𝜙 ( 𝑛 ) 1&lt;e&lt;ϕ(n) et que 𝑒 soit
            premier avec 𝜙 ( 𝑛 ).
          </li>
          <br />
          <li>
            <strong>Calcul de la clé privée 𝑑</strong> : Le nombre 𝑑 est
            l&apos;inverse modulaire de 𝑒 mod 𝜙 ( 𝑛 ), c&apos;est-à-dire que 𝑑 ×
            𝑒 ≡ 1 mod 𝜙 ( 𝑛 ).
          </li>
        </ol>
        <br />
        <h2 className="text-2xl font-bold text-green-400">
          Chiffrement avec RSA
        </h2>
        <br />
        <p className="text-justify">
          Pour chiffrer un message avec RSA, on utilise la clé publique de la
          personne à qui on souhaite envoyer le message. Cette clé publique est
          composée de deux éléments : 𝑛 et 𝑒. Le message (souvent converti en un
          nombre) est chiffré en appliquant la formule :
        </p>
        <br />
        <p>
          <Latex>{`$C = M^{e}\\mod n$`}</Latex>
        </p>
        <br />
        <p>Où :</p>
        <br />
        <p>𝐶 est le message chiffré</p>
        <p>𝑀 est le message en clair (converti en nombre)</p>
        <p>𝑒 et 𝑛 sont issus de la clé publique.</p>
        <br />
        <h2 className="text-2xl font-bold text-green-400">
          Exemple de chiffrement
        </h2>
        <br />
        <p className="text-justify">
          Dans la pratique la clef de chiffrement, la donnée (n,e) , est appelé
          la clef publique et la clef de déchiffrement, la donnée (n,e−1) est
          appelé la clef privée. Prenons par exemple p=3 et q=11 . Dans ce cas,
          n=33 et φ(33)=20 . Le nombre e=13 est un entier premier à 20 donc
          (33,13) est une clef publique. Chiffrons le message PIKACHU.
        </p>
        <br />
        <table>
          <tbody>
            <tr>
              <td className="px-2 py-2 border-b border-r border-r-black border-b-black">
                Message
              </td>
              <td className="px-2 py-2 border-b border-b-black">P</td>
              <td className="px-2 py-2 border-b border-b-black">I</td>
              <td className="px-2 py-2 border-b border-b-black">K</td>
              <td className="px-2 py-2 border-b border-b-black">A</td>
              <td className="px-2 py-2 border-b border-b-black">C</td>
              <td className="px-2 py-2 border-b border-b-black">H</td>
              <td className="px-2 py-2 border-b border-b-black">U</td>
            </tr>
            <tr>
              <td className="px-2 py-2 border-b border-r border-r-black border-b-black">
                Codage
              </td>
              <td className="px-2 py-2 border-b border-b-black">15</td>
              <td className="px-2 py-2 border-b border-b-black">08</td>
              <td className="px-2 py-2 border-b border-b-black">10</td>
              <td className="px-2 py-2 border-b border-b-black">00</td>
              <td className="px-2 py-2 border-b border-b-black">02</td>
              <td className="px-2 py-2 border-b border-b-black">07</td>
              <td className="px-2 py-2 border-b border-b-black">20</td>
            </tr>
            <tr>
              <td className="px-2 py-2 border-r border-r-black">
                <Latex>{`$x^{13}\\mod 33$`}</Latex>
              </td>
              <td className="px-2 py-2">9</td>
              <td className="px-2 py-2">17</td>
              <td className="px-2 py-2">10</td>
              <td className="px-2 py-2">0</td>
              <td className="px-2 py-2">8</td>
              <td className="px-2 py-2">13</td>
              <td className="px-2 py-2">14</td>
            </tr>
          </tbody>
        </table>
        <br />
        <p>
          Ainsi le message chiffré est <strong>9−17−10−0−8−13−14</strong>{" "}
        </p>
      </div>
    </div>
  );
}

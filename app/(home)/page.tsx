import { LockKeyhole, MoveDown } from "lucide-react";

export default function page() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 h-full relative z-10">
      <div className="flex flex-col lg:block items-center z-20">
        <h1 className="text-3xl lg:text-5xl font-bold flex">
          Avec<p className="text-green-400 pl-3">De</p>crypto, chiffrer
        </h1>
        <h1 className="text-3xl lg:text-5xl font-bold pt-3">
          n&apos;a jamais été aussi
        </h1>
        <h1 className="text-3xl lg:text-5xl font-bold pt-3">SIMPLE</h1>
        <br />
        <h5 className="text-[#A3A3A3] text-xs lg:text-xl">
          Apprenez à chiffrer vos messages et bien plus encore !
        </h5>
      </div>
      <div className="text-[#A3A3A3] font-bold flex flex-col items-center z-20">
        <p className="text-4xl">PASSWORD</p>
        <MoveDown size={80} />
        <LockKeyhole size={80} className="text-green-400" />
        <MoveDown size={80} className="text-green-400" />
        <p className="text-4xl">sdfkhsfbnskdjgns</p>
      </div>

      {/* Div motif avec deux rectangles en bas à gauche */}
      <div className="hidden absolute lg:block bottom-0 left-0 transform -rotate-45 mb-[-50px] ml-[-200px] -z-10">
        {/* Rectangle vert */}
        <div className="relative w-[700px] h-48 rounded-full bg-green-500">
          {/* Rectangle blanc plus petit et décalé vers la droite */}
          <div className="absolute top-20 left-5 w-[600px] h-36 rounded-full bg-[#030317] dark:bg-white"></div>
        </div>
      </div>

      {/* Div motif avec deux rectangles en haut à droite (inversé) */}
      <div className="hidden absolute lg:block top-0 right-0 transform -rotate-45 mt-[-50px] mr-[-200px] -z-10">
        {/* Rectangle vert */}
        <div className="relative w-[700px] h-48 rounded-full bg-green-500">
          {/* Rectangle blanc plus petit et décalé vers la droite */}
          <div className="absolute top-20 left-20 w-[600px] h-36 rounded-full bg-[#030317] dark:bg-white"></div>
        </div>
      </div>
    </div>
  );
}

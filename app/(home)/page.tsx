"use client";

import { LockKeyhole, MoveDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [password, setPassword] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [displayedPassword, setDisplayedPassword] = useState("");
  const [isErasing, setIsErasing] = useState(false);

  const passwordList = ["FFDVFRLPO", "ERQMRXUTHG", "DEOEVMETI", "FYDMYJAEH"];

  useEffect(() => {
    let index = 0;
    const changePassword = () => {
      setIsErasing(true);
      setTimeout(() => {
        setPassword(passwordList[index]);
        index = (index + 1) % passwordList.length;
        setIsErasing(false);
      }, password.length * 100 + 1000);
    };
    const interval = setInterval(changePassword, 5000);
    return () => clearInterval(interval);
  }, [password]);

  useEffect(() => {
    if (isErasing) {
      let currentIndex = password.length;
      const erasingInterval = setInterval(() => {
        if (currentIndex > 0) {
          setDisplayedPassword(password.slice(0, currentIndex - 1));
          currentIndex--;
        } else {
          clearInterval(erasingInterval);
        }
      }, 100);
      return () => clearInterval(erasingInterval);
    } else {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < password.length) {
          setDisplayedPassword(password.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
      return () => clearInterval(typingInterval);
    }
  }, [isErasing, password]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 h-full overflow-hidden relative z-10">
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

      <div className="text-[#A3A3A3] font-bold flex flex-col items-center z-20 w-80">
        <p className="text-4xl">PASSWORD</p>
        <MoveDown size={80} />
        <LockKeyhole size={80} className="text-green-400" />
        <MoveDown size={80} className="text-green-400" />
        <div className="text-4xl flex items-center text-green-400">
          <span>{displayedPassword}</span>
          <span
            className={` ${
              cursorVisible ? "opacity-100" : "opacity-0"
            } transition-opacity duration-500`}
          >
            |
          </span>
        </div>
      </div>

      <div className="hidden absolute lg:block bottom-0 left-0 transform -rotate-45 mb-[-50px] ml-[-200px] -z-10">
        <div className="relative w-[700px] h-48 rounded-full bg-green-500">
          <div className="absolute top-20 left-5 w-[600px] h-36 rounded-full bg-[#030317] dark:bg-white"></div>
        </div>
      </div>

      <div className="hidden absolute lg:block top-0 right-0 transform -rotate-45 mt-[-50px] mr-[-200px] -z-10">
        <div className="relative w-[700px] h-48 rounded-full bg-green-500">
          <div className="absolute top-20 left-20 w-[600px] h-36 rounded-full bg-[#030317] dark:bg-white"></div>
        </div>
      </div>
    </div>
  );
}

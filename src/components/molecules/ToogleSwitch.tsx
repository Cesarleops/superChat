"use client";
import { BiHomeAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

interface Props {
  setUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
  menuState: boolean;
}
const ToogleSwitch = ({ setUserMenu, menuState }: Props) => {
  return (
    <label
      htmlFor="toggle"
      className="bg-black relative w-4/5 h-4/5 rounded-full cursor-pointer"
    >
      <input
        onClick={() => setUserMenu(!menuState)}
        type="checkbox"
        id="toggle"
        className="sr-only peer"
      />
      <BiHomeAlt
        className="absolute text-3xl left-2 w-12 h-9/12  text-black z-10 transition-all duration-500  
          top-2 peer-checked:text-white transition-all duration-500"
      />
      <CgProfile
        className="absolute text-3xl right-1 w-12 h-9/12 text-white transition-all duration-500 
          top-2 peer-checked:text-black z-10 transition-all duration-500  "
      />
      <span
        className="w-2/5 h-5/6 bg-white absolute rounded-full left-1 top-1 
           peer-checked:left-24 transition-all duration-500"
      ></span>
    </label>
  );
};

export default ToogleSwitch;

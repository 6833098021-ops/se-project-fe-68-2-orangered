import Image from "next/image";
import LogoSection from "./LogoSection";
import TopMenuItem from "./TopMenuItem";

export default function TopMenu(){
  return(
    <div className="w-full h-32 border-b-2 border-white flex items-center relative">
      <LogoSection/>
      <div className="w-132 h-full absolute left-1/2 -translate-x-1/2 flex justify-evenly px-3 gap-8 items-center ">
        <TopMenuItem item="Profile" pageRef=""/>
        <TopMenuItem item="Reservation" pageRef=""/>
        <TopMenuItem item="Login" pageRef=""/>
      </div>
    </div>
  )
}
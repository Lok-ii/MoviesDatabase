import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import brandLogo from "../assets/brandLogo.png";
import { RxCrossCircled } from "react-icons/rx";


const Header = () => {
  const [searchHidden, setSearchHidden] = useState(true);
  const hideSearch = () => {
    setSearchHidden((prev) => !prev);
  };
  return (
    <header className="w-full sticky top-0 h-[5rem] flex items-center justify-between px-32 py-4 bg-lightBackground backdrop-blur-sm z-30">
      <div className="logo w-[5rem] h-full">
        <NavLink to={"/"}>
          <img className="w-full h-full" src={brandLogo} alt="" />
        </NavLink>
      </div>
      <nav className="navbar flex items-center gap-8 text-mainText font-semibold">
        <NavLink
          to={"/explore/movie"}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-hoverText" : " hover:text-hoverText transition"
          }
        >
          Movies
        </NavLink>
        <NavLink
          to={"/explore/tv"}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-hoverText" : " hover:text-hoverText transition"
          }
        >
          Tv Shows
        </NavLink>
        <CiSearch onClick={hideSearch} className="cursor-pointer hover:text-hoverText transition" />
        <form
          action=""
          className={`absolute w-full transition-all duration-300 left-0 ${
            searchHidden ? "top-[-4rem]" : "top-20"
          } flex items-center bg-white`}
        >
          <input
            type="text"
            className={`outline-none w-[95%] text-gray-600 h-[3.5rem] px-8`}
            placeholder="Search for a movie or a tv show...."
          />
          <RxCrossCircled className="w-[5%] text-gray-600 cursor-pointer" onClick={hideSearch} />
        </form>
      </nav>
    </header>
  );
};

export default Header;

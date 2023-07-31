"use client";
import Link from "next/link";
import { FaSearch  } from 'react-icons/fa';
type Props = {};

const Header = (props: Props) => {
  return (
    <header className="z-10 absolute top-0 left-0 w-full flex justify-around p-3 bg-main-bg-color/40">
      <h1 className="text-4xl bg-gradient-main text-transparent bg-clip-text">Movie App</h1>
      <div className="flex items-center gap-5">
        <Link href="/movies" className="text-lg">Movies</Link>
        <Link href="/tvshows" className="text-lg">TV Shows</Link>
        <FaSearch className="text-lg cursor-pointer"/>
      </div>
    </header>
  );
};

export default Header;

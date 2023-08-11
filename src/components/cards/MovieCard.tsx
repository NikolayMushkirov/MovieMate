import Image from "next/image";
import CircularRating from "../CircularRating";

import Link from "next/link";

import placeholder from "../../assets/no-poster.png";

import { MovieInfoType } from "@/types/types";
import Genres from "../Genres";

type Props = MovieInfoType;

const MovieCard = ({
  title,
  poster_path,
  vote_average,
  release_date,
  id,
  genre_ids,
}: Props) => {
  const customStyles = {
    backgroundColor: "white",
    textColor: "black",
    textSize: "2.1rem",
    fontWeight: "bold",
    pathColor: vote_average < 5 ? "red" : vote_average < 7 ? "orange" : "green",
  };

  return (
    <Link href={`/details/${id}`}>
      <div className="flex  flex-col   relative">
        <div className="h-[320px]  overflow-hidden">
          <Image
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : placeholder
            }
            width={500}
            height={500}
            alt="Poster"
            loading="lazy"
            className="transition-opacity opacity-0 duration-700"
            onLoadingComplete={(img) => img.classList.remove("opacity-0")}
          />
        </div>

        <div >
          <div className="w-14 relative -top-7 left-2">
            <CircularRating rating={vote_average} customStyles={customStyles} />
          </div>
          <div className="relative -top-4 ">
            <Genres genre_ids={genre_ids} />
          </div>
        </div>

        <div className="justify-self-start">
          <h3 className="text-xl font-bold">{title}</h3>
          <p>{release_date}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
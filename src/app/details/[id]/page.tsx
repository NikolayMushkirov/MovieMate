import Image from "next/image";

import CircularRating from "@/components/CircularRating";

import {
  getMovieCastData,
  getMovieDetailsData,
  getMovieSimilarData,
  getMovieRecommendationsData,
  getMovieVideosData,
} from "@/app/api/getMoviesData";

import { MovieDetailsType } from "@/types/types";
import PlayIcon from "@/components/PlayIcon";
import { CrewType } from "@/types/cast.types";

import TopCast from "./TopCast";
import Similar from "./Similar";
import Recommendations from "./Recommendations";
import Videos from "./Videos";
import Genres from "@/components/Genres";

type Props = {
  params: {
    id: string;
  };
};

const Details = async ({ params: { id } }: Props) => {
  const movieDetailsData = getMovieDetailsData(id);
  const movieCastData = getMovieCastData(id);
  const movieSimilarData = getMovieSimilarData(id);
  const movieRecomendData = getMovieRecommendationsData(id);
  const movieVideosData = getMovieVideosData(id);

  const [movieDetails, movieCast, movieSimilar, movieRecomend, movieVideos] =
    await Promise.all([
      movieDetailsData,
      movieCastData,
      movieSimilarData,
      movieRecomendData,
      movieVideosData,
    ]);

  movieVideos.videos = movieVideos.results;
  delete movieVideos.results;

  const {
    poster_path,
    backdrop_path,
    title,
    tagline,
    vote_average,
    overview,
    release_date,
    status,
    runtime,
    genres,
  }: MovieDetailsType = movieDetails;

  const director = movieCast.crew
    .filter((item: CrewType) => item.job === "Director")
    .map((field: CrewType) => field.name)
    .join(", ");

  const writer = movieCast.crew
    .filter((item: CrewType) => item.job === "Writer")
    .map((field: CrewType) => field.name)
    .join(", ");

  const genresIds = genres && genres.map((genre) => genre.id);

  const customStyles = {
    backgroundColor: "transparent",
    textColor: "white",
    textSize: "2.3rem",
    pathColor: vote_average < 5 ? "red" : vote_average < 7 ? "orange" : "green",
  };

  const bgImage = `https://image.tmdb.org/t/p/original/${backdrop_path}`;

  return (
    <section className=" mt-24 flex flex-col gap-10">
      <div
        className="-z-30 absolute w-full min-h-full  top-0 left-0  bg-cover bg-no-repeat bg-center opacity-50"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      ></div>
      <div className="-z-30 absolute bottom-0 left-0 h-full w-full bg-gradient"></div>
      <div className="flex gap-16">
        <Image
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt="poster"
          width={350}
          height={300}
          className="max-w-[350px] w-full "
          loading="lazy"
        />
        <div className="max-w-2xl flex flex-col justify-between ">
          <div>
            <h3 className="text-4xl mb-1">{title}</h3>
            <h4 className="text-xl text-gray-200 italic">{tagline} </h4>
          </div>
          <Genres genre_ids={genresIds} />
          <div className="flex gap-7">
            <div className="w-20">
              <CircularRating
                rating={vote_average}
                customStyles={customStyles}
              />
            </div>
            <div className="play-icon-box flex items-center gap-5 cursor-pointer  hover:text-sky-300">
              <PlayIcon />
              <span className="text-xl transition-all ease-in-out duration-700">
                Watch Trailer
              </span>
            </div>
          </div>
          <div className="">
            <h3 className="text-2xl mb-1">Overview</h3>
            <p className="text-lg">{overview}</p>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex gap-5">
              <p className="flex items-center gap-3 font-bold text-lg">
                Status:
                <span className="font-normal text-gray-200">{status}</span>
              </p>
              <p className="flex items-center gap-3 font-bold text-lg">
                Release Date:
                <span className="font-normal text-gray-200">
                  {release_date}
                </span>
              </p>
              <p className="flex items-center gap-3 font-bold text-lg">
                Runtime:
                <span className="font-normal text-gray-200">{runtime}</span>
              </p>
            </div>

            <p className="flex items-center gap-3 font-bold text-lg">
              Director:
              <span className="font-normal text-gray-200">{director}</span>
            </p>
            <p className="flex items-center gap-3 font-bold text-lg">
              Writer:
              <span className="font-normal text-gray-200">{writer}</span>
            </p>
          </div>
        </div>
      </div>

      <Videos movieVideos={movieVideos} />
      <TopCast movieCast={movieCast} />
      <Similar movieSimilar={movieSimilar} />
      <Recommendations movieRecomend={movieRecomend} />
    </section>
  );
};

export default Details;
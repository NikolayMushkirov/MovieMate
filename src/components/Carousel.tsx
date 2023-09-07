"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import MovieCard from "@/components/cards/MovieCard";
import ProfileCard from "./cards/ProfileCard";

import { CastType } from "@/types/cast.types";
import { MovieAndTVShowType } from "@/types/movieAndTV.types";

type DataType = MovieAndTVShowType[] | CastType[];
type ContentNameType = "movie" | "cast";

type Props = {
  contentData: DataType;
  contentName: ContentNameType;
  slidesPerView?: number;
};

const checkContentType = (
  data: DataType,
  contentName: ContentNameType
): data is MovieAndTVShowType[] => {
  if (contentName === "movie") {
    return true;
  }
  return false;
};

const Carousel = ({ contentData, contentName, slidesPerView = 5 }: Props) => {
  if (checkContentType(contentData, contentName)) {
    return (
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[]}
      >
        {contentData.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard data={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  } else if (contentName === "cast") {
    return (
      <Swiper
        slidesPerView={5}
        spaceBetween={25}
        pagination={{
          clickable: true,
        }}
        modules={[]}
      >
        {contentData.map((actor) => (
          <SwiperSlide key={actor.id}>
            <ProfileCard
              name={actor.name}
              character={actor.character}
              profile_path={actor.profile_path}
              id={actor.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
};

export default Carousel;

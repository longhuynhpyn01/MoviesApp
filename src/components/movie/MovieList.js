import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import { Navigation, Scrollbar } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

// https://api.themoviedb.org/3/movie/now_playing?api_key=1a3ad44c7b5be7265bf8ab1662cea0b8

const MovieList = ({ type = "now_playing" }) => {
  // const [movies, setMovies] = useState([]);
  // const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);

  // useEffect(() => {
  //   if (data && data.results) setMovies(data.results);
  // }, [data]);

  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const isLoading = !data && !error;
  const movies = data?.results || [];

  return (
    <div className="movie-list">
      {isLoading && (
        <>
          <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
          </Swiper>
        </>
      )}

      {/* grabCursor = true để có thể kéo được 
        spaceBetween là khoảng cách giữa chúng tương đương 40px
        */}
      {!isLoading && (
        <Swiper
          // grabCursor={"true"}
          spaceBetween={40}
          slidesPerView={"auto"}
          modules={[Navigation, Scrollbar]}
          navigation
          scrollbar={{ draggable: true }}
        >
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string.isRequired,
};

function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with this component
    </p>
  );
}

export default withErrorBoundary(MovieList, {
  FallbackComponent,
});

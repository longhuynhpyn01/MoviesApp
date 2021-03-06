import React, { Fragment } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import { Navigation, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

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
        <Fragment>
          <Swiper
            slidesPerView={1}
            modules={[Navigation, Scrollbar]}
            navigation
            scrollbar={{ draggable: true }}
            breakpoints={{
              // when window width is >= 768px
              768: {
                width: 768,
                spaceBetween: 40,
                slidesPerView: 2,
              },
              // when window width is >= 1024px
              1024: {
                width: 1024,
                spaceBetween: 60,
                slidesPerView: 3,
              },
              // when window width is >= 1280px
              1280: {
                width: 1280,
                spaceBetween: 60,
                slidesPerView: "auto",
              },
            }}
          >
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
        </Fragment>
      )}

      {/* grabCursor = true ????? c?? th??? k??o ???????c 
        spaceBetween l?? kho???ng c??ch gi???a ch??ng t????ng ??????ng 40px
        */}
      {!isLoading && (
        <Swiper
          slidesPerView={1}
          modules={[Navigation, Scrollbar]}
          navigation
          scrollbar={{ draggable: true }}
          breakpoints={{
            // when window width is >= 768px
            768: {
              width: 768,
              spaceBetween: 40,
              slidesPerView: 2,
            },
            // when window width is >= 1024px
            1024: {
              width: 1024,
              spaceBetween: 60,
              slidesPerView: 3,
            },
            // when window width is >= 1280px
            1280: {
              width: 1280,
              spaceBetween: 60,
              slidesPerView: "auto",
            },
          }}
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

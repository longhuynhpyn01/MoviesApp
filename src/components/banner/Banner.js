import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import Button from "../button/Button";
import { Navigation, EffectFade, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const Banner = () => {
  const { data, error } = useSWR(tmdbAPI.getMovieList("upcoming"), fetcher);
  const isLoading = !data && !error;
  const movies = data?.results || [];

  return (
    <Fragment>
      {!isLoading && (
        // thêm overflow-hidden để ẩn đi phần thừa khi sử dụng swiper
        <section className="banner h-[400px] md:h-[500px] page-container mb-12 md:mb-20 overflow-hidden">
          {/* không cần thêm thuộc tính spaceBetween khoảng cách giữa 2 slide vì mỗi lần chỉ hiện thị 1 slide */}
          <Swiper
            //grabCursor={"true"}
            slidesPerView={"auto"}
            modules={[Navigation, EffectFade, Autoplay]}
            navigation
            effect={"fade"}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {movies.length > 0 &&
              movies.map((item) => (
                <SwiperSlide key={item.id}>
                  <BannerItem item={item}></BannerItem>
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
      )}
    </Fragment>
  );
};

function BannerItem({ item }) {
  const { title, poster_path, id, genre_ids } = item;
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-full rounded-lg bg-white">
      <div
        className="overlay absolute inset-0 rounded-lg bg-gradient-to-t 
        from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"
      ></div>

      <img
        src={`${tmdbAPI.imageOriginal(poster_path)}`}
        alt=""
        className="w-full h-full object-cover rounded-lg"
        // object-top để thấy mặt nhân vật
      />

      <div className="absolute left-5 bottom-5 w-full text-white pr-5">
        <h2 className="font-bold text-2xl md:text-3xl mt-2 mb-2 md:mt-0 md:mb-8">
          {title}
        </h2>

        <div className="invisible opacity-0 flex items-center gap-x-3 md:mb-8 md:visible md:opacity-100">
          <MovieGenre genre_ids={genre_ids}></MovieGenre>
        </div>

        <Button bgClassName="primary" onClick={() => navigate(`/movie/${id}`)}>
          Watch now
        </Button>
      </div>
    </div>
  );
}

function MovieGenre({ genre_ids }) {
  const { data } = useSWR(tmdbAPI.getMovieGenre(), fetcher);
  const genres = data?.genres || [];

  let genre_names = [];

  genre_ids.forEach((genre_id) => {
    genres.forEach((genre) => {
      if (genre.id === genre_id) {
        genre_names.push(genre.name);
      }
    });
  });

  return (
    <Fragment>
      {genre_names.length > 0 &&
        genre_names.map((item, index) => (
          <span
            className="px-4 py-2 border border-white rounded-md"
            key={index}
          >
            {item}
          </span>
        ))}
    </Fragment>
  );
}
export default Banner;

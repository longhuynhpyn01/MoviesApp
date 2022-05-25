import React from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import { Navigation, Pagination, Scrollbar } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import LoadingSkeleton from "../components/loading/LoadingSkeleton";
import { v4 } from "uuid";

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=1a3ad44c7b5be7265bf8ab1662cea0b8
const MovieDetailsPage = () => {
  // lấy ra movieId đang xem chi tiết
  const { movieId } = useParams();
  // gọi api để fetching data
  const { data, error } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  const isLoading = !data && !error;
  // console.log("Loading: ", isLoading);

  // nhớ thêm đk vì api nhiều lúc sẽ chưa load kịp
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  console.log("data: ", data);

  return (
    <div className="page-container py-10">
      {isLoading && (
        <>
          <div className="relative w-full h-[600px]">
            <LoadingSkeleton
              width="100%"
              height="600px"
              radius="12px"
            ></LoadingSkeleton>
          </div>
          <div className="relative w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] z-10 pb-10">
            <LoadingSkeleton
              width="100%"
              height="100%"
              radius="12px"
            ></LoadingSkeleton>
          </div>
          <h1 className="text-center text-4xl font-bold text-white mb-10 mx-auto">
            <LoadingSkeleton
              width="250px"
              height="40px"
              className="mx-auto  rounded"
            ></LoadingSkeleton>
          </h1>

          <div className="flex items-center justify-center gap-x-5 mb-10">
            <LoadingSkeleton
              width="100px"
              height="40px"
              className="rounded"
            ></LoadingSkeleton>
            <LoadingSkeleton
              width="100px"
              height="40px"
              className="rounded"
            ></LoadingSkeleton>
            <LoadingSkeleton
              width="100px"
              height="40px"
              className="rounded"
            ></LoadingSkeleton>
          </div>

          <p className="text-center text-sm leading-relaxed max-w-[600px] mx-auto mb-10">
            <LoadingSkeleton
              width="600px"
              height="120px"
              className="rounded"
            ></LoadingSkeleton>
          </p>

          <div className="py-10">
            <h2 className="text-center text-3xl mb-10">
              <LoadingSkeleton
                width="100px"
                height="50px"
                className="rounded mx-auto"
              ></LoadingSkeleton>
            </h2>
            <div className="grid grid-cols-4 gap-5">
              {new Array(4).fill(0).map(() => (
                <div className="cast-item" key={v4()}>
                  <LoadingSkeleton
                    width="100%"
                    height="350px"
                    radius="8px"
                    className="mb-3"
                  ></LoadingSkeleton>
                  <h3 className="text-xl font-medium">
                    <h2 className="text-center text-3xl mb-10">
                      <LoadingSkeleton
                        width="100%"
                        height="20px"
                        className="rounded"
                      ></LoadingSkeleton>
                    </h2>
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <div className="py-10">
            <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
            <div className="movie-list">
              <Swiper
                grabCursor={"true"}
                spaceBetween={40}
                slidesPerView={"auto"}
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
            </div>
          </div>
        </>
      )}

      {!isLoading && (
        <>
          <div className="relative lg:w-full lg:h-[600px] invisible opacity-0 lg:visible lg:opacity-100">
            {/* tạo lớp mờ overlay */}
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div
              className="w-full h-full bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
              }}
            ></div>
          </div>

          <div className="relative w-full h-[300px] pb-5 lg:h-[400px] lg:max-w-[800px] lg:-mt-[200px] lg:pb-10 mx-auto z-10">
            <img
              src={tmdbAPI.imageOriginal(poster_path)}
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <h1 className="text-center text-3xl lg:text-5xl font-bold text-white mb-5 lg:mb-10">
            {title}
          </h1>

          <div className="py-10 flex flex-col gap-8">
            <h2 className="text-center text-4xl font-bold">Genres</h2>

            {genres.length > 0 && (
              <div className="flex items-center justify-center gap-x-5 mb-10">
                {genres.map((item) => (
                  <span
                    key={item.id}
                    className="py-2 px-4 border border-primary text-primary rounded"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="py-10">
            <h2 className="text-center text-4xl font-bold mb-10">Storyline</h2>
            <p className="text-center text-sm leading-relaxed max-w-[600px] mx-auto mb-10">
              {overview}
            </p>
          </div>

          <div className="py-10 flex flex-col gap-8">
            <h2 className="text-center text-4xl font-bold">Movie Details</h2>
            <div className="grid grid-cols-4 gap-5"></div>
          </div>

          <MovieMeta type="credits"></MovieMeta>
          <MovieMeta type="videos"></MovieMeta>
          <MovieMeta type="similar"></MovieMeta>
        </>
      )}
    </div>
  );
};

function MovieMeta({ type = "videos" }) {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);
  if (!data) return null;
  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;

    return (
      <div className="py-10">
        <h2 className="text-center text-4xl font-bold mb-10">Casts</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div className="cast-item" key={item.id}>
              <img
                src={tmdbAPI.imageOriginal(item.profile_path)}
                className="w-full h-[350px] object-cover rounded-lg mb-3"
                alt=""
              />
              <h3 className="text-xl font-medium">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === "videos")
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.slice(0, 2).map((item) => (
              <div className="" key={item.id}>
                <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">
                  {item.name}
                </h3>
                <div key={item.id} className="w-full aspect-video">
                  <iframe
                    width="864"
                    height="486"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-fill"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    if (type === "similar")
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
              modules={[Navigation, Pagination, Scrollbar]}
              navigation
              scrollbar={{ draggable: true }}
            >
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
  }
  return null;
}

// hàm xử lí hiển thị thông tin diễn viên
function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);

  if (!data) return null;
  const { cast } = data;

  if (!cast || cast.length <= 0) return null;

  return (
    <div className="py-10">
      <h2 className="text-center text-3xl mb-10">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={tmdbAPI.imageOriginal(item.profile_path)}
              alt=""
              className="w-full h-[350px] object-cover rounded-lg mb-3"
            />
            <h3 className="text-xl font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

// hàm xử lí hiển thị thông tin video trailer
function MovieVideos() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);

  if (!data) return null;
  const { results } = data;

  if (!results && results.length <= 0) return null;

  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 2).map((item) => (
          <div key={item.id} className="">
            <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block rounded-lg">
              {item.name}
            </h3>
            <div key={item.id} className="w-full aspect-video">
              <iframe
                width="900"
                height="506"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-fill"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// hàm hiển thị các bộ phim tương đồng
function MovieSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);

  if (!data) return null;
  const { results } = data;

  if (!results && results.length <= 0) return null;

  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailsPage;

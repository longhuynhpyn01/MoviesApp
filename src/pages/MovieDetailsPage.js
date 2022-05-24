import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import { Navigation, Pagination, Scrollbar } from "swiper";
import ShowMoreText from "react-show-more-text";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import LoadingSkeleton from "../components/loading/LoadingSkeleton";
import { v4 } from "uuid";
import Button from "../components/button/Button";
import PageNotFounded from "../components/404/PageNotFounded";
import ChangePageTitle from "../components/title/ChangePageTitle";

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=1a3ad44c7b5be7265bf8ab1662cea0b8
const MovieDetailsPage = () => {
  // lấy ra movieId đang xem chi tiết
  const { movieId } = useParams();
  // gọi api để fetching data
  const { data, error } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  const isLoading = !data && !error;
  // const location = useLocation();

  // nhớ thêm đk vì api nhiều lúc sẽ chưa load kịp
  if (!data) return null;
  const {
    backdrop_path,
    poster_path,
    title,
    belongs_to_collection,
    release_date,
  } = data;
  console.log("data: ", data);

  if (data?.success === false) {
    return <PageNotFounded></PageNotFounded>;
  }

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
            <div className="absolute inset-0 bg-black opacity-70 rounded-xl"></div>
            <div
              className={`w-full h-full bg-cover bg-no-repeat rounded-xl ${
                !poster_path && !backdrop_path ? "bg-[#fff]" : ""
              }`}
              style={{
                backgroundImage: `url(${
                  backdrop_path
                    ? tmdbAPI.imageOriginal(backdrop_path)
                    : poster_path
                    ? tmdbAPI.imageOriginal(poster_path)
                    : ""
                })`,
              }}
            ></div>
          </div>

          <div className="relative w-full h-[300px] pb-5 lg:h-[400px] lg:max-w-[800px] lg:-mt-[200px] lg:pb-10 mx-auto z-10">
            <img
              src={
                poster_path
                  ? tmdbAPI.imageOriginal(poster_path)
                  : backdrop_path
                  ? tmdbAPI.imageOriginal(backdrop_path)
                  : "/imageNotFound.svg"
              }
              alt=""
              className={`w-full h-full rounded-xl ${
                !poster_path && !backdrop_path ? "bg-[#dbdbdb]" : "object-cover"
              }`}
            />
          </div>

          <h1 className="text-center text-3xl lg:text-5xl font-bold text-white mb-5 lg:mb-10">
            {title}
            {/* {release_date && (
              <span className="opacity-70">
                {new Date(release_date)
                  ? ` (${new Date(release_date).getFullYear()})`
                  : ""}
              </span>
            )} */}
          </h1>

          <MovieDetail data={data}></MovieDetail>
          <MovieMeta type="credits" title={title}></MovieMeta>
          <MovieMeta type="videos" title={title}></MovieMeta>
          <MovieMeta type="images" title={title}></MovieMeta>
          <MovieMeta type="similar" title={title}></MovieMeta>
          <MovieMeta type="recommendations" title={title}></MovieMeta>
          {belongs_to_collection && (
            <MovieCategory
              type="collection"
              belongs_to_collection={belongs_to_collection}
            ></MovieCategory>
          )}
          <MovieMeta type="reviews" title={title}></MovieMeta>
        </>
      )}

      <ChangePageTitle
        pageTitle={
          title +
          "" +
          (new Date(release_date)
            ? ` (${new Date(release_date).getFullYear()})`
            : "") +
          " — The Simple Movies App"
        }
      ></ChangePageTitle>
    </div>
  );
};

function MovieDetail({ data }) {
  const {
    id,
    genres,
    overview,
    runtime,
    release_date,
    vote_average,
    production_companies,
    production_countries,
    original_language,
    status,
    budget,
    revenue,
    tagline,
  } = data;

  if (!data) return null;

  return (
    <>
      <div className="py-10 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-8 bg-slate-800 rounded-xl">
          <div className="p-8 movie-info-left">
            <div className="flex items-center text-lg leading-relaxed opacity-90 mb-5">
              {release_date && (
                <span className="opacity-90" title="Release year">
                  {new Date(release_date)
                    ? `${new Date(release_date).getFullYear()}`
                    : ""}
                </span>
              )}
              <MovieMeta type="release_dates"></MovieMeta>
              {runtime > 0 && (
                <span
                  className="movie-info-runtime opacity-90"
                  title="Running time"
                >
                  {runtime} min
                </span>
              )}
            </div>
            <p className="text-lg leading-relaxed max-w-[600px] mx-auto opacity-70 italic mb-5">
              {tagline}
            </p>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-lg max-w-[600px] mx-auto mb-5">
              {overview
                ? overview
                : "We don't have an overview translated in English. Help us expand our database by adding one."}
            </p>
            <MovieMeta type="keywords"></MovieMeta>
            <div className="mt-10 text-lg">
              <Button className="mr-10">Trailer</Button>
              <Button>Share</Button>
            </div>
          </div>
          <div className="movie-info-right flex flex-col p-8 justify-center">
            <MovieDirector movieId={id}></MovieDirector>
            {production_companies.length > 0 && (
              <div>
                <h2 className="text-lg font-bold leading-loose">
                  Studio:{" "}
                  <span className="text-lg font-normal opacity-70">
                    {production_companies
                      .map((company) => company.name)
                      .join(", ")}
                  </span>
                </h2>
              </div>
            )}
            {genres.length > 0 && (
              <div>
                <h2 className="text-lg font-bold leading-loose">
                  Genre:{" "}
                  <span className="text-lg font-normal opacity-70">
                    {genres.map((genre) => genre.name).join(", ")}
                  </span>
                </h2>
              </div>
            )}
            <div>
              <h2 className="text-lg font-bold leading-loose">
                Running Time:{" "}
                <span className="text-lg font-normal opacity-70">
                  {runtime ? runtime : "0"} min
                </span>
              </h2>
            </div>
            <div>
              <h2 className="text-lg font-bold leading-loose">
                Status:{" "}
                <span className="text-lg font-normal opacity-70">{status}</span>
              </h2>
            </div>
            {release_date && (
              <div>
                <h2 className="text-lg font-bold leading-loose">
                  Release Date:{" "}
                  <span className="text-lg font-normal opacity-70">
                    {new Date(release_date).toLocaleDateString("en-AU", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </h2>
              </div>
            )}
            <div>
              <h2 className="text-lg font-bold leading-loose">
                Rating:{" "}
                <span className="text-lg font-normal opacity-70">
                  {vote_average ? vote_average : "0"}
                </span>
              </h2>
            </div>
            {budget > 0 && (
              <div>
                <h2 className="text-lg font-bold leading-loose">
                  Budget:{" "}
                  <span className="text-lg font-normal opacity-70">
                    {`${new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(budget)}`}
                  </span>
                </h2>
              </div>
            )}
            {revenue > 0 && (
              <div>
                <h2 className="text-lg font-bold leading-loose">
                  Revenue:{" "}
                  <span className="text-lg font-normal opacity-70">
                    {`${new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(revenue)}`}
                  </span>
                </h2>
              </div>
            )}
            <MovieConfiguration
              type="languages"
              attr={original_language}
            ></MovieConfiguration>

            {production_countries.length > 0 && (
              <div>
                <h2 className="text-lg font-bold leading-loose">
                  Country:{" "}
                  <span className="text-lg font-normal opacity-70">
                    {production_countries
                      .map((country) => country.name)
                      .join(", ")}
                  </span>
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function MovieDirector({ movieId }) {
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
  if (!data) return null;
  const { crew } = data;
  if (!crew || crew.length <= 0) return null;

  const directors = crew.filter((item) => item.job === "Director");

  return (
    <div>
      <h2 className="text-lg font-bold leading-loose">
        Director:{" "}
        {directors.length > 0 && (
          <span className="text-lg font-normal opacity-70">
            {directors.map((item) => item.name).join(", ")}
          </span>
        )}
      </h2>
    </div>
  );
}

function MovieConfiguration({ type, attr }) {
  const { data } = useSWR(tmdbAPI.getAPIConfiguration(type), fetcher);
  if (!data) return null;

  if (type === "languages") {
    const language = data.find((item) => item.iso_639_1 === attr);

    return (
      <div>
        <h2 className="text-lg font-bold leading-loose">
          Language:{" "}
          <span className="text-lg font-normal opacity-70">
            {language.english_name}
          </span>
        </h2>
      </div>
    );
  }

  return null;
}

function MovieCategory({ type = "collection", belongs_to_collection }) {
  const { data } = useSWR(
    tmdbAPI.getMovieCategory(belongs_to_collection.id, type),
    fetcher
  );

  if (!data) return null;

  if (type === "collection") {
    const { name, parts } = data;
    if (!parts || parts.length <= 0) return null;

    return (
      <div className="py-10">
        <h2 className="text-3xl font-medium mb-10">{name}</h2>
        <div className="movie-list">
          <Swiper
            spaceBetween={40}
            slidesPerView={"auto"}
            modules={[Navigation, Pagination, Scrollbar]}
            navigation
            scrollbar={{ draggable: true }}
          >
            {parts.length > 0 &&
              parts.map((item) => (
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

function MovieMeta({ type = "videos", title = "" }) {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);
  const navigate = useNavigate();

  if (!data) return null;

  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;

    return (
      <div className="py-10">
        <h2 className="text-3xl font-medium mb-10">Cast</h2>
        <div className="movie-list">
          <Swiper
            spaceBetween={40}
            slidesPerView={"auto"}
            modules={[Navigation, Scrollbar]}
            navigation
            scrollbar={{ draggable: true }}
          >
            {cast.map((item) => (
              <SwiperSlide key={item.cast_id}>
                <div className="cast-item">
                  <img
                    src={
                      item.profile_path
                        ? tmdbAPI.imageOriginal(item.profile_path)
                        : item.gender === 1
                        ? "/female.svg"
                        : "/male.svg"
                    }
                    className={`w-full h-[350px] object-cover rounded-lg mb-3 cursor-pointer ${
                      item.profile_path ? "" : "bg-[#dbdbdb]"
                    }`}
                    alt=""
                    onClick={() => navigate(`/cast/${item.id}`)}
                    title={item.name}
                  />
                  <h3
                    className="text-xl font-medium cursor-pointer"
                    onClick={() => navigate(`/cast/${item.id}`)}
                    title={item.name}
                  >
                    {item.name}
                  </h3>
                  <h3 className="text-base font-light opacity-50">
                    {item.character}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  } else if (type === "images") {
    const { backdrops, posters } = data;

    if (
      (!backdrops || backdrops.length < 0) &&
      (!posters || posters.length < 0)
    )
      return null;
    return (
      <>
        {backdrops.length > 0 && (
          <div className="py-10">
            <h2 className="text-3xl font-medium mb-10">Backdrops</h2>
            <div className="backdrop-list">
              <Swiper
                spaceBetween={40}
                slidesPerView={"auto"}
                modules={[Navigation, Scrollbar]}
                navigation
                scrollbar={{ draggable: true }}
              >
                {backdrops.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="backdrop-item w-full aspect-video">
                      <img
                        src={
                          item.file_path
                            ? tmdbAPI.imageOriginal(item.file_path)
                            : "/imageNotFound.svg"
                        }
                        className={`w-full h-full object-cover rounded-lg ${
                          item.file_path ? "" : "bg-[#dbdbdb]"
                        }`}
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
        {backdrops.length > 0 && (
          <div className="py-10">
            <h2 className="text-3xl font-medium mb-10">Posters</h2>
            <div className="poster-list">
              <Swiper
                spaceBetween={40}
                slidesPerView={"auto"}
                modules={[Navigation, Scrollbar]}
                navigation
                scrollbar={{ draggable: true }}
              >
                {posters.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="poster-item w-full aspect-[2/3]">
                      <img
                        src={
                          item.file_path
                            ? tmdbAPI.imageOriginal(item.file_path)
                            : "/imageNotFound.svg"
                        }
                        className={`w-full h-full object-cover rounded-lg ${
                          item.file_path ? "" : "bg-[#dbdbdb]"
                        }`}
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </>
    );
  } else if (type === "keywords") {
    if (data?.success === false) {
      return null;
    }

    const { keywords } = data;
    if (!keywords || keywords.length <= 0) return null;

    return (
      <div className="text-lg flex items-center gap-3 flex-wrap mb-5">
        {keywords.slice(0, 5).map((item) => (
          <span
            className="px-4 py-2 border border-white rounded-md hover:bg-slate-600"
            title="Keyword"
            key={item.id}
          >
            {item.name}
          </span>
        ))}
      </div>
    );
  } else {
    const { results } = data;

    if (type === "videos") {
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Videos</h2>
          {results.length > 0 && (
            <div className="video-list">
              <Swiper
                spaceBetween={40}
                slidesPerView={"auto"}
                modules={[Navigation, Scrollbar]}
                navigation
                scrollbar={{ draggable: true }}
              >
                {results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="video-item w-full">
                      <div className="w-full aspect-video">
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
                      <h3 className="text-xl font-medium">{item.name}</h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {results.length <= 0 && (
            <div className="text-center text-lg font-medium">
              {`We don't have any videos for "${title}".`}
            </div>
          )}
        </div>
      );
    }
    if (type === "similar") {
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
          {results.length > 0 && (
            <div className="movie-list">
              <Swiper
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
          )}
          {results.length <= 0 && (
            <div className="text-center text-lg font-medium">
              {`We don't have any similar movies for "${title}".`}
            </div>
          )}
        </div>
      );
    }
    if (type === "recommendations") {
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Recommendations</h2>
          {results.length > 0 && (
            <div className="movie-list">
              <Swiper
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
          )}
          {results.length <= 0 && (
            <div className="text-center text-lg font-medium">
              {`We don't have any recommendations for "${title}".`}
            </div>
          )}
        </div>
      );
    }
    if (type === "release_dates") {
      const certificationUS = results.find((item) => item.iso_3166_1 === "US");
      let countryCert = "US";
      let isFound = false;
      let cert = "";
      if (certificationUS) {
        cert = certificationUS.release_dates.find((item, index) => {
          return item.certification !== "";
        });

        if (typeof cert !== "undefined") {
          cert = cert.certification;
          isFound = true;
        }
      }

      if (isFound === false) {
        const certifications = results.filter((item) =>
          item.release_dates.find((itemDate) => itemDate.certification !== "")
        );

        if (certifications.length > 0) {
          cert = certifications.find((item) =>
            item.release_dates.find((itemDate) => itemDate.certification !== "")
          );
          if (typeof cert === "undefined") return null;
          countryCert = cert.iso_3166_1;
          cert = cert.release_dates[0].certification;
        } else {
          return null;
        }
      }

      return (
        <>
          <span
            className="movie-info-certification text-white opacity-90"
            title={`Motion Picture Rating (MPAA) in ${countryCert}`}
          >
            {cert}
          </span>
        </>
      );
    }
    if (type === "reviews") {
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Reviews</h2>
          <div className="review-list">
            {results.length > 0 &&
              results.map((item) => (
                <div
                  key={item.id}
                  className="review-item flex bg-slate-700 rounded-xl p-4 mb-4"
                >
                  <img
                    src={
                      item.author_details.avatar_path === null
                        ? "/imageNotFound.svg"
                        : item.author_details.avatar_path.includes(
                            "https://www.gravatar.com/avatar"
                          )
                        ? item.author_details.avatar_path.slice(
                            item.author_details.avatar_path.indexOf(
                              "https://www.gravatar.com/avatar"
                            )
                          )
                        : tmdbAPI.imageOriginal(item.author_details.avatar_path)
                    }
                    className={`review-avatar max-w-full w-[52px] h-[52px] object-cover rounded-full flex-shrink-0 ${
                      item.author_details.avatar_path === null ? "bg-white" : ""
                    }`}
                    alt=""
                  />
                  <div className="review-info flex-1 pl-6">
                    <div className="review-top flex items-center mb-1">
                      <h3 className="review-name text-xl font-bold flex-1">
                        {item.author}
                      </h3>
                      {item.author_details.rating && (
                        <div className="review-rating inline-flex items-center rounded-lg bg-primary ml-4 px-2 min-w-[52px] shrink-0">
                          <span className="mr-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </span>
                          <span>{item.author_details.rating}</span>
                        </div>
                      )}
                    </div>
                    <div className="review-time flex items-center opacity-80 text-base font-light mb-2">
                      {item.created_at && (
                        <>
                          <span className="mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span>
                            {new Date(item.created_at).toLocaleDateString(
                              "en-AU",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </>
                      )}
                    </div>
                    <ShowMoreText
                      /* Default options */
                      lines={3}
                      more="Show more"
                      less="Show less"
                      className="content-css"
                      anchorClass="my-anchor-css-class"
                      expanded={false}
                      // width={600}
                      truncatedEndingComponent={"... "}
                    >
                      <span className="review-comment text-lg font-normal">
                        {item.content}
                      </span>
                    </ShowMoreText>
                  </div>
                </div>
              ))}
            {results.length <= 0 && (
              <div className="text-center text-lg font-medium">
                {`We don't have any reviews for "${title}".`}
              </div>
            )}
          </div>
        </div>
      );
    }
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

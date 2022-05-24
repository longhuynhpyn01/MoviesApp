import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import PageNotFounded from "../components/404/PageNotFounded";
import ChangePageTitle from "../components/title/ChangePageTitle";
import { fetcher, tmdbAPI } from "../config";
import ShowMoreText from "react-show-more-text";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { v4 } from "uuid";

const CastDetailsPage = () => {
  const { castId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getPersonDetails(castId), fetcher);

  const isLoading = !data && !error;
  if (!data) return null;

  if (data?.success === false) {
    return <PageNotFounded></PageNotFounded>;
  }

  console.log("data cast: ", data);
  const {
    biography,
    birthday,
    deathday,
    gender,
    known_for_department,
    name,
    place_of_birth,
    profile_path,
    also_known_as,
  } = data;

  return (
    <>
      <div className="page-container py-10">
        <div className="flex gap-8 mb-10">
          <img
            src={
              profile_path
                ? tmdbAPI.imageOriginal(profile_path)
                : gender === 1
                ? "/female.svg"
                : "/male.svg"
            }
            className={`w-[350px] h-[350px] object-cover rounded-full flex-shrink-0 ${
              profile_path ? "" : "bg-[#dbdbdb]"
            }`}
            alt=""
          />
          <div className="lg:mx-8 mb-5">
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-5 lg:mb-10">
              {name}
            </h1>
            <h2 className="text-2xl font-bold mb-4">Biography</h2>
            <ShowMoreText
              /* Default options */
              lines={8}
              more="Show more"
              less="Show less"
              className="content-css"
              anchorClass="my-anchor-css-class"
              expanded={false}
              // width={600}
              truncatedEndingComponent={"... "}
            >
              <p className="text-lg mx-auto mb-5">
                {biography
                  ? biography
                  : `We don't have a biography for ${name}.`}
              </p>
            </ShowMoreText>
          </div>
        </div>

        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Personal Details</h2>
          <div className="personal-detail">
            <div>
              <h2 className="text-lg font-bold leading-loose">
                Known For:{" "}
                <span className="text-lg font-normal opacity-80">
                  {known_for_department}
                </span>
              </h2>
            </div>

            <CastMeta type="movie_credits" meta="number_credits"></CastMeta>

            <div>
              <h2 className="text-lg font-bold leading-loose">
                Gender:{" "}
                <span className="text-lg font-normal opacity-80">
                  {gender === 2 ? "Male" : gender === 1 ? "Female" : "Unknown"}
                </span>
              </h2>
            </div>
            <CastInfoDay
              type="birthday"
              birthday={birthday}
              deathday={deathday}
            ></CastInfoDay>
            <CastInfoDay
              type="deathday"
              birthday={birthday}
              deathday={deathday}
            ></CastInfoDay>
            {place_of_birth && (
              <div>
                <h2 className="text-lg font-bold leading-loose">
                  Place of Birth:{" "}
                  <span className="text-lg font-normal opacity-80">
                    {place_of_birth}
                  </span>
                </h2>
              </div>
            )}
            {also_known_as.length > 0 && (
              <div>
                <h2 className="text-lg font-bold leading-loose">
                  Also Known As:{" "}
                  <span className="text-lg font-normal opacity-80">
                    {also_known_as.map((item) => item).join(" | ")}
                  </span>
                </h2>
              </div>
            )}
            <CastMeta type="external_ids" meta=""></CastMeta>
          </div>
        </div>
        <CastMeta type="movie_credits" meta="movies"></CastMeta>
        <CastMeta type="images" meta=""></CastMeta>
        <CastMeta type="movie_credits" meta="filmography"></CastMeta>
        <ChangePageTitle
          pageTitle={`${name} — The Simple Movies App`}
        ></ChangePageTitle>
      </div>
    </>
  );
};

function CastInfoDay({ type, birthday, deathday }) {
  let day = new Date(deathday);
  let birthDay = new Date(birthday);

  if (!deathday) {
    day = new Date();
  }

  let ageInMilliseconds = new Date(day) - new Date(birthDay);
  let years = Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365);

  if (type === "birthday") {
    return (
      <div>
        <h2 className="text-lg font-bold leading-loose">
          Birthday:{" "}
          <span className="text-lg font-normal opacity-80">
            {birthday &&
              deathday &&
              birthDay.toLocaleDateString("en-AU", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            {birthday &&
              !deathday &&
              birthDay.toLocaleDateString("en-AU", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }) +
                " (" +
                years +
                " years old)"}
            {!birthday && "Unknown"}
          </span>
        </h2>
      </div>
    );
  } else if (type === "deathday") {
    return (
      <>
        {deathday && (
          <div>
            <h2 className="text-lg font-bold leading-loose">
              Day of Death:{" "}
              <span className="text-lg font-normal opacity-80">
                {day.toLocaleDateString("en-AU", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }) +
                  " (" +
                  years +
                  " years old)"}
              </span>
            </h2>
          </div>
        )}
      </>
    );
  }
}

function CastMeta({ type = "movie_credits", meta = "movies" }) {
  const { castId } = useParams();
  const { data } = useSWR(tmdbAPI.getPersonMeta(castId, type), fetcher);
  const navigate = useNavigate();

  if (!data) return null;

  if (type === "movie_credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;

    if (meta === "number_credits") {
      const { crew } = data;

      if ((!cast || cast.length <= 0) && (!crew || crew.length <= 0))
        return null;

      return (
        <div>
          <h2 className="text-lg font-bold leading-loose">
            Known Credits:{" "}
            <span className="text-lg font-normal opacity-80">
              {cast.length + crew.length}
            </span>
          </h2>
        </div>
      );
    }

    if (meta === "movies") {
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Known For</h2>
          <div className="movie-list">
            <Swiper
              spaceBetween={40}
              slidesPerView={"auto"}
              modules={[Navigation, Scrollbar]}
              navigation
              scrollbar={{ draggable: true }}
            >
              {cast.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="cast-item">
                    <img
                      src={
                        item.poster_path
                          ? tmdbAPI.imageOriginal(item.poster_path)
                          : "/imageNotFound.svg"
                      }
                      className={`w-full h-[350px] object-cover rounded-lg mb-3 cursor-pointer ${
                        item.poster_path ? "" : "bg-[#dbdbdb]"
                      }`}
                      alt=""
                      onClick={() => navigate(`/movie/${item.id}`)}
                      title={item.title}
                    />
                    <h3
                      className="text-xl font-medium cursor-pointer"
                      onClick={() => navigate(`/movie/${item.id}`)}
                      title={item.title}
                    >
                      {item.title}
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
    }

    if (meta === "filmography") {
      const { crew } = data;
      if ((!cast || cast.length <= 0) && (!crew || crew.length <= 0))
        return null;

      let newCast = [...cast];
      let newCrew = [...crew];
      let filmographys = [];
      let jobs = [];

      newCrew.forEach((item) => {
        if (jobs.indexOf(item.department) === -1) {
          jobs.push(item.department);
        }
      });

      newCast = newCast.sort((a, b) => {
        let yearB = new Date(b.release_date).getFullYear();
        let yearA = new Date(a.release_date).getFullYear();

        if (b.release_date === "" || typeof b.release_date === "undefined") {
          yearB = Infinity;
        }

        if (a.release_date === "" || typeof a.release_date === "undefined") {
          yearA = Infinity;
        }

        if (
          (a.release_date === "" || typeof a.release_date === "undefined") &&
          (b.release_date === "" || typeof b.release_date === "undefined")
        )
          return 0;

        return yearB - yearA;
      });

      newCrew = newCrew.sort((a, b) => {
        let yearB = new Date(b.release_date).getTime();
        let yearA = new Date(a.release_date).getTime();

        if (b.release_date === "" || typeof b.release_date === "undefined") {
          yearB = Infinity;
        }

        if (a.release_date === "" || typeof a.release_date === "undefined") {
          yearA = Infinity;
        }

        if (
          (a.release_date === "" || typeof a.release_date === "undefined") &&
          (b.release_date === "" || typeof b.release_date === "undefined")
        )
          return 0;

        return yearB - yearA;
      });

      filmographys.push({
        job: "Acting",
        credits: newCast,
      });

      jobs.forEach((job) => {
        let credits = [];
        newCrew.forEach((item) => {
          if (job === item.department) {
            credits.push(item);
          }
        });
        filmographys.push({
          job,
          credits,
        });
      });

      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Filmography</h2>
          <div className="department-list">
            {filmographys.length > 0 &&
              filmographys.map((filmography) => (
                <Filmography filmography={filmography} key={v4()}></Filmography>
              ))}
          </div>
        </div>
      );
    }
  } else if (type === "external_ids") {
    const { facebook_id, twitter_id, instagram_id } = data;
    const handleClick = (url) => {
      window.open(url);
    };

    if (!facebook_id && !twitter_id && !instagram_id) {
      return null;
    }

    return (
      <div>
        <h2 className="text-lg font-bold leading-loose flex items-center">
          <span>Social Media: </span>
          <span className="inline-flex gap-x-4 items-center ml-4 text-lg font-normal">
            {facebook_id && (
              <span
                className="text-3xl p-1 cursor-pointer hover:opacity-60"
                title="Visit Facebook"
                onClick={() =>
                  handleClick(`https://www.facebook.com/${facebook_id}`)
                }
              >
                <i className="fa fa-facebook-official" aria-hidden="true"></i>
              </span>
            )}
            {twitter_id && (
              <span
                className="text-3xl p-1 cursor-pointer hover:opacity-60"
                title="Visit Twitter"
                onClick={() => handleClick(`https://twitter.com/${twitter_id}`)}
              >
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </span>
            )}
            {instagram_id && (
              <span
                className="text-3xl p-1 cursor-pointer hover:opacity-60"
                title="Visit Instagram"
                onClick={() =>
                  handleClick(`https://www.instagram.com/${instagram_id}`)
                }
              >
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </span>
            )}
          </span>
        </h2>
      </div>
    );
  } else if (type === "images") {
    const { profiles } = data;
    if (!profiles || profiles.length <= 0) return null;

    return (
      <div className="py-10">
        <h2 className="text-3xl font-medium mb-10">Photos</h2>
        <div className="poster-list">
          <Swiper
            spaceBetween={40}
            slidesPerView={"auto"}
            modules={[Navigation, Scrollbar]}
            navigation
            scrollbar={{ draggable: true }}
          >
            {profiles.map((item, index) => (
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
    );
  }
}

function Filmography({ filmography }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <div className="department-item">
      <div
        className="department-info flex justify-between text-xl font-bold py-5 border-t-2 border-[#eee] cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <div className="department-info-left">
          <span className="department-job">{filmography.job}</span>
          <span className="department-credit opacity-70">
            {filmography.credits.length}{" "}
            {filmography.credits.length > 1 ? " Credits" : " Credit"}
          </span>
        </div>
        {!show && (
          <span className="department-state flex-shrink-0 flex items-center opacity-80">
            Show{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        )}
        {show && (
          <span className="department-state flex-shrink-0 flex items-center opacity-80">
            Hide{""}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </span>
        )}
      </div>
      <div className={`department-content mb-5 ${show ? "" : "hidden"}`}>
        <table className="p-4">
          <tbody className="flex flex-col gap-4">
            {filmography.credits.map((item, index) => (
              <tr className="flex gap-8 text-lg font-medium" key={index}>
                <td className="department-year text-center w-[50px] flex-shrink-0">
                  {item.release_date
                    ? new Date(item.release_date).getFullYear()
                    : "—"}
                </td>
                <td className="department-movie flex-1">
                  <span
                    className="opacity-90 cursor-pointer"
                    title={item.title}
                    onClick={() => navigate(`/movie/${item.id}`)}
                  >
                    {item.title}
                  </span>
                  {item.character && (
                    <span className="department-character opacity-70">
                      as {item.character}
                    </span>
                  )}
                  {item.job && (
                    <span className="department-job opacity-70">
                      {" "}
                      ... {item.job}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CastDetailsPage;

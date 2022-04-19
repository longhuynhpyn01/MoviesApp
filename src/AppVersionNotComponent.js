import { Fragment } from "react";
import { NavLink } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-5">
        <span className="text-primary">Home</span>
        <span>Movies</span>
      </header>

      <section className="banner h-[500px] page-container mb-20">
        <div className="w-full h-full rounded-lg relative bg-white">
          <div
            className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] 
          rounded-lg"
          ></div>

          <img
            src="http://genk.mediacdn.vn/2019/8/20/1-15662898065871774855253.jpg"
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />

          <div className="absolute left-5 bottom-5 w-full text-white">
            <h2 className="font-bold text-3xl mb-3">Avengers: Endgame</h2>

            <div className="flex items-center gap-x-3 mb-8">
              <span className="px-4 py-2 border border-white rounded-md">
                Action
              </span>
              <span className="px-4 py-2 border border-white rounded-md">
                Adventure
              </span>
              <span className="px-4 py-2 border border-white rounded-md">
                Drama
              </span>
            </div>

            <button className="py-3 px-6 rounded-lg bg-primary text-white font-medium">
              Watch Now
            </button>
          </div>
        </div>
      </section>

      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Now playing
        </h2>
        <div className="movie-list grid grid-cols-4 gap-10">
          <div className="movie-card rounded-lg p-3 bg-slate-800 text-white">
            <img
              src="http://genk.mediacdn.vn/2019/8/20/1-15662898065871774855253.jpg"
              alt=""
              className="w-full h-[250px] object-cover rounded-lg mb-5"
            />

            <h3 className="text-xl font-bold mb-3">Spiderman: Homecoming</h3>

            <div className="flex items-center justify-between text-sm opacity-50 mb-10">
              <span>2017</span>
              <span>7.4</span>
            </div>

            <button className="py-3 px-6 rounded-lg capitalize bg-primary w-full">
              Watch Now
            </button>
          </div>
        </div>
      </section>

      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Top rated
        </h2>
        <div className="movie-list grid grid-cols-4 gap-10">
          <div className="movie-card rounded-lg p-3 bg-slate-800 text-white">
            <img
              src="http://genk.mediacdn.vn/2019/8/20/1-15662898065871774855253.jpg"
              alt=""
              className="w-full h-[250px] object-cover rounded-lg mb-5"
            />

            <h3 className="text-xl font-bold mb-3">Spiderman: Homecoming</h3>

            <div className="flex items-center justify-between text-sm opacity-50 mb-10">
              <span>2017</span>
              <span>7.4</span>
            </div>

            <button className="py-3 px-6 rounded-lg capitalize bg-primary w-full">
              Watch Now
            </button>
          </div>
        </div>
      </section>

      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Trending
        </h2>
        <div className="movie-list grid grid-cols-4 gap-10">
          <div className="movie-card rounded-lg p-3 bg-slate-800 text-white">
            <img
              src="http://genk.mediacdn.vn/2019/8/20/1-15662898065871774855253.jpg"
              alt=""
              className="w-full h-[250px] object-cover rounded-lg mb-5"
            />

            <h3 className="text-xl font-bold mb-3">Spiderman: Homecoming</h3>

            <div className="flex items-center justify-between text-sm opacity-50 mb-10">
              <span>2017</span>
              <span>7.4</span>
            </div>

            <button className="py-3 px-6 rounded-lg capitalize bg-primary w-full">
              Watch Now
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default App;

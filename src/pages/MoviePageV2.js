import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";
import useSWRInfinite from "swr/infinite";
import Button from "../components/button/Button";
import ChangePageTitle from "../components/title/ChangePageTitle";

// const pageCount = 5;
const itemsPerPage = 20; // số lượng phim ở 1 phân trang là 20

const MoviePageV2 = () => {
  const [pageCount, setPageCount] = useState(0); // tổng số trang - chính là totalPages
  const [itemOffset, setItemOffset] = useState(0); // lưu vị trí xuất hiện bộ phim của trang. Ví dụ tại trang 4 thì bắt đầu từ vị trí 60

  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
  const filterDebounce = useDebounce(filter, 500);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // ========= khu vực xử lí load more ========

  // size là số lượng item đang load
  // vị vậy nếu page = 2 thì data sẽ lưu mảng có 2 giá trị 2 data tương ứng với 2 page
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );

  // console.log("data: ", data); //  [{…}, {…}]

  // lúc này data không còn dữ liệu tại mỗi page nhất định mà là tổng số results, vd tại page 3 thì có 60 results
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  const loading = !data && !error; // trạng thái đang load
  const isEmpty = data?.[0]?.results.length === 0;

  // biến kiểm tra đã load hết chưa
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);

  //console.log("movies: ", movies);
  // console.log("MoviePage ~ isReachingEnd", isReachingEnd);

  // =================================================================================

  useEffect(() => {
    if (filterDebounce)
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    else setUrl(tmdbAPI.getMovieList("popular", nextPage));
  }, [filterDebounce, nextPage]);

  // ========= khu vực xử lí phân trang ========

  useEffect(() => {
    if (!data || !data.total_results) return null;

    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    // hiển thị dấu 3 chấm
    const newOffset = (event.selected * itemsPerPage) % data.total_pages;
    setItemOffset(newOffset);
    // xét trang mới dựa event.selected là chỉ số của trang hiện tại (bắt đầu từ 0)
    setNextPage(event.selected + 1);
  };

  return (
    <>
      <div className="page-container py-10">
        <div className="flex mb-10">
          <div className="flex-1">
            <input
              type="text"
              className="w-full p-4 bg-slate-800 text-white outline-none"
              placeholder="Type here to search ..."
              onChange={handleFilterChange}
            />
          </div>

          <button className="p-4 bg-primary text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        {/* loading kiểu skeleton */}
        {loading && (
          <div className="grid grid-cols-4 gap-10">
            {new Array(itemsPerPage).fill(0).map(() => (
              <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
            ))}
          </div>
        )}

        <div className="grid grid-cols-4 gap-10">
          {!loading &&
            movies.length > 0 &&
            movies.map((item) => (
              <MovieCard key={item.id} item={item}></MovieCard>
            ))}
        </div>

        {!loading && movies.length <= 0 && (
          <div className="text-center text-lg font-medium">
            There are no movies that matched your query.
          </div>
        )}

        <div className="mt-10 text-center">
          <Button
            onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
            disabled={isReachingEnd}
            className={`${isReachingEnd ? "bg-slate-300 text-black" : ""}`}
          >
            Load more
          </Button>
        </div>
      </div>
      <ChangePageTitle
        pageTitle={"Movies — The Simple Movies App"}
      ></ChangePageTitle>
    </>
  );
};

export default MoviePageV2;

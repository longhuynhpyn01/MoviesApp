import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";

// const pageCount = 5;
const itemsPerPage = 20; // số lượng phim ở 1 phân trang là 20

// phân trang
const MoviePageV1 = () => {
  const [pageCount, setPageCount] = useState(0); // tổng số trang - chính là totalPages
  const [itemOffset, setItemOffset] = useState(0); // lưu vị trí xuất hiện bộ phim của trang. Ví dụ tại trang 4 thì bắt đầu từ vị trí 60

  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
  const filterDebounce = useDebounce(filter, 500);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error; // trạng thái đang load
  const movies = data?.results || [];

  useEffect(() => {
    if (filterDebounce)
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    else setUrl(tmdbAPI.getMovieList("popular", nextPage));
  }, [filterDebounce, nextPage]);

  // if (!data) return null;

  // const { page, total_pages } = data;
  // console.log("page: ", page);
  // console.log("total pages: ", total_pages);

  // ========= khu vực xử lí phân trang ========

  useEffect(() => {
    if (!data || !data.total_results) return null;

    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    // hiển thị dấu 3 chấm
    const newOffset = (event.selected * itemsPerPage) % data.total_pages;
    setItemOffset(newOffset);
    // xét trang mới dựa event.selected là chỉ số của trang hiện tại (bắt đầu từ 0)
    setNextPage(event.selected + 1);
  };

  return (
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

      {/* loading kiểu bình thường */}
      {/* {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-4 border-t-transparent mx-auto animate-spin"></div>
      )} */}

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

      {/* phần để phân trang */}
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviePageV1;

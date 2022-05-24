// sử dụng lazy và Suspense để code splitting, giúp cho khi ở trang nào thì tải trang đó chứ không load tất cả từ đầu

import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss"; // vì dùng chung nên đưa nó ra global
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";

// import HomePage from "./pages/HomePage";
// import MoviePage from "./pages/MoviePage";
// import MovieDetailsPage from "./pages/MovieDetailsPage";

// sử dụng khai báo lazy
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MoviePageV2 = lazy(() => import("./pages/MoviePageV2"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const CastDetailsPage = lazy(() => import("./pages/CastDetailsPage"));
const PageNotFounded = lazy(() => import("./components/404/PageNotFounded"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          {/* không truyền path thì route nào cũng có */}
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviePageV2></MoviePageV2>}></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailsPage></MovieDetailsPage>}
            ></Route>
            <Route
              path="/cast/:castId"
              element={<CastDetailsPage></CastDetailsPage>}
            ></Route>
            <Route path="*" element={<PageNotFounded></PageNotFounded>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;

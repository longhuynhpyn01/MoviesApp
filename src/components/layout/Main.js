import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Main = () => {
  return (
    <Fragment>
      <Header></Header>
      {/* sử dụng Outlet để các thành phần con (giống children) có thể hiển thị nhưng chỉ dùng cho 1 phần tử nếu trong 
      có 2 Route có cùng path hoặc sử dụng lồng hau <> </> */}
      <Outlet></Outlet>
    </Fragment>
  );
};

export default Main;

import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import ChangePageTitle from "../title/ChangePageTitle";

const PageNotFounded = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-[800px] mx-auto mt-12 mb-6">
        <h1 className="text-primary text-6xl font-bold flex gap-8 justify-center items-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          404
        </h1>
        <h2 className="text-center text-3xl font-medium mb-12">
          Alright, move on! Nothing to see here!
        </h2>
        <p className="text-center text-lg font-normal opacity-70 mb-12">
          You may have mistyped the address or the page may have moved. Let us
          take you to the main page and we can start all over again, shall we?
        </p>
        <div className="text-center">
          <Button
            bgColor="primary"
            onClick={() => navigate("/")}
            className="text-lg"
          >
            Go home
          </Button>
        </div>
      </div>
      <ChangePageTitle
        pageTitle={"Page Not Found — The Simple Movies App"}
      ></ChangePageTitle>
    </>
  );
};

export default PageNotFounded;

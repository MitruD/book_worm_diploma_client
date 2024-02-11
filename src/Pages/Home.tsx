import React from "react";
import { BooksList } from "../Components/Page/Home";
import { Banner } from "../Components/Page/Common";

function Home() {
  return (
    <div>
      <Banner />
      <div className="container p-2"></div>
      <BooksList />
    </div>
  );
}

export default Home;

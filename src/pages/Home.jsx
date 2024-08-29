import React from "react";
import ContentWrapper from "../layout/ContentWrapper";
import Trending from "../components/Trending";
import CryptoTable from "../components/CryptoTable";

const Home = () => {
  return (
    <ContentWrapper>
      <div className="container mx-auto">
        <Trending />
        <CryptoTable />
      </div>
    </ContentWrapper>
  );
};

export default Home;

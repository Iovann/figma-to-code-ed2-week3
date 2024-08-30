import React from "react";
import ContentWrapper from "../layout/ContentWrapper";
import Trending from "../components/Trending";
import CryptoTable from "../components/CryptoTable";

const Home = () => {
  return (
    <ContentWrapper>
      <Trending />
      <CryptoTable />
    </ContentWrapper>
  );
};

export default Home;

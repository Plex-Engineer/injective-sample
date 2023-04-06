import "App.scss";
import styled from "@emotion/styled";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "global/components/nFooter";
import Loading from "global/components/Loading";
import PageNotFound from "global/components/pageNotFound";
import { GlobalStyle } from "global/packages/src";
import { useEthers } from "@usedapp/core";
import { useNetworkInfo } from "global/stores/networkInfo";
import { SampleMulticall } from "pages/sample/sampleMulticall";
import { addNetwork } from "global/utils/walletConnect/addCantoToWallet";

//Styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 5rem);
  background-color: #111;
`;
//Lazy loading pages. will load in the required pages
const SamplePage = lazy(() => import("pages/sample/sample"));

const SampleChildPage = lazy(() =>
  import("pages/sample/sampleChild").then((module) => {
    return {
      default: module.SampleChild,
    };
  })
);

function App() {
  //example zustand implementation for network information
  const { chainId, account, activateBrowserWallet, deactivate } = useEthers();
  const networkInfo = useNetworkInfo();
  useEffect(() => {
    networkInfo.setChainId(chainId);
    networkInfo.setAccount(account);
  }, [account, chainId]);
  return (
    <React.Fragment>
      <ToastContainer />
      <GlobalStyle />
      <button
        style={{ background: "green" }}
        onClick={() => activateBrowserWallet()}
      >
        Connect Wallet
      </button>
      <button style={{ background: "red" }} onClick={() => deactivate()}>
        Disconnect Wallet
      </button>
      <button style={{ background: "aqua" }} onClick={addNetwork}>
        Add Canto Network to Metamask
      </button>
      <Router>
        <Container className="App">
          <div className="main-body">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" key={"parent"} element={<SamplePage />} />

                <Route
                  path="/sample/child"
                  key={"child"}
                  element={<SampleChildPage chainId={chainId} />}
                />
                <Route
                  path="/sampleMulticall"
                  key={"mc"}
                  element={<SampleMulticall />}
                />
                <Route
                  path="*"
                  key={"404"}
                  element={
                    <div>
                      <PageNotFound />
                    </div>
                  }
                />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;

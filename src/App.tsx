import "App.scss";
import styled from "@emotion/styled";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "global/components/nFooter";
import Loading from "global/components/Loading";
import PageNotFound from "global/components/pageNotFound";
import { GlobalStyle } from "global/packages/src";
import Sample from "pages/sample/sample";

//Styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 5rem);
  background-color: #111;
`;
function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <GlobalStyle />
      <Router>
        <Container className="App">
          <div className="main-body">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" key={"parent"} element={<Sample />} />
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

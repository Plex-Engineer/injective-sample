import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Styled>
      <p
        style={{
          fontSize: "8rem",
        }}
      >
        404
      </p>
      <p>Page not found</p>
      <p>The page you are looking for does not exist.</p>

      <button
        style={{
          width: "10rem",
          margin: "2rem",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        Go Home
      </button>
    </Styled>
  );
};

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 10rem);
  flex-grow: 2;
  width: 1200px;
  margin: 0 auto;
  background-color: black;
`;

export default PageNotFound;

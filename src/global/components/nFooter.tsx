import styled from "@emotion/styled";
import discord from "assets/discord.svg";
import github from "assets/github.svg";
import twitter from "assets/twitter.svg";
import ImageButton from "./ImageButton";

const Footer = () => {
  return (
    <Styled>
      <div className="links">
        <a href="https://canto.canny.io/" target="_blank" rel="noreferrer">
          <p>report bug</p>
        </a>
        <a href="https://docs.canto.io/" target="_blank" rel="noreferrer">
          <p>docs</p>
        </a>
        <a href="https://docs.canto.io/" target="_blank" rel="noreferrer">
          <p>about canto</p>
        </a>
      </div>

      <div className="links">
        <p
          style={{
            color: "var(--primary-darker-color)",
          }}
        >
          all rights reserved 2021-2022
        </p>
        <div className="icon-links">
          <ImageButton
            src={discord}
            alt="discord"
            height={40}
            onClick={() => {
              window.open("https://discord.gg/ucRX6XCFbr");
            }}
          />
          <ImageButton
            src={github}
            alt="github"
            height={40}
            onClick={() => {
              window.open("https://github.com/Canto-Network");
            }}
          />
          <ImageButton
            src={twitter}
            alt="twitter"
            height={40}
            onClick={() => {
              window.open("https://twitter.com/CantoPublic");
            }}
          />
        </div>
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  max-width: 1200px;
  width: 100%;
  border-top: 1px solid var(--primary-color);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  z-index: 2;
  .links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .icon-links {
    display: flex;

    gap: 1rem;
  }

  @media (max-width: 1000px) {
    flex-direction: column;

    .links {
      margin-top: 1rem;
      flex-direction: column;
      gap: 1rem;
    }
  }
`;

export default Footer;

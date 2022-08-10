import styled from "styled-components";
import Form from "../components/Form";

import { useContext } from "react";
import FormContext from "../store/FormContext";

function StartGame({ isStarted, setIsStarted }) {
  const { apiError } = useContext(FormContext);

  return (
    <Wrapper>
      <h1>Quizzical</h1>
      <p> Are you ready to be quizzed ?</p>
      {apiError.isError && <h5> {apiError.message} </h5>}
      <Form />
      <button
        onClick={() => {
          setIsStarted(true);
        }}
      >
        Start Quiz
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 2rem;
  min-height: 100vh;

  h5 {
    border-left: 0.5rem solid #ed4f4f !important;
    border: 1px solid #ed4f4f;
    color: #ed4f4f;
    font-weight: 400;
    padding: 0.5rem;
    margin: 0;
    min-width: 18.75rem;
  }

  button {
    padding: 1rem 5rem;
    border-radius: 0.6rem;
    background-color: #293264;
    border: transparent;
    color: #fff;
    font-weight: 500;

    :hover {
      background-color: #333d7a;
    }
  }
`;

export default StartGame;

import Quizz from "../components/Quizz";

import { useState, useEffect, useContext } from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";
import ReactLoading from "react-loading";

import FormContext from "../store/FormContext";

function Quizzes({ isLoading, setIsLoading, isStarted, setIsStarted }) {
  const { formData, setApiError } = useContext(FormContext);

  const [quizzes, setQuizzes] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  const [Score, setScore] = useState(0);

  //Fetch Data
  const getQuizzes = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=${formData.questions}&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.type}`
      );
      if (!res.ok) {
        throw Error(
          "An error occurred while trying to get trivia questions. Please try again later."
        );
      }
      const data = await res.json();

      if (data.response_code !== 0) {
        throw Error(
          `There are currently no results with the given options. Please try again with different options.`
        );
      }

      setQuizzes(modifiedData(data.results));

      function modifiedData(quizzes) {
        const correct_answer_arrobj = (correct_answer) => ({
          value: correct_answer,
          id: nanoid(),
          isHeld: false,
          isCorrect: true,
        });

        const incorrect_answer_arrobj = (incorrect_answers) =>
          incorrect_answers.map((answer) => ({
            value: answer,
            id: nanoid(),
            isHeld: false,
            isCorrect: false,
          }));

        const shuffledArray = (
          correct_answer_arrobj,
          incorreect_answers_arrobj
        ) => {
          return [correct_answer_arrobj, ...incorreect_answers_arrobj].sort(
            () => Math.random() - 0.5
          );
        };

        return quizzes.map((quizz) => ({
          ...quizz,
          id: nanoid(),
          answers: shuffledArray(
            correct_answer_arrobj(quizz.correct_answer),
            incorrect_answer_arrobj(quizz.incorrect_answers)
          ),
        }));
      }
    } catch (error) {
      setApiError((prevApiError) => {
        return {
          isError: true,
          message: error.message,
        };
      });
      setIsStarted(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    !isChecked && getQuizzes();
  }, [isChecked]);

  const quizzesElements = quizzes.map((quizz) => (
    <Quizz
      key={quizz.id}
      quizzes={quizzes}
      setQuizzes={setQuizzes}
      isChecked={isChecked}
      {...quizz}
    />
  ));

  function handleClick() {
    if (!isChecked) {
      setIsChecked(true);
      checkScore();
    } else {
      setIsChecked(false);
      setScore(0);
    }
  }

  function checkScore() {
    quizzes.map((quizz) => ({
      ...quizz,
      answers: quizz.answers.map((answer) => {
        return (
          answer.isHeld &&
          answer.isCorrect &&
          setScore((prevScore) => prevScore + 1)
        );
      }),
    }));
  }

  return (
    <QuizzesWrapper>
      {!isLoading ? (
        <div>
          {quizzesElements}
          <Actions>
            {isChecked && (
              <h3>
                Your score is {Score}/{quizzes.length}
              </h3>
            )}
            <button onClick={handleClick}>
              {!isChecked ? "Check Answers" : "Play again"}{" "}
            </button>
          </Actions>
        </div>
      ) : (
        <Loading>
          <ReactLoading type="spinningBubbles" color="#333d7a" />
          <p>Loading...</p>
        </Loading>
      )}
    </QuizzesWrapper>
  );
}

const QuizzesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 2rem 8rem;

  @media only screen and (max-width: 600px) {
    margin: 2rem;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3rem;

  h3 {
    margin: 0;
  }

  button {
    display: block;
    padding: 1rem 2.5rem;
    border-radius: 1rem;
    border: transparent;
    background-color: #4d5b9e;
    color: white;

    &:hover {
      background-color: #333d7a;
    }
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Quizzes;

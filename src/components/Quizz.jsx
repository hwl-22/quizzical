import OptionButton from "./OptionButton";
import styled from "styled-components";
import sanitizeHtml from "sanitize-html";

function Quizz(props) {
  const { isChecked, setQuizzes, id, question, answers } = props;

  const optionBtnEls = answers.map((answer) => {
    return (
      <OptionButton
        key={answer.id}
        {...answer}
        questionId={id}
        isChecked={isChecked}
        handleClick={() => {
          answerHandler(id, answer.id);
        }}
      />
    );
  });

  function answerHandler(questionId, answerId) {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quizz) =>
        quizz.id === questionId
          ? {
              ...quizz,
              answers: answers.map((answer) =>
                answer.id === answerId
                  ? { ...answer, isHeld: !answer.isHeld }
                  : { ...answer, isHeld: false }
              ),
            }
          : quizz
      )
    );
  }

  const typoErr = (htmlStr) => {
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, '"');
    htmlStr = htmlStr.replace(/&#039;/g, "'");
    htmlStr = htmlStr.replace(/&amp;/g, "&");
    htmlStr = htmlStr.replace(/&ldquo;/g, '"');
    return htmlStr;
  };

  return (
    <QuizzWrapper>
      <h3> {sanitizeHtml(typoErr(question))} </h3>
      <div>{optionBtnEls}</div>
    </QuizzWrapper>
  );
}

const QuizzWrapper = styled.div`
  margin-bottom: 1.25rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #dbdef0;

  h3 {
    margin: 1.25rem 0;
    white-space: pre-wrap;
  }

  div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    button {
      padding: 0.35rem 1.5rem;
      border: 1px solid #4d5b9e;
      background-color: #f5f7fb;
      border-radius: 0.7rem;
      white-space: nowrap;
    }
  }

  @media only screen and (max-width: 600px) {
    h3 {
      text-align: center;
    }

    div {
      flex-direction: column;

      button {
        width: 65%;
        white-space: normal;
      }
    }
  }
`;

export default Quizz;

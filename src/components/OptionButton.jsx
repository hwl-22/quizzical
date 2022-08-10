import sanitizeHtml from "sanitize-html";
import styled from "styled-components";
import classNames from "classnames";

function OptionButton(props) {
  const { isChecked, questionId, value, id, isCorrect, isHeld, handleClick } =
    props;

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
    <Btn
      className={classNames({
        clicked: isHeld,
        correct: isChecked && isCorrect,
        incorrect: isChecked && !isCorrect,
        clicked_incorrect: isChecked && isHeld && !isCorrect,
      })}
      onClick={() => handleClick(questionId, id)}
    >
      {sanitizeHtml(typoErr(value))}
    </Btn>
  );
}

const Btn = styled.button`
  &.clicked {
    background-color: #d6dbf5;
    border: 1px solid #d6dbf5;
  }

  &.correct {
    background-color: #94d7a2;
    border: transparent;
  }

  &.incorrect {
    border: 1px solid #4d5b9e;
    color: #4d5b9e;
  }

  &.clicked_incorrect {
    border: transparent;
    background-color: #f8bcbc;
    color: #4d5b9e;
  }
`;

export default OptionButton;

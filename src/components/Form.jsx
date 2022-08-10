import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import FormContext from "../store/FormContext";

function Form() {
  const { formData, setFormData } = useContext(FormContext);

  const [category, setCategory] = useState([]);

  async function getCategory() {
    const localData = localStorage.getItem("category");

    if (localData) {
      setCategory(JSON.parse(localData));
    } else {
      const api = await fetch(`https://opentdb.com/api_category.php`);
      const data = await api.json();

      localStorage.setItem("category", JSON.stringify(data.trivia_categories));
      setCategory(data.trivia_categories);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  function onChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <FormWrapper>
      <Input>
        <label htmlFor="questions">Number of Questions</label>
        <input
          name="questions"
          type="number"
          onChange={onChange}
          value={formData.questions}
          min={5}
          max={50}
        />
      </Input>
      <Input>
        <label htmlFor="category">Category</label>
        <select
          onChange={onChange}
          value={formData.category}
          name="category"
          id="category"
        >
          <option value="">Any Category</option>

          {category.map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          })}
        </select>
      </Input>
      <Input>
        <label htmlFor="difficulty">Difficulty</label>
        <select
          onChange={onChange}
          value={formData.difficulty}
          name="difficulty"
          id="difficulty"
        >
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </Input>
      <Input>
        <label htmlFor="type">Type</label>
        <select onChange={onChange} value={formData.type} name="type" id="type">
          <option value="">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
      </Input>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  margin-bottom: 1rem;

  div {
    margin: 1.5rem 0;

    label {
      display: block;
      margin-bottom: 0.5rem;
      text-align: left;
      font-weight: 600;
    }

    select,
    input {
      display: block;
      font-family: inherit;
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.6rem;
      border: 1px solid #293264;
      outline: none;

      &:focus-within {
        border: 2px solid #7489ff;
      }
    }

    select {
      cursor: pointer;

      &::-webkit-scrollbar {
        width: 1.5rem;
      }

      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #808080;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: #7489ff;
        border-radius: 10px;
      }
    }
  }
`;

const Input = styled.div``;

export default Form;

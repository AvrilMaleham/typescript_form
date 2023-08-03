import "./form.css";
import { useState } from "react";


const defaultFormInputs = {
  cardNumber: "",
  cvc: "",
  expiry: "",
};

const FormView: React.FC = () => {
  const [formInputs, setFormInputs] = useState(defaultFormInputs);

  const { cardNumber, cvc, expiry } = formInputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormInputs((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formInputs);

    setFormInputs(defaultFormInputs);
  };

  return (
    <div>
      <header className="FormHeading">
   
        <h1 className="FormTitle">Register card form</h1>
      </header>

      <main>
        <h2>Welcome</h2>
        <img
          className="ProfilePic"
          src={require("../assets/default-profile-picture.png")}
          alt="default profile picture"
        />

        <form className="Form" onSubmit={onSubmit}>
          <label htmlFor="cardNumber">Credit Card Number</label>
          <input
            className="Input"
            placeholder="0000 0000 0000 0000"
            type="number"
            id="cardNumber"
            value={cardNumber}
            onChange={onChange}
          />
          <br></br>

          <label htmlFor="cvc">CVC</label>
          <input
            className="Input"
            placeholder="000"
            type="number"
            id="cvc"
            value={cvc}
            onChange={onChange}
          />
          <br></br>

          <label htmlFor="expiry">Expiry</label>
          <input
            className="Input"
            placeholder="Expiry"
            type="month"
            id="expiry"
            value={expiry}
            onChange={onChange}
          />
          <br></br>

          <button className="Button" type="submit">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default FormView;

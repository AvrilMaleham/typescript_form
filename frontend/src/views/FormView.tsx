import "./form.css";
import { useState } from "react";


const defaultFormInputs = {
  cardNumber: "",
  cvc: "",
  expiry: "",
};

type FormErrors = {
  cardNumber? : string;
  cvc?: string;
  expiry?: string;
}


const FormView: React.FC = () => {
  const [formInputs, setFormInputs] = useState(defaultFormInputs);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const { cardNumber, cvc, expiry } = formInputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors({});
    setFormInputs((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const validateForm = () => {
    const errors: FormErrors = {};

    if (cardNumber.length !== 16) {
      errors["cardNumber"] = "Card number must be 16 digits.";
    }

    if (cvc.length !== 3) {
      errors["cvc"] = "CVC must be 3 digits.";
    }

    const today = new Date();
    const expiryDate = new Date(expiry);

    if (expiryDate < today ) {
      errors["expiry"] = "Expiry date must not be in the past.";
    }

    return errors;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log(formInputs);
      setFormInputs(defaultFormInputs);
    } else {
      setFormErrors(errors);
    }
   
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
          <div className="Error">{formErrors["cardNumber"]}</div>
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
          <div className="Error">{formErrors["cvc"]} </div>
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
          <div className="Error">{formErrors["expiry"]} </div>
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

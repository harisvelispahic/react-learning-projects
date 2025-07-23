import InputField from "./InputField";
import "../index.css";

const LABELS = [
  "Initial Investment",
  "Annual Investment",
  "Expected Return",
  "Duration",
];

export default function UserInput({ userInput, handleChange }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <InputField
          label={LABELS[0]}
          value={userInput.initialInvestment}
          onChange={(event) => handleChange("initialInvestment", event)}
        />
        <InputField
          label={LABELS[1]}
          value={userInput.annualInvestment}
          onChange={(event) => handleChange("annualInvestment", event)}
        />
      </div>
      <br />
      <div className="input-group">
        <InputField
          label={LABELS[2]}
          value={userInput.expectedReturn}
          onChange={(event) => handleChange("expectedReturn", event)}
        />
        <InputField
          label={LABELS[3]}
          value={userInput.duration}
          onChange={(event) => handleChange("duration", event)}
        />
      </div>
    </section>
  );
}

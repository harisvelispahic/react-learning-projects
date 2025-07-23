import "../index.css";

export default function InputField({ label, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input type="number" value={value} onChange={onChange} required/>
    </div>
  );
}

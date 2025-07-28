export default function Input({ label, type, ...props }) {
  const classes =
    "w-full p-1 bg-stone-200 rounded-sm border-b-4 border-stone-500 text-stone-600 text-lg focus:outline-none focus:border-stone-600";
  return (
    <p className="flex flex-col my-8">
      <label className="text-stone-500 uppercase font-bold my-2 text-lg">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea {...props} className={classes} />
      ) : (
        <input type={type} {...props} className={classes} />
      )}
    </p>
  );
}

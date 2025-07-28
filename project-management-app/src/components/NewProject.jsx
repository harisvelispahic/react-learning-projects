import Input from "./Input";

export default function NewProject({ onCancel, handleSaveProject, refs }) {
  const { title, description, dueDate } = refs;

  return (
    <div className="mx-auto mt-32 w-[50vw]">
      <menu className="flex justify-end items-center">
        <li>
          <button
            className="px-6 py-2 text-stone-800 hover:text-stone-950"
            onClick={onCancel}
          >
            Cancel
          </button>
        </li>
        <li>
          <button
            className="bg-stone-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md ml-2"
            onClick={handleSaveProject}
          >
            Save
          </button>
        </li>
      </menu>
      <div>
        <Input label="Title" type="text" ref={title} />
        <Input label="Description" type="textarea" ref={description} />
        <Input
          label="Due date"
          type="date"
          ref={dueDate}
          defaultValue={new Date().toISOString().split("T")[0]}
        />
      </div>
    </div>
  );
}

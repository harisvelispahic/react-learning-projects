import Button from "./Button";

export default function DefaultPage({createNewProject}) {
  return (
    <div className="flex flex-col justify-center items-center m-auto gap-4 w-2/3">
      <img
        src="src/assets/no-projects.png"
        alt="An empty task list"
        className="w-20 h-20 xl:w-24 xl:h-24 object-contain"
      />
      <h2 className="text-2xl text-stone-500 font-bold">No project selected</h2>
      <p className="text-lg text-stone-400 mb-6">
        Select a project or get started with a new one
      </p>
      <Button onClick={createNewProject}>Create new project</Button>
    </div>
  );
}

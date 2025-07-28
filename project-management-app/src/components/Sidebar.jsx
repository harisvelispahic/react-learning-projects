import Button from "./Button";

export default function Sidebar({
  createNewProject,
  projects,
  onProjectChange,
  selectedProjectId,
}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-2xl text-stone-200 text-3xl">
        Your projects
      </h2>
      <Button onClick={createNewProject}>+ Add a project</Button>

      <ul className="mt-8 flex flex-col">
        {projects.map((project) => {
          let cssClasses =
            "w-full text-left px-2 py-1 text-lg my-1 rounded hover:text-stone-200 hover:bg-stone-800";

          if (project.id === selectedProjectId) {
            cssClasses += " bg-stone-800 text-stone-200";
          } else {
            cssClasses += " text-stone-400";
          }

          return (
            <button
              key={project.id}
              className={cssClasses}
              onClick={() => onProjectChange(project.id)}
            >
              {project.title}
            </button>
          );
        })}
      </ul>
    </aside>
  );
}

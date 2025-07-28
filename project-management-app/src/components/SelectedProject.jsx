import { useState } from "react";
import Tasks from "./Tasks";

export default function SelectedProject({ project, onProjectDelete }) {
  const [tasks, setTasks] = useState([]);

  const formattedDate = new Date(project.dueDate).toLocaleDateString("ba-BH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <main className="w-2/3">
        <article className="m-16 border-b-2 border-stone-300 lg:mt-24">
          <header className="flex justify-between">
            <h1 className="text-stone-700 text-2xl font-bold mb-2 xl:text-4xl xl:mb-4">
              {project.title}
            </h1>
            <button
              onClick={() => onProjectDelete(project.id)}
              className="py-2 text-stone-800 hover:text-red-600"
            >
              Delete
            </button>
          </header>
          <p className="text-stone-400 mb-6 xl:text-lg xl:mb-10">
            <time>{formattedDate}</time>
          </p>
          <p className="text-stone-800 whitespace-pre-wrap">
            {project.description}
          </p>
        </article>

        <Tasks tasks={tasks} setTasks={setTasks} />
      </main>
    </>
  );
}

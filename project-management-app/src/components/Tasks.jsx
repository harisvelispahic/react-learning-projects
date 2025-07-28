import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import Modal from "./Modal";

export default function Tasks({ tasks, setTasks }) {
  const currentTask = useRef();
  const modal = useRef();

  function handleTaskCreation(newTask) {
    if (!currentTask.current.value.trim()) {
      modal.current.open();
      return;
    }
    setTasks((prevTasks) => [...prevTasks, { id: uuidv4(), title: newTask }]);
    currentTask.current.value = "";
  }

  function handleTaskDeletion(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  return (
    <>
      <Modal ref={modal} buttonText="Close">
        <h2 className="text-xl text-stone-700 font-bold my-4">Invalid input</h2>
        <p className="text-stone-600 mb-4">
          Oops ... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for the input field.
        </p>
      </Modal>

      <section className="m-16">
        <h1 className="text-stone-700 text-2xl font-bold mb-4 xl:text-4xl xl:mb-6">
          Tasks
        </h1>
        <input
          ref={currentTask}
          type="text"
          className="bg-stone-200 rounded-sm py-[2px] px-1"
          required
        />
        <button
          className="py-[1px] px-4 text-stone-800 hover:text-stone-950"
          onClick={() => handleTaskCreation(currentTask.current.value)}
        >
          Add task
        </button>
        {tasks.length === 0 ? (
          <p className="text-stone-800 mt-8">
            This project does not have any tasks yet.
          </p>
        ) : (
          <ul className="bg-stone-100 mt-8 p-4">
            {tasks.map((task) => {
              return (
                <li key={task.id} className="w-full flex justify-between p-2">
                  <p>{task.title}</p>
                  <button
                    onClick={() => handleTaskDeletion(task.id)}
                    className="hover:text-red-600"
                  >
                    Clear
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}

import { v4 as uuidv4 } from "uuid";
import { useState, useRef } from "react";

import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import DefaultPage from "./components/DefaultPage";
import Modal from "./components/Modal";
import SelectedProject from "./components/SelectedProject";

const INITIAL_PROJECTS = [
  {
    title: "Learning React",
    description: "In this course you will learn about React...",
    dueDate: new Date(),
    id: uuidv4(),
  },
  {
    title: "Learning TypeScript",
    description: "In this course you will learn about TypeScript...",
    dueDate: new Date(),
    id: uuidv4(),
  },
  {
    title: "Learning JS",
    description: "In this course you will learn about JS...",
    dueDate: new Date(),
    id: uuidv4(),
  },
];

function App() {
  const [projects, setProjects] = useState({
    // undefined means that we are doing northing currently => not adding a project
    selectedProjectId: undefined,
    projectsList: INITIAL_PROJECTS,
  });

  const newProject = {
    title: useRef(),
    description: useRef(),
    dueDate: useRef(),
  };

  const modal = useRef();

  function handleCreateNewProject() {
    setProjects((prevProjects) => {
      return {
        ...prevProjects,
        selectedProjectId: null,
        // null means that we are adding a project
      };
    });
  }

  function handleSaveProject() {
    if (
      newProject.title.current.value.trim() === "" ||
      newProject.description.current.value.trim() === "" ||
      newProject.dueDate.current.value.trim() === ""
    ) {
      modal.current.open();
      return;
    }
    setProjects((prevProject) => {
      return {
        selectedProjectId: undefined,
        projectsList: [
          ...prevProject.projectsList,
          {
            id: uuidv4(),
            title: newProject.title.current.value,
            description: newProject.description.current.value,
            dueDate: newProject.dueDate.current.value,
          },
        ],
      };
    });
  }

  function handleCancel() {
    setProjects((prevProjects) => {
      return {
        ...prevProjects,
        selectedProjectId: undefined,
      };
    });
  }

  function handleProjectChange(projectId) {
    setProjects((prevProjects) => {
      return {
        ...prevProjects,
        selectedProjectId: projectId,
      };
    });
  }

  function handleProjectDelete(projectId) {
    setProjects((prevProjects) => {
      return {
        ...prevProjects,
        selectedProjectId: undefined,
        projectsList: prevProjects.projectsList.filter(
          (project) => project.id !== projectId
        ),
      };
    });
  }

  let content;
  if (projects.selectedProjectId === undefined)
    content = <DefaultPage createNewProject={handleCreateNewProject} />;
  else if (projects.selectedProjectId === null)
    content = (
      <NewProject
        onCancel={handleCancel}
        handleSaveProject={handleSaveProject}
        refs={newProject}
      />
    );
  else {
    content = (
      <SelectedProject
        project={projects.projectsList.find(
          (project) => project.id === projects.selectedProjectId
        )}
        onProjectDelete={handleProjectDelete}
      />
    );
  }

  return (
    <>
      <Modal ref={modal} buttonText="Close">
        <h2 className="text-xl text-stone-700 font-bold my-4">Invalid input</h2>
        <p className="text-stone-600 mb-4">
          Oops ... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>
      <main className="h-screen flex">
        <Sidebar
          createNewProject={handleCreateNewProject}
          projects={projects.projectsList}
          onProjectChange={handleProjectChange}
          selectedProjectId={projects.selectedProjectId}
        />
        {/* <NewProject /> */}
        {/* {projects.projects.selectedProjectId === null ? (
          <NewProject cancelCreation={handleCancel} />
        ) : (
          <DefaultPage createNewProject={handleCreateNewProject} />
        )} */}
        {content}
      </main>

      {/* <h1 className="my-8 text-center text-5xl font-bold">sybau 🥀🥀</h1>

      <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 hover:ring-4">
        <img
          className="size-12 shrink-0"
          src="../src/assets/no-projects.png"
          alt="ChitChat Logo"
        />
        <div>
          <div className="text-xl font-medium text-black dark:text-white">
            ChitChat
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            You have a new message!
          </p>
        </div>
      </div> */}
    </>
  );
}

export default App;

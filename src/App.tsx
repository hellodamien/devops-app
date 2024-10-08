import { useState } from "react";
import "./App.css";
import { TASKS_STORAGE_KEY } from "./config";

type Task = {
  title: string;
  date: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("title", title);
    console.log("date", date);

    if (!title || !date) {
      setMessage("Veuillez remplir tous les champs !");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    // Enregistrer la tâche dans le local storage
    const tasks: Task[] = JSON.parse(
      localStorage.getItem(TASKS_STORAGE_KEY) || "[]"
    );
    tasks.push({ title, date });
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));

    // Réinitialiser les champs
    setTitle("");
    setDate("");

    // Afficher un message de succès
    // setMessage("Tâche ajoutée avec succès !");
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold text-violet-900 mt-12">
        Todo list
      </h1>
      <form
        className="flex flex-col space-y-3 max-w-80 border-violet-200 border p-6 shadow-lg mx-auto mt-12 rounded-md"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="title"
          data-cy="input-title"
          className="border p-2 rounded-md"
          placeholder="Titre de la tâche"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="date"
          name="date"
          data-cy="input-date"
          className="border p-2 rounded-md"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        <button
          type="submit"
          data-cy="submit-task"
          className="bg-violet-200 p-2 rounded-md text-violet-900"
        >
          Ajouter
        </button>
      </form>
      {message && (
        <div className="text-violet-400 p-2 text-center mt-2">{message}</div>
      )}
    </>
  );
}

export default App;

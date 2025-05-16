import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const LOCAL_STORAGE_KEY = "todoTasks";

  const [taskList, setTaskList] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Error reading localStorage", err);
      return [];
    }
  });

  const [task, setTask] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // 🔹 Save to localStorage whenever taskList changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskList));
    } catch (err) {
      console.error("Failed to save to localStorage", err);
    }
  }, [taskList]);

  const handleChanges = (event) => {
    setTask(event.target.value);
  };

  const addBtn = () => {
    if (task.trim() === "") {
      alert("Nothing in input");
      return;
    }

    const newTask = {
      id: Date.now(),
      name: task,
      isCompleted: false,
    };

    setTaskList([...taskList, newTask]);
    setTask("");
  };

  const deleteTask = (id) => {
    setDeletingId(id);
    setTimeout(() => {
      setTaskList((prev) => prev.filter((todo) => todo.id !== id));
      setDeletingId(null);
    }, 300);
  };

  const toggleComplete = (id) => {
    setTaskList(
      taskList.map((taskItem) =>
        taskItem.id === id
          ? { ...taskItem, isCompleted: !taskItem.isCompleted }
          : taskItem
      )
    );
  };

  return (
    <div className="App">
      <div className="addTasks">
        <input onChange={handleChanges} value={task} />
        <button onClick={addBtn}>Add</button>
      </div>

      <div className="taskList">
        {taskList.map((taskItem) => (
          <div
            key={taskItem.id}
            className={`inside-taskList ${
              deletingId === taskItem.id ? "fade-out" : ""
            }`}
          >
            <span
              style={{
                textDecoration: taskItem.isCompleted ? "line-through" : "none",
              }}
            >
              {taskItem.name}
            </span>

            <button
              className="complete-info"
              style={{
                backgroundColor: taskItem.isCompleted ? "#40ba48" : "#7e7c7c",
                boxShadow: taskItem.isCompleted
                  ? "0 0 8px #40ba48"
                  : "0 0 8px #7e7c7c",
              }}
              onClick={() => toggleComplete(taskItem.id)}
            ></button>

            <button
              className="remove-btn"
              style={{ backgroundColor: "#6c757d" }}
              onClick={() => deleteTask(taskItem.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

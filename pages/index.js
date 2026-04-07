"use client";

import { useState, useEffect } from "react";

export default function Home() {

  const [task, setTask] = useState("");
  const [userName, setUserName] = useState("");
  const [tasksArray, setTasksArray] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const getData = async () => {
    const url = "http://localhost:5000/tasks";
    const taskList = await fetch(url);
    const data = await taskList.json();
    console.log("tasklist", data);
    setTasksArray(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const inputSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim() || !userName.trim()) return;

    if (editIndex !== null) {
      const url = "http://localhost:5000/tasks";
      await fetch(`${url}/${editIndex}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: task,
          user_name: userName,
        }),
      });
      const updatedTasks = tasksArray.map((item) =>
        item.id === editIndex ? { ...item, task, user_name: userName } : item
      );
      setTasksArray(updatedTasks);
      setEditIndex(null);
    } else {
      const url = "http://localhost:5000/tasks";
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: task,
          user_name: userName,
        }),
      });
    }

    setTask("");
    setUserName("");
    await getData();
  };

 const handleDelete = async (id) => {
  const url = "http://localhost:5000/tasks";

  await fetch(`${url}/${id}`, {
    method: "DELETE",
  });

  const filteredTasks = tasksArray.filter((item) => item.id !== id);
  setTasksArray(filteredTasks);
  await getData();
};

const handleUpdate = (id) => {
  const selectedTask = tasksArray.find((item) => item.id === id);
  setEditIndex(id);
  setTask(selectedTask.task);
  setUserName(selectedTask.user_name || "");
};

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>My To Do List</h1>

      <form
        onSubmit={inputSubmit}
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          style={{ padding: "8px", width: "70%" }}
        />
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          style={{ padding: "8px", width: "40%" }}
        />
        <button
          type="submit"
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          {editIndex !== null ? "Update" : "Submit"}
        </button>
      </form>

      <div style={{ border: "1px solid white", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr 2fr 2fr",
            backgroundColor: "#cccccc",
            color: "#000000",
            fontWeight: "bold",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <div>No</div>
          <div>Task</div>
          <div>User</div>
          <div>Action</div>
        </div>
        {tasksArray && tasksArray.length === 0 ? (
          <div style={{ padding: "10px", textAlign: "center" }}>
            No tasks available
          </div>
        ) : (
          tasksArray &&
          tasksArray.map((item, index) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 3fr 2fr 2fr",
                padding: "10px",
                borderTop: "1px solid black",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <div>{index + 1}</div>
              <div>{item.task}</div>
              <div>{item.user_name || "-"}</div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() => handleUpdate(item.id)}
                  style={{
                    padding: "4px 6px",
                    backgroundColor: "#ff0000",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    padding: "4px 6px",
                    backgroundColor: "#58763a",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

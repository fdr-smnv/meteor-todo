import React, { useState } from "react";
import { TaskCollection } from "/imports/api/TaskCollection";

export const TaskForm = ({ userId }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) return;

    TaskCollection.insert({
      text: text.trim(),
      createdAt: new Date(),
      user: user._id,
    });

    setText("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

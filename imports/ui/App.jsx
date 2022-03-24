import React from "react";
import { TaskCollection } from "/imports/api/TaskCollection";
import { useTracker } from "meteor/react-meteor-data";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";

const tasks = [
  { _id: 1, text: "First Task" },
  { _id: 2, text: "Second Task" },
  { _id: 3, text: "Third Task" },
];

export const App = () => {
  const tasks = useTracker(() =>
    TaskCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );
  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      <TaskForm />

      <ul>
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

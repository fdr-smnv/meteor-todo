import React, { useState } from "react";
import { TaskCollection } from "/imports/api/TaskCollection";
import { useTracker } from "meteor/react-meteor-data";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { LoginForm } from "./LoginForm";

const hideCompletedFilter = { isChecked: { $ne: true } };
const toggleChecked = ({ _id, isChecked }) => {
  TaskCollection.update(_id, {
    $set: {
      isChecked: !isChecked,
    },
  });
};

const deleteTask = ({ _id }) => TaskCollection.remove(_id);

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const user = useTracker(() => Meteor.user());
  const pendingTasksCount = useTracker(() => {
    if (!user) return 0;

    return TaskCollection.find(hideCompletedFilter).count();
  });
  //   const tasks = useTracker(() =>
  //     TaskCollection.find(hideCompleted ? hideCompletedFilter : {}, {
  //       sort: { createdAt: -1 },
  //     }).fetch()
  //   );

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }

    return TaskCollection.find(hideCompleted ? pendingOnlyFilter : userFilter, {
      sort: { createdAt: -1 },
    }).fetch();
  });

  const logout = () => Meteor.logout();

  return (
    <div className="app">
      {user ? (
        <>
          <div className="user" onClick={logout}>
            {user.username} 🚪
          </div>
          <header>
            <div className="app-bar">
              <div className="app-header">
                <h1>
                  📝️ To Do List
                  {pendingTasksTitle}
                </h1>
              </div>
            </div>
          </header>

          <div className="main">
            <TaskForm user={user} />
            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div>

            <ul className="tasks">
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={toggleChecked}
                  onDeleteClick={deleteTask}
                />
              ))}
            </ul>
          </div>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

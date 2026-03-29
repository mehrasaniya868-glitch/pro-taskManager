import React from "react";

const TaskItem = ({ task, index, deleteTask }) => {
  return (
    <li>
      {task.text}
      <button onClick={() => deleteTask(index)}>Delete</button>
    </li>
  );
};

export default TaskItem;
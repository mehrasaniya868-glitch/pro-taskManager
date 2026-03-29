import React from "react";

function TaskInput({task, setTask,addTask ,editIndex,searchTerm,setSearchTerm ,dueDate,setDueDate,category,setCategory}) {
  return (
    <div className="input-section" >
      <input type="text" placeholder="Enter your task" value={task} onChange={(e) => setTask(e.target.value)} />            
      <button onClick={addTask} >{editIndex !== null ? "Update Task" : "Add Task"}  </button>
      <input type="text" placeholder="Search task..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <input type="date" value={dueDate} onChange={(e => setDueDate(e.target.value))}/>
      <select value ={category} onChange={(e) =>setCategory (e.target.value)}>
        <option value ="Study" >📚 Study</option>
        <option value ="Work" >💼Work</option>
        <option value ="Personal" > 🏠Personal</option>
      </select>
    </div>
  );
}
export default TaskInput;
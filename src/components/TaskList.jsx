import react from "react";
import TaskItem from "./componentsTaskItem";
function TaskList({tasks, deleteTask})
{
  return(
    
    <ul>
        {tasks.map((task, index) => (
            <TaskItem 
            key ={index}
            task={task}
            index ={index}
            deleteTask={deleteTask}
            />
          
        ))}
      
    </ul>
  );
}
export default TaskList;
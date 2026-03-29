import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import { Routes, Route } from "react-router-dom";
import WeeklyReport from "./components/WeeklyReport";
import { Link } from "react-router-dom";
import "./App.css";
function App() {

  const [dueDate, setDueDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const[category ,setCategory] =useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const[darkMode,setDarkMode] =useState(false);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
 
 
  const [filter, setFilter] = useState("All");
  const [priority, setPriority] = useState("Low");
  const [editIndex, setEditIndex] = useState(null);

 
  
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
const savedMode = localStorage.getItem("darkMode");
 useEffect (() => 
{
tasks.forEach((task) => {
if (!task.dueDate || task.completed)return;
 
const today = new Date();
const due = new Date(task.dueDate);
const daysDiff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
if (daysDiff > 0 && daysDiff <=3)
{
  alert (`⚠ Task "${task.text}" is due in ${daysDiff} days!`);
}
});
} ,[tasks]);
  

  function handleEdit(index) {
    setTaskInput(tasks[index].text);
    setPriority(tasks[index].priority);
    setDueDate(tasks[index].dueDate || ""); 
    setEditIndex(index);
  }

  function addTask() {
    if (taskInput === "") {
      alert("Please enter a task");
      return;
    }

    let autoPriority = "Low";
    const text = taskInput.toLowerCase();

    if (
      text.includes("study") ||
      text.includes(" preparation forexam") ||
      text.includes(" Submit assignment") ||
      text.includes("practical") ||
      text.includes("Project Work") ||
      text.includes("Medicine") ||
      text.includes("Doctor Appointment") ||
      text.includes("Meeting") ||
      text.includes("Skincare") ||
      text.includes("Health") ||
      text.includes("Fitness") ||
      text.includes("Exercise") ||
      text.includes("Workout") ||
      text.includes("Diet") ||
      text.includes("Medication") ||
      text.includes("Therapy") ||
      text.includes("Mental Health") ||
      text.includes("Self-care")
      

    ) {
      autoPriority = "High";
    } else if (
        text.includes("travel") ||
        text.includes("meeting") ||
        text.includes("friends") ||
        text.includes("family") ||
        text.includes("shopping") ||
        text.includes("entertainment") ||
        text.includes("hobby") ||
        text.includes("leisure") ||
        text.includes("social") ||
        text.includes("fun") ||
        text.includes("relaxation")
    ) {
      autoPriority = "Medium";
    }

    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) => {
        if (index === editIndex) {
          return {
            ...task,
            text: taskInput,
            priority: autoPriority,
            dueDate: dueDate,
            category:category ,
            
          };
        }
        return task;
      });
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([
        ...tasks,
        {
          text: taskInput,
          completed: false,
          priority: autoPriority,
          createdAt: new Date().toLocaleString(),
          dueDate: dueDate,
          category:category,
        },
      ]);
    }

    setTaskInput("");
    setDueDate("");
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function toggleComplete(index) {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed
            ? new Date().toLocaleString()
            : null,
        };
      }
      return task;
    });
    setTasks(newTasks);
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progress = totalTasks === 0 ? 0: (completedTasks /totalTasks) * 100 ;
  const pendingTasks = tasks.filter((t) => !t.completed).length;

  const filteredTasks = tasks.filter((task) => {

  const matchesFilter =
    filter === "Completed"
      ? task.completed
      : filter === "Pending"
      ? !task.completed
      : true;

  const matchesSearch =
    task.text.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesCategory =
    categoryFilter === "All" ||
    task.category?.toLowerCase() === categoryFilter.toLowerCase();

  return matchesFilter && matchesSearch && matchesCategory;
});
     const sortedTasks =[...filteredTasks].sort((a,b) => {
     if (!a.dueDate) return 1;
     if (!b.dueDate) return -1;

      return new Date(a.dueDate) - new Date(b.dueDate);
     })

  return (
    
      <Routes>
        
        <Route path="/" 
        element={
        <>
        <Link to="/report">
              <button>View Weekly Report</button>
        </Link>
        <button onClick ={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

         <div className ={darkMode ? "app dark" : "app"}>
          <h1>Task Manager</h1>

           <TaskInput
          task={taskInput}
          setTask={setTaskInput}
          addTask={addTask}
          editIndex={editIndex}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dueDate={dueDate}
          setDueDate={setDueDate}
          category={category}
          setCategory={setCategory}
        />
                
        <div className="filters">
          <button onClick={() => setFilter("All")} 
            className={filter === "All" ? "active" : ""}>
            All
          </button>
          <button onClick={() => setFilter("Completed")}
            className={filter === "Completed" ? "active" : ""}>
            Completed
          </button>
          <button onClick={() => setFilter("Pending")}
            className={filter === "Pending" ? "active" : ""}>
            Pending
          </button>
        </div>

        <ul>
          
          {filteredTasks.length === 0 ? (
            <li>No tasks found</li>
          ) : (
            sortedTasks.map((task, index) => {
              const today = new Date();
              const due = task.dueDate
                ? new Date(task.dueDate)
                : null;

              const daysDiff = due
                ? Math.ceil(
                    (due - today) /
                      (1000 * 60 * 60 * 24)
                  )
                : null;
                
                let label ="";
                if(due && !task.completed){
                  if(daysDiff === 0){
                    label="📅 Today";

                  }else if (daysDiff === 1)
                  {
                    label ="📅Tomorrow";
                  } else if (daysDiff === -1) {
                    label ="❌ Yesterday";
                  } else if (daysDiff > 1){
                    label =`⏳ ${daysDiff} days left`;
                  }  else if (daysDiff <-1){
                     label = `⚠ Overdue (${Math.abs(daysDiff)} days late)`;
                  }
                 
                }

              const isOverdue =
                due && !task.completed && due < today;
            
                return(
                  
              
        <li
          key={index}
          style={{
            backgroundColor: isOverdue ? "#ffe5e5" : "#ffffff",
            margin: "10px 0",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            color: "#333"
          }}
        >
         <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
  
    <span style={{
    padding: "4px 10px",
    borderRadius: "10px",
    fontSize: "12px",
    color: "white",
    background:
      task.priority === "High"
        ? "red"
        : task.priority === "Medium"
        ? "orange"
        : "green"
  }}>
    {task.priority}
  </span>

  <span style={{ fontWeight: "bold",fontSize: "16px", color: "#333", background: "#f5f5f5",
  padding: "4px 8px",
  borderRadius: "6px"}}>
    {task.text}
  </span>

</div>

          <div>
            <p style ={{color : "#555"}}>
                      Added:{" "}
                      {task.createdAt || "N/A"}
                    </p>

                    {task.completed && (
                      <p style={{color: "#555" }}>
                        Completed:{" "}
                        {task.completedAt}
                      </p>
                    )}
          </div>

          <div>
            <p>
              Due:{" "}
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No Deadline"}
            </p>

              {due && !task.completed && (
              <p style={{ color : daysDiff < 0 ? "red" : "green" , fontWeight : "bold"}}>
                {label}
              </p>
            )}
          </div>

          <div>

                   <button onClick={() =>toggleComplete(index)}>
                      Complete
                    </button>

                    <button onClick={() =>  deleteTask(index)} >
                      
                      Delete
                    </button>
                    
                    <button onClick={() =>  handleEdit(index)}>
                      Edit
                    </button>
         </div>
                   </li>
  
           );
            })
          )}
          </ul>
          <div>
           <div style=
           {{ height: "10px",
             backgroundColor: "#eee", 
             borderRadius: "5px",
              overflow: "hidden",
            marginTop: "10px"}}>

           <div style={{ width: `${progress}%`,
            backgroundColor: "green" ,
             transition: "width 0.3s ease",
           borderRadius: "10px" }}>
           </div>

         </div>
          <p style={{ marginTop: "5px",
             fontWeight: "bold" }} >
             {Math.round(progress)}% Completed</p>
          </div>

          </div>
        <div style={{
  position: "fixed",
  top: "20px",
  right: "20px",
  display: "flex",
  gap: "15px",
  zIndex: 9999
}}>
  
  <div style={{
    backgroundColor: "#3498db",
    color: "white",
    padding: "10px 18px",
    borderRadius: "25px",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  }}>
    📊 {totalTasks}
  </div>

  <div style={{
    backgroundColor: "#2ecc71",
    color: "white",
    padding: "10px 18px",
    borderRadius: "25px",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  }}>
    ✅ {completedTasks}
  </div>

  <div style={{
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "10px 18px",
    borderRadius: "25px",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  }}>
    ⏳ {pendingTasks}
  </div>

</div>
        </>
        }
        />
        <Route path ="/report" element={
          <WeeklyReport tasks={tasks} />
        }/>
        
      </Routes>
     
      );
    }    
export default App;
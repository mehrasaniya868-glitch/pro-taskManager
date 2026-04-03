const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); 
const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://mehrasaniya868_db_user:saniya123@cluster0.uut00t6.mongodb.net/taskManager")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
  createdAt: String,
  completedAt: String,
  dueDate: String,      
  priority: String,     
  category: String     
});
const Task = mongoose.model("Task", taskSchema);
let tasks = [];

app.get("/tasks", async (req, res) => {
  const tasks =await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {

  if (!req.body.text) {
    return res.status(400).json({ message: "Task text required" });
  }
  const newTask =new Task({
    text :req.body.text,
    completed :false,
    createdAt : new Date().toLocaleString(),
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    category: req.body.category
    
  });
  await newTask.save();
  res.json({
    message: "Task added successfully",
    task: newTask
  });

  // res.json({
  //   message: "Task added successfully",
  //   tasks: tasks
  // });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.delete("/tasks/:id", async (req,res) => {
    await Task.findByIdAndDelete( req.params.id);
    res.json({message : "Task deleted successfully"});

});
app.patch("/tasks/:id",async(req,res)=>{
 const task = await Task.findById(req.params.id);
 if(!task) {
  return res.status(404).json({message: "Task not found" });
 }
if (req.body.text !== undefined) task.text = req.body.text;
if (req.body.priority !== undefined) task.priority = req.body.priority;
if (req.body.dueDate !== undefined) task.dueDate = req.body.dueDate;
if (req.body.category !== undefined) task.category = req.body.category;
if (req.body.completed !== undefined){
  task.completed =req.body.completed;
  task.completedAt = req.body.completed ? new Date().toLocaleString() : null;
}
  await task.save();
res.json(task);
});


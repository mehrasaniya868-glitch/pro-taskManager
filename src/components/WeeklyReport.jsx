import React, { useEffect, useState } from 'react'
import "./WeeklyReport.css";

const WeeklyReport = ({tasks}) => {
  const[selectedDay, setSelectedDay] = useState(null);
    const days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const weeklyData ={
        Sunday : 0,
        Monday : 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0
    };
    tasks.forEach(task =>{
        if(task.completed && task.completedAt) {
            const date = new Date(task.completedAt);
          if (!isNaN(date)) {
          const day = days[date.getDay()];
          weeklyData[day]++;
        
        }   
        }
    });

     const filteredTasks =tasks.filter(task =>
     {
      if(!task.completed || !task.completedAt || !selectedDay) return false;
       const date =new Date(task.completedAt);
       const day = days[date.getDay()];

       return day === selectedDay;
     });

     return (
    <div className="weekly-container">
      
      <h2 className="weekly-title">Weekly Report</h2>

      {days.map(day=>
      (
        <div 
        key={day}
        onClick={() => setSelectedDay(day)}
        className= {`day-item ${selectedDay === day ? "day-active" : ""}`}
        >
          {day}: {weeklyData[day]} tasks completed
        </div>
      ))}
       {selectedDay && (
        <div className="task-list">
          <h3>{selectedDay} Tasks</h3>
          {filteredTasks.length === 0 ? (
            <p>No Tasks</p>

       
          ) :(
            filteredTasks.map((task,index) => (
           <div key ={index}  className =" task-card"style={{marginBottom :"10px"}}>
            <p className='task-title'> <b>{task.text}</b></p>
            <p className='task'>Completed at :{task.completedAt}</p>
          </div>
      
      ))
    )}
    </div>
  )}
  </div>
);
};

export default WeeklyReport;
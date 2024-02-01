
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import DateFilter from './components/DateFilter';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    
    const dummyTasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', date: '2024-02-01' },
      { id: 2, title: 'Task 2', description: 'Description 2', date: '2024-02-01' },
     
    ];
    setTasks(dummyTasks);
  }, []);

  useEffect(() => {
 
    const filtered = tasks.filter(task => task.date === formatDate(selectedDate));
    setFilteredTasks(filtered);
  }, [tasks, selectedDate]);

  const formatDate = date => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const addTask = task => {
    setTasks([...tasks, task]);
  };

  const editTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const onDragEnd = result => {
    
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h1>Task Manager</h1>
        <DateFilter selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        <AddTaskForm onAddTask={addTask} />
        <TaskList
          tasks={filteredTasks}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
          onDragEnd={onDragEnd}
        />
      </div>
    </DndProvider>
  );
};

export default App;

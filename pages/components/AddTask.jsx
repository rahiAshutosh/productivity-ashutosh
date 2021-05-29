import React, { useState } from "react";

const AddTask = () => {
  const [task, setTask] = useState('');

  const handleAddTask = (e) => {
    setTask(e.target.value);
  };

  return (
    <div className="add-task-container">
      Welcome!
      <input
        value={task}
        placeholder="What is your focus for today?"
        onChange={handleAddTask}
      />
    </div>
  );
};

export default AddTask;
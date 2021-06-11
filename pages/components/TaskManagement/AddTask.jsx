import React, { useMemo, useState } from "react";
import { Drawer, Input, Select } from "antd";
import { func, arrayOf, shape } from "prop-types";
import { COLUMNS } from "../../../utils/constants";

const AddTask = ({
  handleAddTask,
  allTasks
}) => {
  const [taskName, setTaskName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todo');
  const [error, setError] = useState({});
  const [showAddTask, setShowAddTask] = useState(false);

  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const validateInputs = () => {
    // Cannot add task with existing name
    if (allTasks.find((t) => t.name.trim().toLowerCase() === taskName.trim().toLowerCase())) {
      setError({ taskName: 'A task already exists with given name' });
      return false;
    }
    // Cannot add task with empty name
    if(!taskName.trim()) {
      setError({ taskName: 'Please give your task a valid name' });
      return false;
    }
    // Since category is a select with pre-selected value, there's no way to have wrong value for it.
    setError({});
    return true;
  };

  const addTask = () => {
    if (validateInputs()) {
      handleAddTask({ name: taskName, category: selectedCategory });
      toggleShowAddTask();
    }
  };

  const toggleShowAddTask = () => {
    setShowAddTask(v => !v);
  };

  const handleOnChangeName = (e) => setTaskName(e.target.value);

  const addButton = useMemo(() => {
    return (
      <button
        className="primary w-100"
        type="submit"
        onClick={addTask}
      >
        Add Task
      </button>
    );
  }, [addTask]);

  return (
    <div className="add-task-container">
      <div className="primary-row">
        <div className="today-date">
          {new Date().toDateString()}
        </div>
        <div>
          <button className="primary" onClick={toggleShowAddTask}>
            +ADD NEW TASK
          </button>
        </div>
      </div>
      <Drawer
        width="30vw"
        title="Add Task"
        placement="right"
        visible={showAddTask}
        footer={addButton}
        onClose={toggleShowAddTask}
      >
        <Input size="large" placeholder="Task Name" onChange={handleOnChangeName} />
        <Select
          size="large"
          className="w-100 mt-2"
          value={selectedCategory}
          onChange={handleChangeCategory}
          options={COLUMNS.map((col) => ({ label: col.name, value: col.id }))} 
        />        
        <div className="error-feedback">{error.taskName}</div>
      </Drawer>
    </div>
  );
};

AddTask.propTypes = {
  handleAddTask: func.isRequired,
  allTasks: arrayOf(shape({}))
};

AddTask.defaultProps = {
  allTasks: []
};

export default AddTask;
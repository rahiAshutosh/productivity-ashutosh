import React, { Component } from "react";
import { COLUMNS, TASKS } from "../../../utils/constants";
import AddTask from "./AddTask";
import Search from "./Search";
import TaskCard from "./TaskCard";

class TaskManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: TASKS,
      searchQuery: ''
    };
    this.commitToLocalStorage = this.commitToLocalStorage.bind(this);
  }

  commitToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  initializeTasks = () => {
    const obTasks = localStorage.getItem('tasks');
    const searchQuery = localStorage.getItem('searchQuery');
    this.setState({
      tasks: obTasks ? JSON.parse(obTasks) : TASKS,
      searchQuery: searchQuery ? JSON.parse(searchQuery) : ''
    });
  };
  
  componentDidMount() {
    this.initializeTasks();
    // Before the user closes/refreshes the tab, commit the changes to local storage
    window.addEventListener("beforeunload", this.commitToLocalStorage);
  }
  
  componentWillUnmount() {
    // Cleanup
    window.removeEventListener("beforeunload", this.commitToLocalStorage);
  }

  onAddTask = (task) => {
    const { tasks } = this.state;
    let tasksClone = [...tasks].concat({ name: task?.name, category: task?.category });
    this.setState({
      tasks: tasksClone
    });
  };

  onDeleteTask = (task) => {
    const { tasks } = this.state;
    let tasksClone = [...tasks].filter((t) => t.name !== task?.name);
    this.setState({
      tasks: tasksClone
    });
  };

  onChangeQuery = (e) => {
    this.setState({
      searchQuery: e.target.value
    });
  };

  onChangeCategory = (taskName, newCategoryId) => {
    const { tasks } = this.state;
    let tasksClone = [...tasks].filter((task) => {
      if (task.name === taskName) {
        task.category = newCategoryId;
      }
      return task;
    });
    this.setState({
      tasks: tasksClone
    });
  };

  handleTaskDrop = (e, newCategoryId) => {
    let taskName = e.dataTransfer.getData("taskName");
    this.onChangeCategory(taskName, newCategoryId);
  };

  handleTaskDragOver = (e) => {
    e.preventDefault();
  };

  handleTaskDragStart = (e, task) => {
    e.dataTransfer.setData("taskName", task?.name);
  };

  render() {
    const { searchQuery, tasks } = this.state;
    const tasksMap = {
      'todo': [],
      'inprogress': [],
      'complete': []
    };

    tasks.forEach((t) => {
      const { name, category } = t;
      // Filtering happens here as user types in the search query
      if ((!searchQuery.trim()) || (name.trim().toLowerCase().includes(searchQuery.trim().toLowerCase()))) {
        tasksMap[category].push(
          <TaskCard
            key={`TASK_ITEM_${name}`}
            task={t}
            onDragStart={(e) => this.handleTaskDragStart(e, t)}
            onChangeCategory={this.onChangeCategory}
            onDelete={this.onDeleteTask}
          />
        );
      }
    });

    return (
      <div>
        <AddTask
          allTasks={tasks}
          handleAddTask={this.onAddTask}
        />
        <Search searchQuery={searchQuery} handleChangeQuery={this.onChangeQuery} />
        <div className="tasks-list-container">
          {
            COLUMNS.map((col) => {
              const handleDrop = (e) => this.handleTaskDrop(e, col.id);
              const handleDragOver = (e) => this.handleTaskDragOver(e);
              const colTasks = tasksMap[col.id];

              return (
                <div
                  key={`TASK_LIST_${col.id}`}
                  className="task-list"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <span className="task-header">{col.name} ({colTasks.length})</span>
                  {colTasks}
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default TaskManagement;

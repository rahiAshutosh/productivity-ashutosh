import React from "react";
import { func, shape } from "prop-types";
import { COLUMNS } from "../../../utils/constants";

const TaskCard = ({
  task,
  onDragStart,
  onChangeCategory,
  onDelete
}) => {
  const { name, category } = task;

  const handleChangeCategory = (e) => {
    onChangeCategory(task?.name, e.target.value);
  };

  const handleDelete = () => {
    onDelete(task);
  };

  return (
    <div
      key={name}
      draggable
      className="task-card"
      onDragStart={onDragStart}
    >
      <div className="task-detail-row">
        <div className="task-name">{name}</div>
        <div className="task-delete" onClick={handleDelete}>Delete</div>
      </div>
      <div className="task-category">
        <select className="small" value={category} onChange={handleChangeCategory}>
          {COLUMNS.map((col) => <option key={`CAT_OPTION_${col.id}`} value={col.id}>{col.name}</option>)}
        </select>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: shape({}).isRequired,
  onDragStart: func.isRequired,
  onChangeCategory: func.isRequired,
  onDelete: func.isRequired,
};

export default TaskCard;
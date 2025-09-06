import styles from "./TaskItem.module.css";
import type { Task } from "./App";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

function TaskItem({ task, onToggleComplete, onDeleteTask }: TaskItemProps) {
  return (
    <li
      className={`${styles["task-item"]} ${
        task.completed ? styles.completed : ""
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      <span>{task.text}</span>
      <button onClick={() => onDeleteTask(task.id)}>Excluir</button>
    </li>
  );
}

export default TaskItem;

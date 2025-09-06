import { useState } from "react";
import "./App.css";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

// Definimos os tipos de filtro
type FilterType = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  // Novo estado para o filtro, com valor inicial 'all'
  const [filter, setFilter] = useState<FilterType>("all");

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  // 1. Função para marcar ou desmarcar uma tarefa como concluída
  const handleToggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 2. Função para deletar uma tarefa
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 3. Lógica para filtrar as tarefas
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true; // Retorna todas as tarefas se o filtro for 'all'
  });

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <TaskForm onAddTask={handleAddTask} />
      {/* Botões de filtro */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("active")}>Pendentes</button>
        <button onClick={() => setFilter("completed")}>Concluídas</button>
      </div>
      <ul>
        {/* Renderizamos a lista filtrada */}
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;

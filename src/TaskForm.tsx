import { useState } from "react";
import styles from "./TaskForm.module.css";

// Adicionamos a tipagem da prop que o componente irá receber
interface TaskFormProps {
  onAddTask: (text: string) => void;
}

// Recebemos a prop no parâmetro da função
function TaskForm({ onAddTask }: TaskFormProps) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Chamamos a função que foi passada como prop
    onAddTask(inputValue);

    // Limpa o campo de entrada
    setInputValue("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Adicionar nova tarefa..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default TaskForm;

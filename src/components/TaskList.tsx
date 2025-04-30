// Types
import { Task } from "@/types/task";

const TaskList = ({
  tasks,
  onToggle,
  onDelete,
  onEdit,
}: {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}) => {
  if (tasks?.length === 0) {
    return <p className="mt-5 text-center text-white">No tasks to display.</p>;
  }

  return (
    <ul style={{ marginTop: 30 }}>
      {tasks.map((t) => (
        <li className="mt-2" key={t.id}>
          <input
            type="checkbox"
            checked={t.status === "Done"}
            style={{ marginRight: 10 }}
            onChange={() => onToggle(t.id)}
          />
          <span
            style={{
              textDecoration: t.status === "Done" ? "line-through" : "none",
            }}
          >
            {t.title} ({t.priority}) [{t.recurrence}]
          </span>
          <button
            style={{
              border: "1px solid white",
              padding: "4px",
              borderRadius: "4px",
              marginLeft: 10,
              marginRight: 10,
            }}
            onClick={() => onEdit(t)}
          >
            Edit
          </button>
          <button
            style={{
              border: "1px solid white",
              padding: "4px",
              borderRadius: "4px",
              marginLeft: 10,
            }}
            onClick={() => onDelete(t.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;

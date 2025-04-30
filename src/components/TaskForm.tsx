"use client";

import React, { useEffect, useState } from "react";

// Type
import { Task } from "@/types/task";

type Props = {
  onAdd: (task: Task) => void;
  onUpdate?: (id: string, updates: Partial<Task>) => void;
  initialData?: Task | null;
};

const TaskForm = ({ onAdd, onUpdate, initialData }: Props) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");
  const [recurrence, setRecurrence] = useState<
    "None" | "Daily" | "Weekly" | "Monthly"
  >("None");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setPriority(initialData.priority);
      setRecurrence(initialData.recurrence);
    } else {
      setTitle("");
      setPriority("Low");
      setRecurrence("None");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (initialData && onUpdate) {
      onUpdate(initialData.id, {
        title,
        priority,
        recurrence,
      });
    } else {
      onAdd({
        id: "",
        title,
        priority,
        recurrence,
        status: "Not Done",
        dependency: [],
        createdAt: new Date(),
      });
    }

    setTitle("");
    setPriority("Low");
    setRecurrence("None");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Task Title : </label>
        <input
          className="border border-white px-2 py-1 rounded bg-transparent text-white placeholder-white"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="priority">Priority : </label>
        <select
          className="mt-5 border border-white px-2 py-1 rounded text-white placeholder-white"
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div>
        <label htmlFor="recurrence">Recurrence : </label>
        <select
          className="mt-5 border border-white px-2 py-1 rounded text-white placeholder-white"
          id="recurrence"
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
        >
          <option value="None">None</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      <button
        className="mt-5 border border-white px-2 py-1 rounded bg-white  text-black placeholder-white w-full"
        type="submit"
      >
        {initialData ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;

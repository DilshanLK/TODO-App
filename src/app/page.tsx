"use client";

import { useState } from "react";

// Components
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

// Type
import { Task } from "@/types/task";

// Utility
import { generateUniqueId } from "@/utility/generateUniqueId";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [sortBy, setSortBy] = useState<"priority" | "status" | "createdAt">(
    "createdAt"
  );

  const addTask = (task: Task) => {
    setTasks((prev) => [
      ...prev,
      { ...task, id: generateUniqueId(), createdAt: new Date() },
    ]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
    setTaskToEdit(null);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Done" ? "Not Done" : "Done" }
          : t
      )
    );
  };

  const sortedTasks = tasks
    .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "priority") {
        const weight = { High: 3, Medium: 2, Low: 1 };
        return weight[b.priority] - weight[a.priority];
      }
      if (sortBy === "status") {
        return (a.status === "Done" ? 1 : 0) - (b.status === "Done" ? 1 : 0);
      }
      return +new Date(b.createdAt) - +new Date(a.createdAt);
    });

  return (
    <>
      <div className="pt-10">
        {/* Task input form */}
        <TaskForm
          onAdd={addTask}
          onUpdate={updateTask}
          initialData={taskToEdit}
        />
        <div className="text-center">
          <input
            type="text"
            placeholder="Search..."
            className="mt-5 border border-white px-2 py-1 rounded text-white placeholder-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="mt-5 border border-white px-2 py-1 rounded text-white placeholder-white ml-5"
          >
            <option value="createdAt">Latest</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </div>
        <h1 className="mt-5 text-center">TODO List</h1>
        {/* Task List */}
        <TaskList
          tasks={sortedTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={setTaskToEdit}
        />
      </div>
    </>
  );
}

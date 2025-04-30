export type Priority = "Low" | "Medium" | "High";
export type Status = "Done" | "Not Done";
export type Recurrence = "None" | "Daily" | "Weekly" | "Monthly";

export interface Task {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  recurrence: Recurrence;
  dependency: string[];
  createdAt: Date;
}

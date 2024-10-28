export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

export type TodoFilter = "all" | "active" | "completed";

export const InitialStatus = {
  Planning: "Planning",
  InProgress: "In Progress",
  Completed: "Completed",
} as const;

export const PriorityLevel = {
  Low: "Low",
  Medium: "Medium",
  High: "High",
} as const;

export type InitialStatus = typeof InitialStatus[keyof typeof InitialStatus];
export type PriorityLevel = typeof PriorityLevel[keyof typeof PriorityLevel];

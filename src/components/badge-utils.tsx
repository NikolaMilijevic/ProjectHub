export const getBadgeClass = (type: string, value: string) => {
  const statusColors: Record<string, string> = {
    Planning: "bg-yellow-300 text-yellow-700 mr-3 rounded-2xl",
    "In Progress": "bg-blue-300 text-blue-700 mr-3 rounded-2xl",
    Completed: "bg-green-300 text-green-700 mr-3 rounded-2xl",
  };

  const priorityColors: Record<string, string> = {
    Low: "bg-green-300 text-green-700 rounded-2xl",
    Medium: "bg-orange-300 text-orange-700 rounded-2xl",
    High: "bg-red-300 text-red-700 rounded-2xl",
  };

  return type === "status" ? statusColors[value] || "" : priorityColors[value] || "";
};
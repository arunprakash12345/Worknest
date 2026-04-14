const validateValues = (
  title,
  description,
  type,
  priority,
  status,
  dueDate,
) => {
  if (!title.trim()) return "Task title is required";

  if (!description.trim()) return "Description is required";

  if (!type) return "Task type is required";

  if (!priority) return "Priority is required";

  if (!status) return "Status is required";

  if (!dueDate) return "Due date is required";

  return "";
};

export default validateValues;

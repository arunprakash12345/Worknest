export const validateBatchValues = (
  title,
  description,
  category,
  startDate,
  endDate,
) => {
  if (!title.trim()) return "Batch title is required";
  if (!description.trim()) return "Description is required";
  if (!category.trim()) return "Category is required";
  if (!startDate) return "Start date is required";
  if (!endDate) return "End date is required";

  return "";
};

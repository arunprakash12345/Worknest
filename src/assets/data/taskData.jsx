export const taskColumns = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "type",
    label: "Type",
    render: (item) => (
      <span className="text-green-600 font-medium">{item.type}</span>
    ),
  },
  {
    key: "priority",
    label: "Priority",
    render: (item) => (
      <span className="px-3 py-1 rounded-md bg-blue-100 text-blue-600 text-sm">
        {item.priority}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "assignee",
    label: "Assignee",
    render: (item) => (
      <div className="flex items-center gap-2">
        <img
          src={item.assignee.image}
          alt={item.assignee.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span>{item.assignee.name}</span>
      </div>
    ),
  },
  {
    key: "dueDate",
    label: "Due Date",
  },
];

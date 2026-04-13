const DataTable = ({ columns, data, onRowClick }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 mt-4">
      <table className="w-full">
        <thead className="border-b border-zinc-200 bg-zinc-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-2 text-left text-sm font-medium text-zinc-800"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick && onRowClick(item)}
              className={`border-b border-zinc-200 transition text-sm ${
                onRowClick ? "cursor-pointer hover:bg-zinc-50" : ""
              }`}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-2 text-sm">
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

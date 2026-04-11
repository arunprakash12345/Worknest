import React from "react";

const DataTable = ({ columns, data }) => {
  return (
    <div className="w-full mt-6">
      <div className="w-full">
        <div className="hidden sm:block overflow-x-auto rounded-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-2.5 text-left font-medium text-sm text-zinc-800"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-2.5 whitespace-nowrap"
                    >
                      {column.key === "name" ? (
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="size-7 rounded-full bg-gray-200 object-cover"
                          />
                          <span className="text-sm text-zinc-800 truncate">
                            {item.name}
                          </span>
                        </div>
                      ) : column.key === "email" ? (
                        <span className="text-sm text-gray-500">
                          {item.email}
                        </span>
                      ) : column.key === "role" ? (
                        <span className="px-2 py-1 text-xs rounded-md bg-purple-100 text-purple-500">
                          {item.role}
                        </span>
                      ) : (
                        item[column.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sm:hidden space-y-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-4 border border-gray-200 rounded-md bg-white"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-9 rounded-full bg-gray-200 object-cover"
                />

                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </div>
              </div>

              <div>
                <span className="px-2 py-1 text-xs rounded-md bg-purple-100 text-purple-500">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataTable;

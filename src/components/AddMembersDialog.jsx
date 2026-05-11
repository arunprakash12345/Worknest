import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { XIcon } from "lucide-react";

const AddMembersDialog = ({
  isOpen,
  setIsOpen,
  projectId,
  onMembersAdded,
  existingMembers,
}) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5002/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // already added member ids
        const existingMemberIds = existingMembers.map(
          (member) => member.user?._id || member.user
        );

        // remove already added users
        const filteredUsers = data.filter(
          (user) => !existingMemberIds.includes(user._id)
        );

        setUsers(filteredUsers);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load users");
      }
    };

    fetchUsers();
  }, [existingMembers]);

  const handleAddMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("SELECTED USERS:", selectedUsers);
      const res = await fetch(
        `http://localhost:5002/api/batches/${projectId}/members`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            memberIds: selectedUsers,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Members added successfully");

      onMembersAdded();

      setIsOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 w-full max-w-lg relative">
        <button
          className="absolute top-3 right-3"
          onClick={() => setIsOpen(false)}
        >
          <XIcon className="size-5" />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Add Members</h2>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                <span className="text-2xl">🎉</span>
              </div>

              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
                All members already added
              </h3>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                No more users available to add
              </p>
            </div>
          ) : (
            users.map((user) => (
              <label
                key={user._id}
                className="flex items-center gap-3 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
              >
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() =>
                    setSelectedUsers((prev) =>
                      prev.includes(user._id)
                        ? prev.filter((id) => id !== user._id)
                        : [...prev, user._id]
                    )
                  }
                />

                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
                    {user.name}
                  </p>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {user.email}
                  </p>
                </div>
              </label>
            ))
          )}
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <button
            onClick={() => setIsOpen(false)}
            className="px-5 py-2 text-sm rounded border border-zinc-300 dark:border-zinc-700"
          >
            Cancel
          </button>

          <button
            onClick={handleAddMembers}
            className="px-5 py-2 text-sm rounded bg-gradient-to-br from-blue-500 to-blue-600 text-white"
          >
            Add Members
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMembersDialog;

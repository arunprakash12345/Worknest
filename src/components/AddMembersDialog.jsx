import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { XIcon, Trash2, UserPlus, Users, AlertTriangle } from "lucide-react";
import { getAvatarGradient, getInitials } from "../utils/avatar";

const AddMembersDialog = ({ isOpen, setIsOpen, projectId, onMembersAdded, existingMembers }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("add");
  const [removingMember, setRemovingMember] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isMentor = currentUser?.role === "MENTOR" || currentUser?.role === "ADMIN";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const existingMemberIds = existingMembers.map((m) => m.user?._id || m.user);
        setUsers(data.filter((u) => !existingMemberIds.includes(u._id)));
      } catch (err) {
        toast.error("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };
    if (isOpen) {
      fetchUsers();
      setSelectedUsers([]);
    }
  }, [existingMembers, isOpen]);

  const handleAddMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/batches/${projectId}/members`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ memberIds: selectedUsers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Members added");
      onMembersAdded();
      setIsOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      setRemovingMember(memberId);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/batches/${projectId}/members/${memberId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Member removed");
      onMembersAdded();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setRemovingMember(null);
    }
  };

  if (!isOpen) return null;

  // Check if any member has active tasks
  const membersWithActiveTasks = existingMembers.filter((m) => m.activeTasks > 0);

  return (
    <div className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 w-full max-w-lg relative">
        <button className="absolute top-3 right-3" onClick={() => setIsOpen(false)}>
          <XIcon className="size-5" />
        </button>
        <h2 className="text-xl font-medium mb-4">Manage Members</h2>
        
        <div className="flex gap-2 mb-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1">
          <button 
            onClick={() => setActiveTab("add")} 
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md transition ${
              activeTab === "add" ? "bg-white dark:bg-zinc-800 shadow text-zinc-900 dark:text-white" : "text-zinc-500"
            }`}
          >
            <UserPlus className="size-4" /> Add
          </button>
          <button 
            onClick={() => setActiveTab("current")} 
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md transition ${
              activeTab === "current" ? "bg-white dark:bg-zinc-800 shadow text-zinc-900 dark:text-white" : "text-zinc-500"
            }`}
          >
            <Users className="size-4" /> Current ({existingMembers.length})
          </button>
        </div>

        {activeTab === "add" && (
          <div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {loadingUsers ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-sm text-zinc-500">Loading users...</div>
                </div>
              ) : users.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span className="text-2xl mb-2">🎉</span>
                  <h3 className="text-sm font-medium">All members already added</h3>
                </div>
              ) : (
                users.map((u) => (
                  <label 
                    key={u._id} 
                    className="flex items-center gap-3 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  >
                    <input 
                      type="checkbox" 
                      checked={selectedUsers.includes(u._id)} 
                      onChange={() => setSelectedUsers((p) => p.includes(u._id) ? p.filter((i) => i !== u._id) : [...p, u._id])} 
                      className="accent-blue-500" 
                    />
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarGradient(u.name || u.email)} flex items-center justify-center text-white text-sm font-medium`}>
                      {getInitials(u.name)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{u.name}</p>
                      <p className="text-xs text-zinc-500">{u.email}</p>
                    </div>
                  </label>
                ))
              )}
            </div>
            <div className="flex justify-end gap-3 pt-6">
              <button onClick={() => setIsOpen(false)} className="px-5 py-2 text-sm rounded border border-zinc-300 dark:border-zinc-700">
                Cancel
              </button>
              <button 
                onClick={handleAddMembers} 
                disabled={!selectedUsers.length} 
                className="px-5 py-2 text-sm rounded bg-blue-500 text-white disabled:opacity-50"
              >
                Add ({selectedUsers.length})
              </button>
            </div>
          </div>
        )}

        {activeTab === "current" && (
          <div>
            {/* Warning banner for members with active tasks */}
            {membersWithActiveTasks.length > 0 && (
              <div className="flex items-start gap-3 mb-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                <AlertTriangle className="size-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    Members with active tasks
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                    {membersWithActiveTasks.length} member{membersWithActiveTasks.length > 1 ? "s have" : " has"} active tasks assigned. 
                    Complete or reassign their tasks before removing them.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {existingMembers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Users className="size-8 text-zinc-400 mb-2" />
                  <h3 className="text-sm font-medium">No members yet</h3>
                </div>
              ) : (
                existingMembers.map((member) => {
                  const mu = member.user;
                  const mId = mu?._id || member.user;
                  const hasActiveTasks = member.activeTasks > 0;
                  
                  return (
                    <div 
                      key={mId} 
                      className={`flex items-center justify-between border rounded-lg px-4 py-3 ${
                        hasActiveTasks 
                          ? "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20" 
                          : "border-zinc-200 dark:border-zinc-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarGradient(mu?.name || mu?.email)} flex items-center justify-center text-white text-sm font-medium`}>
                          {getInitials(mu?.name)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{mu?.name || "Unknown"}</p>
                          <p className="text-xs text-zinc-500">{mu?.email || ""}</p>
                          {hasActiveTasks && (
                            <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                              {member.activeTasks} active task{member.activeTasks > 1 ? "s" : ""}
                            </p>
                          )}
                        </div>
                      </div>
                      {isMentor && (
                        <button 
                          onClick={() => handleRemoveMember(mId)} 
                          disabled={removingMember === mId || hasActiveTasks}
                          title={hasActiveTasks ? "Cannot remove - has active tasks" : "Remove member"}
                          className={`p-2 rounded transition disabled:opacity-50 ${
                            hasActiveTasks 
                              ? "text-zinc-300 dark:text-zinc-600 cursor-not-allowed" 
                              : "hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500"
                          }`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <div className="flex justify-end pt-6">
              <button onClick={() => setIsOpen(false)} className="px-5 py-2 text-sm rounded border border-zinc-300 dark:border-zinc-700">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddMembersDialog;

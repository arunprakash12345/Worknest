// 10 gradient color pairs for avatars
const GRADIENTS = [
  "from-red-500 to-orange-500",
  "from-orange-500 to-amber-500",
  "from-amber-500 to-yellow-500",
  "from-emerald-500 to-teal-500",
  "from-teal-500 to-cyan-500",
  "from-cyan-500 to-blue-500",
  "from-blue-500 to-indigo-500",
  "from-indigo-500 to-purple-500",
  "from-purple-500 to-pink-500",
  "from-pink-500 to-rose-500",
];

/**
 * Get a consistent gradient class based on a string (name, id, email)
 * @param {string} identifier - String to hash for consistent color
 * @returns {string} Tailwind gradient classes
 */
export const getAvatarGradient = (identifier = "") => {
  const str = String(identifier).toLowerCase();
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % GRADIENTS.length;
  return GRADIENTS[index];
};

/**
 * Get initials from a name (first two letters or first letter of first two words)
 * @param {string} name - Full name
 * @returns {string} 1-2 character initials
 */
export const getInitials = (name = "") => {
  if (!name) return "?";
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

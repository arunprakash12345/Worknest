import FolderOpenIcon from "../utils/icons/FolderOpenIcon";
import CheckCircleIcon from "../utils/icons/CheckCircleIcon";
import ActivityIcon from "../utils/icons/ActivityIcon";
import UsersIcon from "../utils/icons/UsersIcon";

const batchDetailspageData = [
  {
    title: "Total Tasks",
    subText: "",
    img: <FolderOpenIcon width="14" height="14" color="text-blue-500" />,
    value: "0",
    iconBg: "bg-gray-500/10",
  },
  {
    title: "Completed",
    subText: "",
    img: <CheckCircleIcon width="14" height="14" color="text-green-500" />,
    value: "0",
    iconBg: "bg-green-500/10",
  },
  {
    title: "In Progress",
    subText: "",
    img: <ActivityIcon width="14" height="14" color="text-purple-500" />,
    value: "0",
    iconBg: "bg-purple-500/10",
  },
  {
    title: "Team members",
    subText: "",
    img: <UsersIcon width="14" height="14" color="text-blue-500" />,
    value: "0",
    iconBg: "bg-blue-500/10",
  },
];

export default batchDetailspageData;

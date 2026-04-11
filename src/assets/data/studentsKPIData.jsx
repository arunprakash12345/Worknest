import UsersIcon from "../utils/icons/UsersIcon";
import ActivityIcon from "../utils/icons/ActivityIcon";
import ShieldIcon from "../utils/icons/ShieldIcon";
const studentsKPIData = [
  {
    title: "Total Members",
    subText: "",
    img: <UsersIcon width="14" height="14" color="text-blue-500" />,
    value: "1",
    iconBg: "bg-blue-500/10",
  },
  {
    title: "Active Projects",
    subText: "",
    img: <ActivityIcon width="14" height="14" color="text-green-500" />,
    value: "0",
    iconBg: "bg-green-500/10",
  },
  {
    title: "My Tasks",
    subText: "",
    img: <ShieldIcon width="14" height="14" color="text-purple-500" />,
    value: "0",
    iconBg: "bg-purple-500/10",
  },
];

export default studentsKPIData;

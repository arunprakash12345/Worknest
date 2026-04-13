import CheckCircleIcon from "../utils/icons/CheckCircleIcon";
import TriangleAlertIcon from "../utils/icons/TriangleAlertIcon";
import StudentsIcon from "../utils/icons/UsersIcon";
import FolderOpenIcon from "../utils/icons/FolderOpenIcon";

const analyticsTabData = [
  {
    title: "Completion Rate",
    subText: "",
    img: <CheckCircleIcon width="14" height="14" color="text-green-500" />,
    value: "0",
    iconBg: "bg-green-500/10",
  },
  {
    title: "Active Tasks",
    subText: "",
    img: <FolderOpenIcon width="14" height="14" color="text-blue-500" />,
    value: "0",
    iconBg: "bg-blue-500/10",
  },
  {
    title: "Overdue Tasks",
    subText: "",
    img: <TriangleAlertIcon width="14" height="14" color="text-orange-500" />,
    value: "0",
    iconBg: "bg-orange-500/10",
  },
  {
    title: "Team Size",
    subText: "",
    img: <StudentsIcon width="14" height="14" color="text-purple-500" />,
    value: "0",
    iconBg: "bg-purple-500/10",
  },
];

export default analyticsTabData;

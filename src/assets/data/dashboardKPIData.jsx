import StudentsIcon from "../utils/images/studentsPurple.svg";
import OverdueIcon from "../utils/images/overdue.svg";

import FolderOpenIcon from "../utils/icons/FolderOpenIcon";
import CheckCircleIcon from "../utils/icons/CheckCircleIcon";
import UsersIcon from "../utils/icons/UsersIcon";
import TriangleAlertIcon from "../utils/icons/TriangleAlertIcon";

const dashboardKPIData = [
  {
    title: "Total Projects",
    subText: "Projects in Appian Solutions",
    img: <FolderOpenIcon width="16" height="16" color="text-blue-500" />,
    value: "0",
    iconBg: "bg-blue-500/10",
  },
  {
    title: "Completed Projects",
    subText: "of 1 total",
    img: <CheckCircleIcon width="16" height="16" color="text-green-500" />,
    value: "0",
    iconBg: "bg-green-500/10",
  },
  {
    title: "My Tasks",
    subText: "assigned to me",
    img: <UsersIcon width="16" height="16" color="text-purple-500" />,
    value: "0",
    iconBg: "bg-purple-500/10",
  },
  {
    title: "Overdue",
    subText: "need attention",
    img: <TriangleAlertIcon width="16" height="16" color="text-orange-500" />,
    value: "0",
    iconBg: "bg-orange-500/10",
  },
];

export default dashboardKPIData;

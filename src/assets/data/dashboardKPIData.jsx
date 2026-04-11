import InprogressIcon from "../utils/images/inprogress.svg";
import StudentsIcon from "../utils/images/studentsPurple.svg";
import OverdueIcon from "../utils/images/overdue.svg";
import CompletedIcon from "../utils/images/completed.svg";

const dashboardKPIData = [
  {
    title: "Total Projects",
    subText: "Projects in Appian Solutions",
    img: InprogressIcon,
    value: "0",
    iconBg: "bg-blue-500/10",
  },
  {
    title: "Completed Projects",
    subText: "of 1 total",
    img: CompletedIcon,
    value: "0",
    iconBg: "bg-green-500/10",
  },
  {
    title: "My Tasks",
    subText: "assigned to me",
    img: StudentsIcon,
    value: "0",
    iconBg: "bg-purple-500/10",
  },
  {
    title: "Overdue",
    subText: "need attention",
    img: OverdueIcon,
    value: "0",
    iconBg: "bg-orange-500/10",
  },
];

export default dashboardKPIData;

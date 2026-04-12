import FileStackIcon from "../utils/icons/FileStackIcon";
import CalenderIcon from "../utils/icons/CalenderIcon";
import ActivityIcon from "../utils/icons/ActivityIcon";
import SettingsIcon from "../utils/icons/SettingsIcon";

const batchTab = {
  tasks: {
    label: "Tasks",
    icon: <FileStackIcon width="16" height="16" color="text-gray-800" />,
  },
  calender: {
    label: "Calender",
    icon: <CalenderIcon width="16" height="16" color="text-gray-800" />,
  },
  analytics: {
    label: "Analytics",
    icon: <ActivityIcon width="16" height="16" color="text-gray-800" />,
  },
  settings: {
    label: "Settings",
    icon: <SettingsIcon width="16" height="16" color="text-gray-800" />,
  },
};

export default batchTab;

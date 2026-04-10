import Logo from '../../utils/images/logo.png';
import DashboardIcon from '../../utils/images/dashboard.svg';
import ProjectIcon from '../../utils/images/projects.svg';
import StudentsIcon from '../../utils/images/students.svg';
import SettingsIcon from '../../utils/images/settings.svg';
const Sidebar = () => {
  return (
    <aside className="min-w-68 bg-white border-r border-gray-200 h-screen py-3">
      <div className="flex justify-center items-center m-4">
        <img src={Logo} alt="Logo" className="w-40 object-contain" />
      </div>

      <hr className="border-gray-200 my-3 " />
      <div className='flex-1 no-scrollbar flex flex-col'>
        <div>
          <div className='p-4'>
            <a href="" className='flex items-center gap-3 py-3 px-4 text-gray-800 cursor-pointer rounded transition-all  bg-gray-100 '>
              <img src={DashboardIcon} alt="" />
              <p className='text-sm truncate'>Dashboard</p>
            </a>
            <a href="" className='flex items-center gap-3 py-3 px-4 text-gray-800 cursor-pointer rounded transition-all'>
              <img src={ProjectIcon} alt="" />
              <p className='text-sm truncate'>Projects</p>
            </a>
            <a href="" className='flex items-center gap-3 py-3 px-4 text-gray-800 cursor-pointer rounded transition-all'>
              <img src={StudentsIcon} alt="" />
              <p className='text-sm truncate'>Team</p>
            </a>
            <a href="" className='flex items-center gap-3 py-3 px-4 text-gray-800 cursor-pointer rounded transition-all'>
              <img src={SettingsIcon} alt="" />
              <p className='text-sm truncate'>Settings</p>
            </a>
          </div>
          <div className='mt-6 px-3'></div>
          <div className='mt-6 px-3'></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
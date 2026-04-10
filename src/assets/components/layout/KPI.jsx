import React from 'react'
import KPICard from '../common/KPICard';
import InprogressIcon from "../../utils/images/inprogress.svg";
import StudentsIcon from "../../utils/images/studentsPurple.svg";
import OverdueIcon from "../../utils/images/overdue.svg";
import CompletedIcon from "../../utils/images/completed.svg";

const KPI = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-9'>
      <KPICard title="Total Projects" subText="Projects in Appian Solutions" img={InprogressIcon} value="0" iconBg="bg-blue-500/10" />
      <KPICard title="Completed Projects" subText="of 1 total" img={CompletedIcon} value="0" iconBg="bg-green-500/10"/>
      <KPICard title="My Tasks" subText="assigned to me" img={StudentsIcon} value="0" iconBg="bg-purple-500/10"/>
      <KPICard title="Overdue" subText="need attention" img={OverdueIcon} value="0" iconBg="bg-orange-500/10"/>
    </div>
  )
}

export default KPI

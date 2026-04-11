import React from 'react';
import HeroSection from '../components/common/HeroSection';
import InprogressIcon from '../utils/images/inprogress.svg';
import CompletedIcon from '../utils/images/completed.svg';
import StudentsIcon from '../utils/images/completed.svg';

const Students = () => {
  const studentsKPIData = [
    {
      title: "Total Members",
      subText: "",
      img: InprogressIcon,
      value: "1",
      iconBg: "bg-blue-500/10",
    },
    {
      title: "Completed Projects",
      subText: "",
      img: CompletedIcon,
      value: "0",
      iconBg: "bg-green-500/10",
    },
    {
      title: "My Tasks",
      subText: "",
      img: StudentsIcon,
      value: "0",
      iconBg: "",
    }
  ];
  return (
    <div>
      <HeroSection mainMessage="Students" subText="Manage students and their contributions" buttonLabel="Invite Member"/>
    </div>
  )
}

export default Students

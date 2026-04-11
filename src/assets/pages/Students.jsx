import React from "react";
import HeroSection from "../components/common/HeroSection";
import KPI from "../components/layout/KPI";
import SearchInput from "../components/common/SearchInput";
import studentsKPIData from "../data/studentsKPIData";
import DataTable from "../components/common/DataTable";
import { columns, studentsData } from "../data/studentsTableData";
const Students = () => {
  return (
    <div>
      <HeroSection
        mainMessage="Students"
        subText="Manage students and their contributions"
        buttonLabel="Invite Member"
      />
      <KPI data={studentsKPIData} />
      <div className="w-full">
        <SearchInput placeholder="Search students..." />
      </div>
      <DataTable columns={columns} data={studentsData} />
    </div>
  );
};

export default Students;

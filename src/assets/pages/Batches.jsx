import React from "react";
import HeroSection from "../components/common/HeroSection";
import SearchInput from "../components/common/SearchInput";
import Dropdown from "../components/common/Dropdown";
import ProjectCard from "../components/common/ProjectCard";
const Batches = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <HeroSection
        mainMessage="Batches"
        subText="Manage and track your batches"
        buttonLabel="New Batch"
      />
      <div className="flex flex-col md:flex-row gap-3">
        <div className="w-full">
          <SearchInput placeholder="Search batches..." />
        </div>
    <Dropdown name="Status" id="status" values={["All Status","Active","Planning","Completed"]} />
    <Dropdown name="Priority" id="Priority" values={["All Priority","High","Medium","Low"]} />
    
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  <ProjectCard page="Batches" />
  <ProjectCard page="Batches" />
  <ProjectCard page="Batches" />
</div>
    </div>
  );
};

export default Batches;

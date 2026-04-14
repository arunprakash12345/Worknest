import React from "react";
import ProjectCard from "./ProjectCard";
import RecentActivity from "./RecentActivity";
import batchData from "../../data/batchData";
import { Link } from "react-router-dom";

const SectionCard = ({ type }) => {
  return (
    <div className="bg-white border border-zinc-200 hover:border-zinc-300 transition-all duration-200 rounded-lg overflow-hidden">
      <div className="border-b border-zinc-200 p-4 flex items-center justify-between">
        <h2 className="text-md text-zinc-800">{type}</h2>

        {type === "Project Overview" && (
          <Link
            to="/batches"
            className="text-sm text-zinc-600 hover:text-zinc-700 flex items-center"
          >
            View all
          </Link>
        )}
      </div>

      <div className="p-0">
        {type === "Project Overview" ? (
          batchData.map((data) => (
            <ProjectCard key={data.id} page="" data={data} />
          ))
        ) : (
          <RecentActivity />
        )}
      </div>
    </div>
  );
};

export default SectionCard;

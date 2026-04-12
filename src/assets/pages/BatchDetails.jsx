import React from "react";
import { useParams } from "react-router-dom";
import batchData from "../data/batchData";
import HeroSection from "../components/common/HeroSection";
import ArrowLeftIcon from "../utils/icons/arrowLeft";
import { Link } from "react-router-dom";
import batchDetailspageData from "../data/batchDetailspageData";
import KPI from "../components/layout/KPI";
import batchDetailFilter from "../data/BatchDetailFilter";
import Dropdown from "../components/common/Dropdown";
import Tab from "../components/common/Tab";
import batchTab from "../data/batchTab";
const BatchDetails = () => {
  const { batchId } = useParams();
  const batch = batchData.find((item) => item.id === Number(batchId));
  return (
    <div>
      <div className="flex items-start gap-4">
        <Link
          to={"/batches"}
          className="hover:bg-gray-200 transition h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeftIcon width={20} height={20} color="text-gray-800" />
        </Link>
        <div className="flex-1">
          <HeroSection
            mainMessage={batch.title}
            subText={batch.description}
            buttonLabel="New Task"
          />
        </div>
      </div>
      <KPI data={batchDetailspageData} />
      <div className="inline-flex flex-wrap gap-2 border border-zinc-200 rounded overflow-hidden mb-4">
        {Object.values(batchTab).map((tab, index) => (
          <Tab
            key={tab.label}
            label={tab.label}
            icon={tab.icon}
            active={index === 0}
          />
        ))}
      </div>
      <div className="flex gap-3">
        {Object.values(batchDetailFilter).map((dropdown) => (
          <Dropdown
            key={dropdown.id}
            name={dropdown.name}
            id={dropdown.id}
            values={dropdown.values}
          />
        ))}
      </div>
    </div>
  );
};

export default BatchDetails;

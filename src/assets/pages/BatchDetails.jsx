import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import batchData from "../data/batchData";
import HeroSection from "../components/common/HeroSection";
import ArrowLeftIcon from "../utils/icons/arrowLeft";
import batchDetailspageData from "../data/batchDetailspageData";
import KPI from "../components/layout/KPI";
import Tab from "../components/common/Tab";
import batchTab from "../data/batchTab";
import BatchTabLayout from "./BatchTabLayout";
import CreateTaskModal from "./CreateTaskModal";
const BatchDetails = () => {
  const { batchId } = useParams();
  const [tabId, setTabId] = useState(0);
  const batch = batchData.find((item) => item.id === Number(batchId));
  const [tasks, setTasks] = useState(batch?.tasks || []);
  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <div>
      <div className="flex items-start gap-4">
        <Link
          to="/batches"
          className="hover:bg-gray-200 transition h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeftIcon width={20} height={20} color="text-gray-800" />
        </Link>

        <div className="flex-1">
          <HeroSection
            mainMessage={batch.title}
            subText={batch.description}
            buttonLabel="New Task"
            onButtonClick={() => setIsTaskModalOpen(true)}
          />
        </div>
      </div>

      <KPI data={batchDetailspageData} />

      <div className="inline-flex flex-wrap gap-2 border border-zinc-200 rounded overflow-hidden mb-4">
        {Object.values(batchTab).map((tab, index) => (
          <div key={tab.label} onClick={() => setTabId(index)}>
            <Tab label={tab.label} icon={tab.icon} active={index === tabId} />
          </div>
        ))}
      </div>

      <BatchTabLayout
        index={tabId}
        batch={batch}
        tasks={tasks}
        setTasks={setTasks}
        handleAddTask={handleAddTask}
        onCreateTask={() => setIsTaskModalOpen(true)}
      />
      {isTaskModalOpen && (
        <CreateTaskModal
          members={batch.members}
          onClose={() => setIsTaskModalOpen(false)}
          onSubmit={(newTask) => {
            setTasks((prev) => [...prev, newTask]);
            setIsTaskModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default BatchDetails;

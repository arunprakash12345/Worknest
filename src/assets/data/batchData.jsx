import ProfileImage from "../utils/images/profile.jpeg";

const batchData = [
  {
    id: 1,
    title: "Computer Science | 2026 | A",
    description: "Final year computer science batch",
    status: "ACTIVE",
    totalTasks: 12,
    completedTasks: 7,
    inProgressTasks: 3,
    totalMembers: 28,

    tasks: [
      {
        id: 1,
        title: "Build Student Dashboard UI",
        type: "TASK",
        priority: "HIGH",
        status: "IN PROGRESS",
        assignee: {
          name: "Arun Prakash G",
          image: ProfileImage,
        },
        dueDate: "15 April",
      },
    ],

    members: [
      {
        id: 1,
        name: "Arun Prakash G",
        email: "arun@example.com",
        role: "ADMIN",
        image: ProfileImage,
      },
    ],
  },
  {
    id: 2,
    title: "Mechanical Engineering | 2025 | B",
    description: "Third year mechanical engineering batch",
    status: "PLANNING",
    totalTasks: 8,
    completedTasks: 2,
    inProgressTasks: 4,
    totalMembers: 22,

    tasks: [
      {
        id: 1,
        title: "Prepare CAD Model Submission",
        type: "TASK",
        priority: "MEDIUM",
        status: "TO DO",
        assignee: {
          name: "Rahul Kumar",
          image: ProfileImage,
        },
        dueDate: "20 April",
      },
    ],

    members: [
      {
        id: 1,
        name: "Rahul Kumar",
        email: "rahul@example.com",
        role: "MENTOR",
        image: ProfileImage,
      },
    ],
  },
  {
    id: 3,
    title: "Electronics | 2027 | C",
    description: "Embedded systems and circuit design batch",
    status: "ACTIVE",
    totalTasks: 15,
    completedTasks: 9,
    inProgressTasks: 4,
    totalMembers: 31,

    tasks: [
      {
        id: 1,
        title: "IoT Sensor Integration",
        type: "TASK",
        priority: "HIGH",
        status: "IN PROGRESS",
        assignee: {
          name: "Priya Sharma",
          image: ProfileImage,
        },
        dueDate: "18 April",
      },
    ],

    members: [
      {
        id: 1,
        name: "Priya Sharma",
        email: "priya@example.com",
        role: "ADMIN",
        image: ProfileImage,
      },
    ],
  },
  {
    id: 4,
    title: "Civil Engineering | 2026 | D",
    description: "Infrastructure and planning batch",
    status: "COMPLETED",
    totalTasks: 10,
    completedTasks: 10,
    inProgressTasks: 0,
    totalMembers: 19,

    tasks: [
      {
        id: 1,
        title: "Bridge Design Submission",
        type: "TASK",
        priority: "LOW",
        status: "COMPLETED",
        assignee: {
          name: "Vikram Singh",
          image: ProfileImage,
        },
        dueDate: "10 March",
      },
    ],

    members: [
      {
        id: 1,
        name: "Vikram Singh",
        email: "vikram@example.com",
        role: "MENTOR",
        image: ProfileImage,
      },
    ],
  },
  {
    id: 5,
    title: "Information Technology | 2025 | E",
    description: "Software systems and cloud computing batch",
    status: "ACTIVE",
    totalTasks: 20,
    completedTasks: 11,
    inProgressTasks: 6,
    totalMembers: 35,

    tasks: [
      {
        id: 1,
        title: "Deploy MERN Application",
        type: "TASK",
        priority: "HIGH",
        status: "TO DO",
        assignee: {
          name: "Sneha Reddy",
          image: ProfileImage,
        },
        dueDate: "25 April",
      },
    ],

    members: [
      {
        id: 1,
        name: "Sneha Reddy",
        email: "sneha@example.com",
        role: "ADMIN",
        image: ProfileImage,
      },
    ],
  },
];

export default batchData;

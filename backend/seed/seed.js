import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "../src/models/User.js";
import Batch from "../src/models/Batch.js";
import Task from "../src/models/Task.js";

dotenv.config({
  path: new URL("../.env", import.meta.url).pathname,
});

console.log("MONGO:", process.env.MONGO_URI);

const MONGO_URI = process.env.MONGO_URI;

// USERS
const usersData = [
  {
    name: "Arun Prakash",
    email: "arun@worknest.com",
    password: "123456",
    role: "MENTOR",
  },

  {
    name: "Sarah Wilson",
    email: "sarah@worknest.com",
    password: "123456",
    role: "MENTOR",
  },

  {
    name: "Rahul Kumar",
    email: "rahul@gmail.com",
    password: "123456",
    role: "STUDENT",
  },

  {
    name: "Priya Sharma",
    email: "priya@gmail.com",
    password: "123456",
    role: "STUDENT",
  },

  {
    name: "Aisha Khan",
    email: "aisha@gmail.com",
    password: "123456",
    role: "STUDENT",
  },

  {
    name: "David Joseph",
    email: "david@gmail.com",
    password: "123456",
    role: "STUDENT",
  },

  {
    name: "Varun Reddy",
    email: "varun@gmail.com",
    password: "123456",
    role: "STUDENT",
  },

  {
    name: "Aditya Rao",
    email: "aditya@gmail.com",
    password: "123456",
    role: "STUDENT",
  },

  {
    name: "Neha Singh",
    email: "neha@gmail.com",
    password: "123456",
    role: "STUDENT",
  },
];

const taskTitles = [
  "Build Login Page",
  "Setup Authentication",
  "Create Dashboard",
  "Fix Responsive Issues",
  "Implement Calendar",
  "Add Dark Mode",
  "Connect Backend APIs",
  "Create Analytics Charts",
  "Build Profile Page",
  "Add Comments System",
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected");

    // CLEAR OLD DATA

    await User.deleteMany();
    await Batch.deleteMany();
    await Task.deleteMany();

    console.log("Old data deleted");

    // CREATE USERS

    const users = [];

    for (const user of usersData) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      users.push({
        ...user,
        password: hashedPassword,
      });
    }

    const createdUsers = await User.insertMany(users);

    const mentors = createdUsers.filter((u) => u.role === "MENTOR");

    const students = createdUsers.filter((u) => u.role === "STUDENT");

    console.log(`${createdUsers.length} users created`);

    // CREATE BATCHES

    const batchesData = [
      "Frontend React Cohort",
      "DSA Mastery",
      "Cloud Engineering",
      "AI Fundamentals",
    ];

    const createdBatches = [];

    for (let i = 0; i < batchesData.length; i++) {
      const mentor = mentors[i % mentors.length];

      const randomStudents = students.sort(() => 0.5 - Math.random());

      const selected = randomStudents.slice(0, 5);

      const batch = await Batch.create({
        title: batchesData[i],

        description: "Learning with practical projects",

        status: "ACTIVE",

        priority: "MEDIUM",

        startDate: new Date(),

        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),

        createdBy: mentor._id,

        teamLead: mentor._id,

        members: selected.map((student) => ({
          user: student._id,
          role: "MEMBER",
        })),
      });

      createdBatches.push(batch);
    }

    console.log(`${createdBatches.length} batches created`);

    // TASKS

    for (const batch of createdBatches) {
      for (let i = 0; i < 10; i++) {
        const randomStudent =
          batch.members[Math.floor(Math.random() * batch.members.length)];

        const statuses = ["TODO", "IN_PROGRESS", "DONE"];

        const priorities = ["LOW", "MEDIUM", "HIGH"];

        await Task.create({
          title: taskTitles[Math.floor(Math.random() * taskTitles.length)],

          description: "Complete task implementation",

          type: "TASK",

          priority: priorities[Math.floor(Math.random() * priorities.length)],

          dueDate: new Date(
            Date.now() + (Math.random() * 14 - 7) * 24 * 60 * 60 * 1000,
          ),

          batch: batch._id,

          assignees: [
            {
              user: randomStudent.user,

              status: statuses[Math.floor(Math.random() * statuses.length)],
            },
          ],

          createdBy: batch.createdBy,
        });
      }
    }
    console.log("Seed completed successfully 🔥");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seed();

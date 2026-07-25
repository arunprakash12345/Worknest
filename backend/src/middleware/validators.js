import { body, param, validationResult } from "express-validator";

// Middleware to check validation results
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};

// Auth validators
export const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .optional()
    .isIn(["MENTOR", "STUDENT"])
    .withMessage("Role must be MENTOR or STUDENT"),
];

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

// Batch validators
export const createBatchValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Batch title is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Title must be between 2 and 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  body("status")
    .optional()
    .isIn(["PLANNING", "ACTIVE", "COMPLETED", "ON_HOLD", "CANCELLED"])
    .withMessage("Invalid status"),
  body("priority")
    .optional()
    .isIn(["LOW", "MEDIUM", "HIGH"])
    .withMessage("Invalid priority"),
  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid start date format"),
  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid end date format"),
];

export const addMembersValidation = [
  param("id").isMongoId().withMessage("Invalid batch ID"),
  body("memberIds")
    .isArray({ min: 1 })
    .withMessage("At least one member ID is required"),
  body("memberIds.*").isMongoId().withMessage("Invalid member ID format"),
];

// Task validators
export const createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ min: 2, max: 200 })
    .withMessage("Title must be between 2 and 200 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),
  body("type")
    .optional()
    .isIn(["TASK", "BUG", "FEATURE", "IMPROVEMENT", "OTHER"])
    .withMessage("Invalid task type"),
  body("priority")
    .optional()
    .isIn(["LOW", "MEDIUM", "HIGH"])
    .withMessage("Invalid priority"),
  body("status")
    .optional()
    .isIn(["TODO", "IN_PROGRESS", "DONE"])
    .withMessage("Invalid status"),
  body("batch").isMongoId().withMessage("Invalid batch ID"),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid due date format"),
];

export const updateTaskStatusValidation = [
  param("id").isMongoId().withMessage("Invalid task ID"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["TODO", "IN_PROGRESS", "DONE"])
    .withMessage("Invalid status"),
];

export const deleteTasksValidation = [
  body("taskIds")
    .isArray({ min: 1 })
    .withMessage("At least one task ID is required"),
  body("taskIds.*").isMongoId().withMessage("Invalid task ID format"),
];

// Task comment validators
export const createCommentValidation = [
  param("taskId").isMongoId().withMessage("Invalid task ID"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Comment message is required")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Comment must be between 1 and 1000 characters"),
];

// MongoDB ID param validation
export const mongoIdValidation = [
  param("id").isMongoId().withMessage("Invalid ID format"),
];

export const taskIdValidation = [
  param("taskId").isMongoId().withMessage("Invalid task ID format"),
];

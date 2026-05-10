const express = require('express');
const adminRouter = express.Router();

const { authMiddleware } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

const {
  getAllNotes,
  getAllUsers
} = require('../controllers/admin.controller');

adminRouter.get(
  "/notes",
  authMiddleware,
  authorizeRoles("admin"),
  getAllNotes
);

adminRouter.get(
  "/users",
  authMiddleware,
  authorizeRoles("admin"),
  getAllUsers
);

module.exports = adminRouter;
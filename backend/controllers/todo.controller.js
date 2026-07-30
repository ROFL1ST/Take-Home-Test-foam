import { createRequire } from "module";
import { successResponse, errorResponse } from "../utils/response.js";
const require = createRequire(import.meta.url);
const db = require("../models/index.cjs");

const Todo = db.Todo;

export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAll({
      order: [["id", "ASC"]],
    });

    return successResponse(res, {
      message: "Todos retrieved successfully.",
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const todo = await Todo.create({
      title,
      description,
    });

    return successResponse(res, {
      statusCode: 201,
      message: "Todo created successfully.",
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    if (title !== undefined && title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }
    await todo.update({
      title: title ?? todo.title,
      description: description ?? todo.description,
      completed: completed ?? todo.completed,
    });

    return successResponse(res, {
      message: "Todo updated successfully.",
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    await todo.destroy();

    return successResponse(res, {
      message: "Todo deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

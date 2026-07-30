import { createRequire } from "module";

const require = createRequire(import.meta.url);
const db = require("../models/index.cjs");

const Todo = db.Todo;

export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAll({
      order: [["id", "ASC"]],
    });

    res.status(200).json(todos);
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

    res.status(201).json(todo);
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

    res.json(todo);
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

    res.json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

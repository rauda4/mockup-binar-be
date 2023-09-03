const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TodoController {
  static async createTodo(req, res) {
    const { user_id, todo, keterangan } = req.body;

    // check if any fields empty
    if (!user_id || !todo || !keterangan) {
      return res.status(404).json({
        result: 'Failed',
        message: 'Please add all fields',
      });
    }

    try {
      const todos = await prisma.todolist.create({
        data: {
          user_id,
          todo,
          keterangan,
        },
      });
      res.status(200).json({
        message: 'Succes create data',
        data: todos,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        res.status(404).json({ message: 'Todo already doest exist' });
      } else {
        res.status(500).json({ msg: error });
        console.log(error);
      }
    }
  }

  static async getTodo(req, res) {
    try {
      const todos = await prisma.todolist.findMany();
      if (!todos) {
        return res.status(400).json({
          message: 'Data is Empty',
        });
      }
      res.status(200).json({
        result: 'succes find data',
        payload: todos,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  static async GetTodoById(req, res) {
    const { user_id } = req.params;
    if (!user_id) {
      return res
        .status(200)
        .json({ message: 'please enter todo list', data: [] });
    }
    try {
      const getTodo = await prisma.todolist.findMany({
        where: {
          user_id,
        },
      });
      if (!getTodo) {
        return res.status(400).json({
          result: 'Todolist not found',
        });
      }
      res.status(200).json({
        message: `succes find todo with user id ${user_id}`,
        data: getTodo,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  static async updateTodo(req, res) {
    try {
      const { user_id, id } = req.params;
      const { todo, keterangan } = req.body;
      const updateData = await prisma.todolist.update({
        where: { user_id, id },
        data: {
          user_id,
          todo,
          keterangan,
        },
      });
      res.status(200).json({
        result: 'succes',
        message: `todo with user id = ${id} updated`,
        data: updateData,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  static async deleteTodo(req, res) {
    const { user_id, id } = req.params;
    try {
      const todos = await prisma.todolist.delete({
        where: { user_id, id },
      });
      if (!todos) {
        return res.status(400).json({ msg: 'cannot delete' });
      }
      res.status(200).json({ msg: `succes delete todos` });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
}

module.exports = TodoController;

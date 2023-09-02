const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserController {
  static async createUser(req, res) {
    const { username, kodeunik, email } = req.body;

    // check if any fields empty
    if (!email || !username || !kodeunik) {
      return res.status(404).json({
        result: 'Failed',
        message: 'Please add all fields',
      });
    }

    try {
      const user = await prisma.user.create({
        data: {
          username,
          kodeunik,
          email,
        },
      });
      res.status(200).json({
        message: 'Succes create data',
        data: user,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        res.status(404).json({ message: 'User already doest exist' });
      } else {
        res.status(500).json({ msg: error });
        console.log(error);
      }
    }
  }

  static async login(req, res) {
    try {
      // validation body
      const { kodeunik } = req.body;

      if (!kodeunik)
        return res.status(401).json({ msg: 'kodeunik cannot be empty!' });

      const user = await prisma.user.findUnique({ where: { kodeunik } });
      if (!user) return res.status(401).json({ msg: 'User not found' });
      res.status(200).json({ auth: user, status: 'authorized' });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async getUser(req, res) {
    try {
      const users = await prisma.user.findMany({
        orderBy: {
          username: 'desc',
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });
      if (!users) {
        return res.status(400).json({
          message: 'Data is Empty',
        });
      }
      res.status(200).json({
        result: 'succes find data',
        payload: users,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  static async GetUserById(req, res) {
    const { id } = req.params;
    try {
      const users = await prisma.user.findUnique({ where: { id } });
      if (!users) {
        return res.status(400).json({
          result: 'users not found',
        });
      }
      res.status(200).json({
        message: `succes find users with id ${id}`,
        data: users,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { username, email, kodeunik } = req.body;
      const updateData = await prisma.user.update({
        where: { id },
        data: {
          username,
          email,
          kodeunik,
        },
      });
      res.status(200).json({
        result: 'succes',
        message: `user with id = ${id} updated`,
        data: updateData,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const users = await prisma.user.delete({
        where: { id },
      });
      if (!users) {
        return res.status(400).json({ msg: 'cannot delete' });
      }
      res.status(200).json({ msg: `succes delete user` });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
}

module.exports = UserController;

import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Customer } from '../models/customer';
import { Company } from '../models/company';
import envConfig from '../configs/env.config';
import { Roles } from '../middlewares/auth.middleware';

const register = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { name, email, password, userType } = body;

    // if (!name) {
    //   return res.status(400).send({ error: 'Name is required' });
    // }
    // if (!email) {
    //   return res.status(400).send({ error: 'Email is required' });
    // }
    // if (!password) {
    //   return res.status(400).send({ error: 'Password is required' });
    // } else if (password.length < 6) {
    //   return res.status(400).send({ error: 'Password too short' });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user =
      userType === Roles.Customer
        ? new Customer({
            name,
            email,
            password: hashedPassword,
          })
        : new Company({
            name,
            email,
            password: hashedPassword,
          });

    await user.save();
    return res.status(200).send({ message: 'User successfully registered.' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ error: 'Email already exists' });
    }
    return res.status(500).send(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email: login, password } = req.body;

    if (!login) {
      return res.status(400).send({ error: 'Email is required' });
    }
    if (!password) {
      return res.status(400).send({ error: 'Password is required' });
    }

    const user =
      (await Customer.findOne({ email: login }).select('+password')) ||
      (await Company.findOne({ email: login }).select('+password'));

    if (!user)
      return res.status(404).send({ error: 'email/password incorrect' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(404).send({ error: 'email/password incorrect' });

    const {
      password: hashedPassword,
      name,
      email,
      _id,
      ...userInfo
    } = user.toJSON();
    const token = jwt.sign({ name, email, _id }, envConfig.JWT_SECRET);

    return res.send({
      token,
      user: {
        name,
        email,
        _id,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
export { register, login };

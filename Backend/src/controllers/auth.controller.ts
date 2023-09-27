import express, { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Customer } from '../models/customer';
import { Company } from '../models/company';
import envConfig from '../configs/env.config';
import { AuthRequest, Roles } from '../middlewares/auth.middleware';
import { HttpException } from '../exceptions/HttpException';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const { name, email, password, userType } = body;

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
      next(new HttpException(400, 'Email already exists'));
    } else {
      next(error);
    }
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email: login, password } = req.body;

    if (!login) throw new HttpException(400, 'Email is required');
    if (!password) throw new HttpException(400, 'Password is required');

    const user =
      (await Customer.findOne({ email: login }).select('+password')) ||
      (await Company.findOne({ email: login }).select('+password'));

    if (!user) throw new HttpException(404, 'email/password incorrect');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new HttpException(404, 'email/password incorrect');

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
    next(error);
  }
};

const getUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const profile =
      (await Customer.findById(user._id).select('-password')) ||
      (await Company.findById(user._id).select('-password'));
    if (!profile) {
      throw new HttpException(400, 'Profile not found');
    }
    console.log(profile);
    return res.status(200).json({ profile });
  } catch (error) {
    next(error);
  }
};
export { register, login, getUser };

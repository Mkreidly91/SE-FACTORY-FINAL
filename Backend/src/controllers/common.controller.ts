import { Request, Response, NextFunction } from "express";
import { searchProjectService } from "../services/common.service";
const searchProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, location, bedrooms, bathrooms, size, price } = req.body;
    const { message, data } = await searchProjectService({
      search,
      location,
      bedrooms,
      bathrooms,
      size,
      price,
    });

    return res.status(200).json({
      message,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export { searchProject };

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = await UserServices.createUser(req.body);
//         res.status(httpStatus.CREATED).json({
//             message: "User Created Successfully!",
//             user
//         })
//     } catch (error: any) {
//         // console.log(error);
//         // res.status(httpStatus.BAD_REQUEST).json({
//         //     message: `Something went wrong! ${error.message}`,
//         //     error
//         // })
//         next(error)
//     }
// }

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    // res.status(httpStatus.CREATED).json({
    //     message: "User Created Successfully",
    //     user
    // })

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  }
);

// const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const users = await UserServices.getAllUsers();
//         return users;
//     } catch (error: any) {
//         // console.log(error);
//         next(error);
//     }
// }

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All Users Retrieved Successfully!",
    //     data: users
    // })

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All Users Retrieved Successfully",
      data: result.data,
      meta: result.meta
    });
  }
);

export const UserControllers = {
  createUser,
  getAllUsers,
};

/**
 * 1. route matching (3 layers) -> controller -> service -> model -> DB
 * After creating model -->
 * working step: service (first) -> controller (second) -> route matching (third)
 */

import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post("/login", AuthControllers.credentialsLogin)
// money (3*)must be funny 
export const AuthRoutes = router;
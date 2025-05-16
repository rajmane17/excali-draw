import { Router } from "express"
import { handleUserSignup, handleUserSignin } from "../controllers/user.controller"

//We need to explicitly mention here its type
const router: Router = Router();

router.post("/signup", handleUserSignup);

router.post("/signin", handleUserSignin);

export default router;
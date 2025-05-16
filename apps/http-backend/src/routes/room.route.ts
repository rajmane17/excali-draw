import {Router} from "express";
import { handleCreateRoom, getAllExistingChats, getRoomIdFromSlug } from "../controllers/room.controller";
import { checkAuth } from "../middlewares/auth.middleware";

const router: Router = Router();

router.post("/create-room", checkAuth, handleCreateRoom);

//This endpoint gives us the roomId for the entered roomSlug
router.get("/find-room/:roomSlug", getRoomIdFromSlug);

//When someone joins this room, they will see the existing chats
router.get("/chats/:roomId", getAllExistingChats);

export default router;

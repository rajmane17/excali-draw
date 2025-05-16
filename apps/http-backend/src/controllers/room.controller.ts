import { roomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import {Request, Response} from 'express';
import { ApiError, ApiResponse, asyncHandler } from "../utils";

//more features to add => Room permission, rate-limiter(if not added users can spam way too much messages), etc

export const handleCreateRoom = asyncHandler(async (req: Request, res: Response) => {
    const {success, data, error} = roomSchema.safeParse(req.body);
    
    if(!success){
        throw new ApiError(401, "Please enter all the fields" );
    }

    const userId = req.user?.id;

        const existingRoom = await prismaClient.room.findFirst({
            where: {
                slug: data.roomName
            }
        });

        if(existingRoom){
            throw new ApiError(409, "A room with this name already exists");
        }
    
        const newRoom = await prismaClient.room.create({
            data: {
                slug: data.roomName,
                createdBy: userId as number
            }
        });
    
        if(!newRoom){
            throw new ApiError(500, "Error creating a room");
        }
    
        res
        .status(200)
        .json(
            new ApiResponse(200, {roomDetails: newRoom}, "room created successfully")
        )
})

export const getAllExistingChats = asyncHandler(async (req: Request, res: Response) => {
    const roomId = Number(req.params.roomId);

    const room = await prismaClient.room.findFirst({
        where: {
            id: roomId
        }
    })

    if(!room){
        throw new ApiError(404, "A room with this room id doesn't exists");
    }

    const messages = await prismaClient.chat.findMany({
        where: {
            roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    });

    if(!messages){
        throw new ApiError(500, "Failed to get old messages");
    }


    res
    .status(200)
    .json(
        new ApiResponse(200, {messages})
    )

})

export const getRoomIdFromSlug = asyncHandler(async (req: Request, res: Response) => {
    const roomSlug = String(req.params.roomSlug);

    const room = await prismaClient.room.findFirst({
        where: {
            slug: roomSlug
        }
    })

    if(!room){
        throw new ApiError(401, "No such room exits");
    }

    res
    .status(200)
    .json(
        new ApiResponse(200, room)
    )
})
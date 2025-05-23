"use client"
import axios from "axios"
import { BACKEND_URL } from "../../config";
import { useEffect, useRef } from "react";
import { initDraw } from "../../draw";

async function getRoomId(slug: string){
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    return response.data.id;

}

const Canvas = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        if(canvasRef.current){
            const canvas = canvasRef.current;
            initDraw(canvas)
        }
    }, [canvasRef])


    return <div>
        <canvas height={2000} width={2000} ref={canvasRef}></canvas>
    </div>
}

export default Canvas;
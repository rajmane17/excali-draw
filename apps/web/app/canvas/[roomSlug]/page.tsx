"use client"
import axios from "axios"
import { BACKEND_URL } from "../../config";
import { useEffect, useRef } from "react";

async function getRoomId(slug: string){
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    return response.data.id;

}

const Canvas = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        if(canvasRef.current){
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            if(!context) return

            context.strokeStyle = "white";

            let clicked = false;
            let startX: any;
            let startY: any;

            canvas.addEventListener("mousedown", (e) => {
                clicked = true
                startX = e.clientX
                startY = e.clientY
            })

            canvas.addEventListener("mouseup", (e) => {
                clicked = false;
                console.log(e.clientX);
                console.log(e.clientY);
            })

            canvas.addEventListener("mousemove", (e) => {
                if(clicked){
                    const width = e.clientX - startX;
                    const height = e.clientY - startY;

                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.strokeRect(startX, startY, width, height);
                }
            })
        }

    }, [canvasRef])


    return <div>
        <canvas height={500} width={500} ref={canvasRef}></canvas>
    </div>
}

export default Canvas;
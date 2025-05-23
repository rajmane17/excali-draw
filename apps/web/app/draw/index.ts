import React from "react";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    height: number;
    width: number;
}

export function initDraw(canvas: HTMLCanvasElement) {

    //
    const existingShapes: Shape[] = [];
    const context = canvas.getContext("2d");

    if (!context) return;

    context.strokeStyle = "white";

    let clicked: boolean = false;
    let startX: number;
    let startY: number;

    canvas.addEventListener("mousedown", (e: any) => {
        clicked = true
        startX = e.clientX
        startY = e.clientY
    })

    canvas.addEventListener("mouseup", (e: any) => {
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        existingShapes.push({
            type: "rect",
            x: startX,
            y: startY,
            height,
            width
        })
    })

    canvas.addEventListener("mousemove", (e: any) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            context.strokeRect(startX, startY, width, height);
        }
    })
}

function clearCanvas (existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    existingShapes.map((shape) => {
        ctx.strokeRect(shape.x, shape.y, shape.height, shape.width)
    })
}
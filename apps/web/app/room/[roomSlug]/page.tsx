import axios from "axios"
import { BACKEND_URL } from "../../config";

async function getRoomId(slug: string){
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    return response.data.id;

}

export default async function chatRoom({params}: {params: {
    roomSlug: string
}}) {

    const roomSlug = params.roomSlug;
    const roomId = await getRoomId(roomSlug);
    return (
        <>
        </>
    )
}
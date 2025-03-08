import { CreateChat } from "../api/auth";


export const CreateChatHandler = async (senderId, receiverId) => {
    const chatResponse = await CreateChat({
        members: [
            senderId,
            receiverId
        ],
        isGroupChat: false
    })

    return chatResponse?.chat
}
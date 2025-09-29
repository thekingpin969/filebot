import Database from "../../db/mongodb"

const db = new Database()

async function onFileReceive(ctx: any) {
    try {
        const { chat: { id, type }, document:
            { file_name, file_unique_id, file_size, file_id, thumbnail } = null,
            forward_origin: { sender_user: { id: fromChatId } } } = ctx.update.message as any

        const DB_CHANNEL_IDS: any[] = [-4920672641]

        if (!DB_CHANNEL_IDS.includes(id)) return console.log('unauthorized', id)

        const metaData = {
            chatId: id,
            fromChatId: fromChatId,
            file_name, file_unique_id, file_size, file_id,
            addedAt: new Date().getTime()
        }

        await db.addLogs(metaData, 'metadata')

    } catch (error) {
        console.log(error)
    }
}

export default onFileReceive
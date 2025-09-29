import type { Context } from "telegraf";
import Database from "../../db/mongodb";
import isFileAvailable from "../helpers/isFileAvailable";

const db = new Database()

async function onRequest(ctx: any) {
    try {
        const { chat: { id, type }, text = null, message_id } = ctx.update.message
        const { data: files = [] }: any = await db.getLogs({ file_name: { $regex: text, $options: "i" } }, 'metadata')
        if (files.length <= 0) return ctx.reply('no results found', { reply_parameters: { message_id: message_id } })

        const keyboard = {
            reply_markup: {
                inline_keyboard: [
                    ...files.map((file: any) => [
                        { text: file.file_name, callback_data: `download_file:${file.file_unique_id}` }
                    ])
                ]
            }
        };
        await ctx.reply('here is your search results', { reply_parameters: { message_id }, reply_markup: keyboard.reply_markup });
    } catch (error) {
        console.log(error)
    }
}

export default onRequest
import type { Context } from "telegraf";
import Database from "../../db/mongodb";
import isFileAvailable from "../helpers/isFileAvailable";

const db = new Database()

async function start(ctx: any) {
    let fileId;
    try {
        const id = ctx.startPayload
        if (!id) return await ctx.reply('welcome')
        const holder = await ctx.reply('please wait...')
        const { data: [file] }: any = await db.getLogs({ file_unique_id: id }, 'metadata', {}, 1)
        if (!file) return await ctx.reply('no files found!')
        fileId = file.file_id
        const res = await ctx.sendDocument(file.file_id, { caption: `${file.file_name}\n\nthanks for using @${ctx.botInfo.username}` })
    } catch (error) {
        const fileAvailable = await isFileAvailable({ file_id: fileId })
        if (fileAvailable) return start(ctx)
        else ctx.reply('sorry, the requested file is not available at this moment')

        console.log(error)
    }
}

export default start
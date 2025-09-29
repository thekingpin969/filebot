import axios from "axios";
import { Markup } from "telegraf";

async function onDownloadRequest(ctx: any) {
    try {
        const fileId: string | any = ctx.match[1];
        // const { data } = await axios.post('http://localhost:3000/api/tunnelUrl',
        const { data } = await axios.post('https://zapnet.onrender.com/api/tunnelUrl',
            { url: `https://t.me/${ctx.botInfo.username}?start=${fileId}` }, { headers: { Authorization: `Bearer ${process.env.ZAPNET_API_TOKEN}` } })
        await ctx.editMessageText(
            'click the below button to get the file',
            Markup.inlineKeyboard([[Markup.button.url('Download File', data.url)]])
        );
    } catch (error) {
        console.log(error)
    }
}

export default onDownloadRequest
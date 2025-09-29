import Database from "../../db/mongodb";

const db = new Database()

async function onInlineQuery(ctx: any) {
    try {
        console.log(ctx.update.inline_query.query)
        const query = ctx.update.inline_query.query;
        const { data: files = [] }: any = await db.getLogs({ file_name: { $regex: query, $options: "i" } }, 'metadata')

        const results = files.map((file: any, i: number) => {
            return {
                type: "article",
                id: i,
                title: file.file_name,
                input_message_content: {
                    message_text: `click the button to download the file`,
                },
                reply_markup: {
                    inline_keyboard: [
                        [{ text: file.file_name, callback_data: `download_file:${file.file_unique_id}` }],
                    ],
                },
            }
        })

        ctx.answerInlineQuery(results, { cache_time: 0 });
    } catch (error: any) {
        console.log(error.message)
    }

}

export default onInlineQuery
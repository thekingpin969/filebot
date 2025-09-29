import tgBot from "../bot"

async function isFileAvailable(file: { file_id?: string } = {}) {
    try {
        if (!file.file_id) {
            return { fileAvailable: false, file };
        }
        await tgBot.telegram.getFile(file.file_id);
        return { fileAvailable: true, file };
    } catch (error: any) {
        if (error?.response.description != 'Bad Request: file is too big') {
            return { fileAvailable: false, file };
        } else {
            return { fileAvailable: true, file };
        }
    }
}

export default isFileAvailable;

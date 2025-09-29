import { Telegraf } from 'telegraf'
import start from './commands/start';
import onRequest from './actions/onRequest';
import onFileReceive from './actions/onFileReceive';
import onDownloadRequest from './actions/onDownloadRequest';
import onInlineQuery from './actions/onInlineQuery';

const tgBot = new Telegraf(process.env.BOT_TOKEN as string);

tgBot.start(start)
tgBot.on('text', onRequest)
tgBot.action(/^download_file:(.+)$/, onDownloadRequest)
tgBot.on('document', onFileReceive)
tgBot.on('inline_query', onInlineQuery)

if (process.env.NODE_ENV == 'production') {
    const url = '' + '/webhook'
    tgBot.telegram.setWebhook(url, { secret_token: 'authorized_request_from_vekilisurabot' })
    console.log('bot running throw webhook')
} else {
    tgBot.launch()
    console.log('bot running')
}


export default tgBot

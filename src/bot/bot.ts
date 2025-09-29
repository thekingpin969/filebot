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

export default tgBot

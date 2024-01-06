import { BOT_STATE } from '../app.js';
import { SendResponse } from '../utils.js';

const ENABLE_COMMAND = {
    name: 'enable',
    description: 'Enables the bots functionality',
    type: 1,
};

export function executeEnableCommand() {
    if (!BOT_STATE.enabled) {
        console.log('enabling bot...');
        BOT_STATE.enabled = true;
        return SendResponse(res, 'The update-bot has been enabled!')
    }
    console.warn('bot is already enabled');
    return SendResponse(res, 'The update-bot is already enabled!')
}

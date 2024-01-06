import { BOT_STATE } from '../app.js';
import { SendResponse } from '../utils.js';

export const DISABLE_COMMAND = {
    name: 'disable',
    description: 'Disables the bots functionality',
    type: 1,
};

export function executeDisableCommand() {
    if (BOT_STATE.enabled) {
        console.log('disabling bot...');
        BOT_STATE.enabled = false;
        return SendResponse(res, 'The update-bot has been disabled!')
    }
    console.warn('bot is already disabled');
    return SendResponse(res, 'The update-bot is already disabled!')
}
import 'dotenv/config';
import express from 'express';
import { InteractionType, InteractionResponseType } from 'discord-interactions';
import { SendResponse, VerifyDiscordRequest } from './utils.js';
import { executeDisableCommand } from './commands/disable.js';
import { executeEnableCommand } from './commands/enable.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

export const BOT_STATE = {
    enabled: true,
};

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
    // Interaction type and data
    const { type, data } = req.body;

    /**
     * Handle verification requests
     */
    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }

    /**
     * Handle slash command requests
     * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
     */
    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name } = data;

        // "enable" command
        if (name === 'enable') {
            return executeEnableCommand(res, 'The update-bot has been enabled!');
        }

        if (!BOT_STATE.enabled) {
            return SendResponse(res, 'The bot is disabled!');
        }

        if (name === 'disable') {
            return executeDisableCommand(res, 'The update-bot has been disabled!');
        }
    }
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
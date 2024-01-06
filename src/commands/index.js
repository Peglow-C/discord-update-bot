import 'dotenv/config';
import { ENABLE_COMMAND } from 'enable';
import { DISABLE_COMMAND } from 'disable';

const ALL_COMMANDS = [ENABLE_COMMAND, DISABLE_COMMAND];

InstallGlobalCommands(process.env.DISCORD_CLIENT_ID, ALL_COMMANDS);

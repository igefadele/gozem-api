/* 
===============
LOGGER CONFIGURATIONS
*/

import morgan from 'morgan';
import path from 'path';
import fs from 'fs';

const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logStream = fs.createWriteStream(path.join(logsDir, 'access.log'), {
  flags: 'a',
});

export const logger = morgan('combined', { stream: logStream });

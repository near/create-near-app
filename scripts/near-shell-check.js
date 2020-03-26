/*
 * This file is a stop-gap for upgrading projects when near-shell improves/modifies logic
 */

const fs = require('fs').promises;

(async () => {
    const oldDevDeployFile = 'neardev/dev-account';
    const newDevDeployFile = 'neardev/dev-account.env';

    // if old file exists but new file doesn't, create it
    const checkOldDeployFile = async () => {
        await fs.access(oldDevDeployFile)
            .then(async () => {
                const fileData = await fs.readFile(oldDevDeployFile);
                await fs.writeFile(newDevDeployFile, `CONTRACT_NAME=${fileData}`);
                console.log('Please consider running "npm install near-shell -g" to upgrade near-shell');
            })
            .catch(() => {}); // it's fine if the old dev-deploy file doesn't exist
    };

    // check for new dev-deploy file first
    await fs.access(newDevDeployFile)
        .then(() => {}) // user already has the latest near-shell
        .catch(error => {
            if (error.code === 'ENOENT') {
                checkOldDeployFile();
            } else {
                console.warn(`Unexpected error accessing ${newDevDeployFile}`, error);
            }
        });
})();
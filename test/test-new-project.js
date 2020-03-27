const shell = require('shelljs');

shell.config.fatal = true

const commands = [
    "node index.js tmp-project",
    "node index.js tmp-project --vanilla",
    "node index.js tmp-project --rust",
    "node index.js tmp-project --vanilla --rust"
];

for (let i = 0; i < commands.length; i++) {
    // remove temporary blank project
    shell.rm('-rf', 'tmp-project');
    // test generating new project in new dir
    shell.exec(commands[i], { silent: true });
    shell.cd('tmp-project');
    shell.env.FILE = 'package.json';
    if (!shell.test('-e', shell.env.FILE)) {
        shell.echo(`Couldn't find ${shell.env.FILE}`);
        shell.exit(1);
    }

    shell.exec('npm install');
    shell.exec('npm run test');
    shell.cd('..');
}

// remove temporary blank project
shell.rm('-rf', 'tmp-project');
const shell = require('shelljs');

shell.config.fatal = true;

const commands = [
    'node index.js',
    'node index.js --vanilla',
    'node index.js --rust',
    'node index.js --vanilla --rust'
];

for (let i = 0; i < commands.length; i++) {
    // remove temporary blank project
    shell.rm('-rf', `tmp-project-${i}`);

    shell.exec(`${commands[i]} tmp-project-${i}`, function(code, stdout, stderr) {
        console.log(`Ran ${commands[i]}…`);
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
        shell.cd(`tmp-project-${i}`);
        shell.env.FILE = 'package.json';
        if (!shell.test('-e', shell.env.FILE)) {
            shell.echo(`Couldn't find ${shell.env.FILE}`);
            shell.exit(1);
        }

        shell.exec('npm install');
        shell.exec('npm run test');
        shell.cd('..');

        shell.rm('-rf', `tmp-project-${i}`);
    });

}

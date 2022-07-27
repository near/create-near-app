const prompt = require('prompts');

async function getUserInput() {
  const questions = [
    {
      type: 'select',
      name: 'contract',
      message: 'Select your smart-contract language',
      choices: [
        {title: 'JavaScript', value: 'js'},
        {title: 'Rust', value: 'rust'},
        {title: 'AssemblyScript', value: 'assemblyscript'},
      ]
    },
    {
      type: 'select',
      name: 'frontend',
      message: 'Select a template for your frontend',
      choices: [
        {title: 'React.js', value: 'react'},
        {title: 'Vanilla JavaScript', value: 'vanilla'},
        {title: 'No frontend', value: 'none'},
      ]
    },
    {
      type: 'text',
      name: 'projectName',
      message: 'Name your project (this will create a directory with that name)',
      initial: 'my-near-project',
      format: v => `${v}`
    },
  ];

  const answers = await prompt(questions);
  return answers;
}

exports.getUserInput = getUserInput;
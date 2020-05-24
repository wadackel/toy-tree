const meow = require('meow');
const { read } = require('./read');
const { format } = require('./format');

exports.main = (argv, stdout, stderr) => {
  const cli = meow(
    `
    Usage
      $ toy-tree <directory>

    Options
      --level, -L  Max display depth of the directory tree.

    Examples
      $ toy-tree
      $ toy-tree path/to/dir
`,
    {
      flags: {
        level: {
          type: 'number',
          alias: 'L',
          default: Infinity,
        },
      },
      argv,
    },
  );

  const dir = cli.input[0] || '.';

  const options = {
    level: cli.flags.level,
  };

  if (options.level < 1) {
    stderr('Error: Invalid level, must be greater than 0.');
    return 1;
  }

  let root;

  try {
    root = read(dir, options);
  } catch (e) {
    stderr(`Error: ${e.message}`);
    return 1;
  }

  const output = format(root);

  stdout(output);

  return 0;
};

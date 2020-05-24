const fs = require('fs');
const path = require('path');

const readDirectory = (dir) => {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const nodes = [];

  dirents.forEach((dirent) => {
    if (dirent.name.startsWith('.')) {
      return;
    }

    if (dirent.isFile()) {
      nodes.push({
        type: 'file',
        name: dirent.name,
      });
    } else if (dirent.isDirectory()) {
      nodes.push({
        type: 'directory',
        name: dirent.name,
        children: readDirectory(path.join(dir, dirent.name)),
      });
    }
  });

  return nodes;
};

exports.read = (dir) => {
  let stat;

  try {
    stat = fs.statSync(dir);
  } catch (e) {
    throw new Error(`"${dir}" does not exist.`);
  }

  if (!stat.isDirectory()) {
    throw new Error(`"${dir}" can't be opened as a directory.`);
  }

  const root = {
    type: 'directory',
    name: dir,
    children: readDirectory(dir),
  };

  return root;
};

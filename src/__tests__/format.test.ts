import { format } from '../format';

describe('format', () => {
  test('only root', () => {
    expect(
      format({
        type: 'directory',
        name: 'root',
        children: [],
      }),
    ).toMatchSnapshot();
  });

  test('nest', () => {
    expect(
      format({
        type: 'directory',
        name: 'root',
        children: [
          {
            type: 'file',
            name: 'file1.txt',
          },
          {
            type: 'file',
            name: 'file2.txt',
          },
          {
            type: 'directory',
            name: 'dir1',
            children: [
              {
                type: 'file',
                name: 'deep1.txt',
              },
            ],
          },
          {
            type: 'directory',
            name: 'dir2',
            children: [
              {
                type: 'file',
                name: 'deep1.txt',
              },
            ],
          },
        ],
      }),
    ).toMatchSnapshot();
  });
});

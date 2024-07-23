import { exec } from 'child_process';

const command = `typeorm-ts-node-commonjs migration:run -d ./src/shared/data-source.ts`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  if (stderr) {
    console.error(stderr);
    return;
  }
  console.log(stdout);
});

import { exec } from 'child_process';

const migrationName = process.argv[2];
if (!migrationName) {
  console.log('Please provide a migration name');
  process.exit(1);
}

const command = `npx typeorm migration:create ./migrations/${migrationName}`;

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

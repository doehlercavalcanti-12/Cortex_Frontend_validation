import { mkdir, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';

const requiredDirectories = ['src', 'public', 'reports'];
const requiredFiles = [
  'tsconfig.json',
  'vite.config.ts',
  'index.html',
  'public/index.html',
  'src/index.tsx',
  'src/App.tsx'
];

async function ensureDirectory(path) {
  try {
    await mkdir(path, { recursive: true });
    console.log(`✔ Ensured directory: ${path}`);
  } catch (error) {
    console.error(`✖ Failed to ensure directory ${path}:`, error);
    process.exitCode = 1;
  }
}

async function ensureFile(path) {
  try {
    await access(path, constants.F_OK);
    console.log(`✔ Verified file: ${path}`);
  } catch {
    if (path.endsWith('reports/lint.md') || path.endsWith('reports/security.md')) {
      await writeFile(path, '# Report\n');
      console.log(`✔ Created report placeholder: ${path}`);
      return;
    }

    console.error(`✖ Missing required file: ${path}`);
    process.exitCode = 1;
  }
}

async function main() {
  console.log('Configuring React boilerplate environment...');
  await Promise.all(requiredDirectories.map(ensureDirectory));
  for (const file of requiredFiles) {
    await ensureFile(file);
  }

  console.log('Environment configuration complete.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

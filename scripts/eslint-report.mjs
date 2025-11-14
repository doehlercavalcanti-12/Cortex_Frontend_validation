import { readFile, writeFile } from 'node:fs/promises';

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error('Usage: node scripts/eslint-report.mjs <input.json> <output.md>');
  process.exit(1);
}

async function main() {
  const json = await readFile(new URL(`../${inputPath}`, import.meta.url), 'utf-8');
  const data = JSON.parse(json);

  const lines = ['# ESLint Report', '', '| File | Severity | Rule | Message |', '| --- | --- | --- | --- |'];

  if (data.length === 0) {
    lines.push('| ✓ | 0 | - | No issues found |');
  } else {
    for (const result of data) {
      for (const message of result.messages) {
        lines.push(
          `| ${result.filePath.replace(process.cwd(), '.')} | ${message.severity === 2 ? 'Error' : 'Warning'} | ${message.ruleId ?? '-'} | ${message.message.replace(/\|/g, '\\|')} |`
        );
      }
    }
  }

  await writeFile(new URL(`../${outputPath}`, import.meta.url), `${lines.join('\n')}\n`);
  console.log(`Markdown ESLint report generated at ${outputPath}`);
}

main().catch((error) => {
  console.error('Failed to generate ESLint report:', error);
  process.exit(1);
});

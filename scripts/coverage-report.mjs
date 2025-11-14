import { readFile, writeFile } from 'node:fs/promises';

const summaryPath = new URL('../coverage/coverage-summary.json', import.meta.url);
const reportPath = new URL('../reports/coverage.md', import.meta.url);

async function main() {
  const content = await readFile(summaryPath, 'utf-8');
  const summary = JSON.parse(content);
  const lines = ['# Coverage Report', '', '| File | Statements | Branches | Functions | Lines |', '| --- | --- | --- | --- | --- |'];

  for (const [file, metrics] of Object.entries(summary)) {
    if (file === 'total') {
      continue;
    }
    lines.push(
      `| ${file} | ${metrics.statements.pct}% | ${metrics.branches.pct}% | ${metrics.functions.pct}% | ${metrics.lines.pct}% |`
    );
  }

  const total = summary.total;
  lines.push('', '## Total Coverage', '', `- Statements: ${total.statements.pct}%`);
  lines.push(`- Branches: ${total.branches.pct}%`);
  lines.push(`- Functions: ${total.functions.pct}%`);
  lines.push(`- Lines: ${total.lines.pct}%`);

  await writeFile(reportPath, `${lines.join('\n')}\n`);
  console.log(`Markdown coverage report generated at reports/coverage.md`);
}

main().catch((error) => {
  console.error('Failed to generate coverage report:', error);
  process.exit(1);
});

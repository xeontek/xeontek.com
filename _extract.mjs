import fs from 'fs';
import path from 'path';

const filepath = path.join('C:', 'Users', 'Alvin', '.claude', 'projects', 'C--Users-Alvin-Workspace-xeontek-com', 'bd631a8c-361a-478b-a9c0-fb758a3a95ea.jsonl');
const lines = fs.readFileSync(filepath, 'utf-8').split('\n');

// Find all Write tool calls after line 1028
for (let i = 1028; i < lines.length; i++) {
  if (!lines[i]?.trim()) continue;
  try {
    const o = JSON.parse(lines[i]);
    const c = o?.message?.content;
    if (Array.isArray(c)) {
      for (const item of c) {
        if (item?.type === 'tool_use' && item.name === 'Write') {
          const f = item.input?.file_path || '';
          console.log('Line', i + 1, ':', f, 'len:', (item.input?.content || '').length);
        }
      }
    }
  } catch (e) {}
}

import fs from 'fs';
import path from 'path';

const filepath = path.join('C:', 'Users', 'Alvin', '.claude', 'projects', 'C--Users-Alvin-Workspace-xeontek-com', 'bd631a8c-361a-478b-a9c0-fb758a3a95ea.jsonl');
const lines = fs.readFileSync(filepath, 'utf-8').split('\n');

// Search the ENTIRE file for any tool calls that wrote whitepaper content
for (let i = 0; i < lines.length; i++) {
  if (!lines[i]?.trim()) continue;
  try {
    const o = JSON.parse(lines[i]);
    const c = o?.message?.content;
    if (Array.isArray(c)) {
      for (const item of c) {
        if (item?.type === 'tool_use' && item.name === 'Write') {
          const f = item.input?.file_path || '';
          const len = (item.input?.content || '').length;
          if (len > 1000) {
            console.log('Line', i + 1, ':', f, 'len:', len);
          }
        }
        if (item?.type === 'tool_use' && item.name === 'Bash') {
          const cmd = item.input?.command || '';
          if (cmd.length > 2000 && (cmd.includes('EOF') || cmd.includes('cat'))) {
            console.log('Line', i + 1, ': Bash (large) -', cmd.substring(0, 300));
          }
        }
      }
    }
  } catch (e) {}
}

// Nightly kinwove backup: table data + storage objects.
// Driven by ~/Library/LaunchAgents/com.kinwove.backup.plist.
//
// Deliberately a .mjs and not a shell wrapper: the repo used to live under
// ~/Desktop, which macOS protects with TCC, and a bash wrapper died there with
// "Operation not permitted". Moved to ~/kinwove on 19 Oct 2026; still node.
//
// Both halves run even if the first throws, so a data-export failure can't
// silently cost the storage mirror too.
//
// ⭐ A run that fails tries once more an hour later (Daniel, 29 Oct 2026):
// most failures are the Mac's network still waking up. The second try is this
// same file as a fresh process, because an import() runs a module only once.
// Old daily folders are cleaned up only after a run that worked
// (backup-prune.mjs), so a week of failures can never eat the good copies.
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { prune } from './backup-prune.mjs';

const RETRY_MIN = 60;

const stamp = () => new Date().toISOString().replace('T', ' ').slice(0, 19);
let rc = 0;

for (const [label, mod] of [['data', './backup-data.mjs'], ['storage', './backup-storage.mjs']]) {
  console.log(`===== ${stamp()}  ${label} =====`);
  try {
    await import(mod);
  } catch (e) {
    console.error(`!! ${label} backup FAILED: ${e?.message ?? e}`);
    rc = 1;
  }
}

console.log(`===== ${stamp()}  done (exit ${rc || process.exitCode || 0}) =====`);
// A half can also report a partial failure (skipped tables, failed files)
// without throwing, through process.exitCode. Keep that, do not overwrite it.
process.exitCode = rc || process.exitCode || 0;

if (!process.exitCode) {
  const gone = prune(path.join(os.homedir(), 'kinwove-backups'));
  if (gone.length) console.log(`  cleaned up ${gone.length} old day${gone.length > 1 ? 's' : ''}: ${gone.join(', ')}`);
} else if (!process.env.BACKUP_RETRY) {
  console.log(`===== ${stamp()}  trying again in ${RETRY_MIN} min =====`);
  await new Promise((r) => setTimeout(r, RETRY_MIN * 60 * 1000));
  const again = spawnSync(process.execPath, [fileURLToPath(import.meta.url)], {
    stdio: 'inherit', env: { ...process.env, BACKUP_RETRY: '1' },
  });
  process.exitCode = again.status ?? 1;
}

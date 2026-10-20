// Nightly kinwove backup: table data + storage objects.
// Driven by ~/Library/LaunchAgents/com.kinwove.backup.plist.
//
// Deliberately a .mjs and not a shell wrapper: the repo used to live under
// ~/Desktop, which macOS protects with TCC, and a bash wrapper died there with
// "Operation not permitted". Moved to ~/kinwove on 19 Oct 2026; still node.
//
// Both halves run even if the first throws, so a data-export failure can't
// silently cost the storage mirror too.

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

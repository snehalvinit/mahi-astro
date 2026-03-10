#!/usr/bin/env python3
"""Zen Taskmaster — Live Dashboard Server.

Usage:
    python3 serve_dashboard.py                    # auto-detect task dir
    DASH_PORT=8095 python3 serve_dashboard.py     # custom port
    python3 serve_dashboard.py /path/to/.tasks/my-project  # explicit task dir
"""
import http.server
import json
import os
import subprocess
import sys
from pathlib import Path
from urllib.parse import urlparse

PORT = int(os.environ.get("DASH_PORT", 8095))

# Auto-detect task directory
if len(sys.argv) > 1 and Path(sys.argv[1]).is_dir():
    TASK_DIR = Path(sys.argv[1]).resolve()
else:
    TASK_DIR = Path(__file__).resolve().parent

TASKS_MD = TASK_DIR / "tasks.md"
PROGRESS_MD = TASK_DIR / "progress.md"
RUN_LOG = TASK_DIR / "run.log"
RESULTS_DIR = TASK_DIR / "results"

DASHBOARD_HTML = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Zen Taskmaster — Live Dashboard</title>
<style>
  :root {
    --bg: #0f0f14; --surface: #1a1a24; --surface2: #22223a; --border: #2d2d44;
    --text: #d4d4e8; --dim: #7b7b9e;
    --green: #4ade80; --yellow: #facc15; --red: #f87171; --blue: #60a5fa;
    --purple: #a78bfa; --cyan: #22d3ee; --indigo: #818cf8;
    --gradient: linear-gradient(135deg, #818cf8, #c084fc, #f0abfc);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace;
    background: var(--bg); color: var(--text); font-size: 13px;
  }
  .container { max-width: 1400px; margin: 0 auto; padding: 20px; }

  /* Header */
  .header { margin-bottom: 24px; }
  .header h1 {
    font-size: 24px; font-weight: 700;
    background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .header .meta { color: var(--dim); font-size: 11px; margin-top: 4px; }

  /* Stats bar */
  .stats { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
  .stat {
    padding: 14px 20px; border-radius: 12px; background: var(--surface);
    border: 1px solid var(--border); min-width: 100px; text-align: center;
    transition: transform 0.2s; cursor: default;
  }
  .stat:hover { transform: translateY(-2px); }
  .stat .num { font-size: 32px; font-weight: 800; line-height: 1; }
  .stat .label { font-size: 10px; color: var(--dim); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px; }
  .stat.done .num { color: var(--green); }
  .stat.pending .num { color: var(--yellow); }
  .stat.blocked .num { color: var(--red); }
  .stat.total .num { color: var(--blue); }
  .stat.pct .num { background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

  /* Progress bar */
  .progress-outer {
    width: 100%; height: 28px; background: var(--surface); border-radius: 14px;
    border: 1px solid var(--border); margin-bottom: 24px; overflow: hidden; position: relative;
  }
  .progress-fill {
    height: 100%; background: var(--gradient); transition: width 0.8s ease;
    border-radius: 14px; display: flex; align-items: center; justify-content: center;
    color: var(--bg); font-weight: 800; font-size: 12px; min-width: 40px;
  }

  /* Sections */
  .section {
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    margin-bottom: 16px; overflow: hidden;
  }
  .section-header {
    padding: 12px 16px; border-bottom: 1px solid var(--border); font-weight: 700;
    font-size: 14px; cursor: pointer; user-select: none;
    display: flex; justify-content: space-between; align-items: center;
    background: var(--surface2); transition: background 0.2s;
  }
  .section-header:hover { background: rgba(129,140,248,0.08); }
  .section-header .title { background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .section-body { padding: 14px 16px; max-height: 600px; overflow-y: auto; }
  .section-body.collapsed { display: none; }

  /* Task rows */
  .phase-label {
    color: var(--purple); font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.08em; margin: 12px 0 6px; padding: 4px 0;
    border-bottom: 1px solid var(--border);
  }
  .task-row {
    padding: 6px 8px; display: flex; gap: 10px; align-items: center;
    border-radius: 6px; transition: background 0.15s;
  }
  .task-row:hover { background: rgba(255,255,255,0.03); }
  .task-row .icon { width: 20px; text-align: center; font-size: 14px; }
  .task-row .icon.done { color: var(--green); }
  .task-row .icon.pending { color: var(--yellow); }
  .task-row .icon.blocked { color: var(--red); }
  .task-row .name { flex: 1; }
  .task-row .tag {
    font-size: 10px; padding: 2px 8px; border-radius: 10px; font-weight: 600;
  }
  .tag-build { background: rgba(96,165,250,0.15); color: var(--blue); }
  .tag-verify { background: rgba(74,222,128,0.15); color: var(--green); }
  .tag-fix { background: rgba(248,113,113,0.15); color: var(--red); }
  .tag-backup { background: rgba(167,139,250,0.15); color: var(--purple); }
  .tag-research { background: rgba(34,211,238,0.15); color: var(--cyan); }
  .task-row .subs { color: var(--dim); font-size: 11px; min-width: 50px; text-align: right; }
  .task-row.current { background: rgba(250,204,21,0.08); border: 1px solid rgba(250,204,21,0.2); }

  /* Log and progress */
  pre.log {
    white-space: pre-wrap; word-break: break-all; font-size: 11px; line-height: 1.6; color: var(--dim);
  }
  pre.log .err { color: var(--red); font-weight: 600; }
  pre.log .ok { color: var(--green); }
  pre.log .iter { color: var(--cyan); font-weight: 700; }
  pre.log .tool { color: var(--indigo); }
  pre.log .text { color: var(--text); }
  pre.progress { white-space: pre-wrap; font-size: 12px; line-height: 1.7; }

  /* Grid layout */
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 1000px) { .grid { grid-template-columns: 1fr; } }

  /* Reports section */
  .reports { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
  .report-link {
    padding: 6px 12px; background: var(--surface2); border: 1px solid var(--border);
    border-radius: 8px; color: var(--cyan); text-decoration: none; font-size: 12px;
    transition: all 0.2s;
  }
  .report-link:hover { background: rgba(34,211,238,0.1); border-color: var(--cyan); }

  .pulse { animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
  .refresh-badge {
    position: fixed; bottom: 12px; right: 16px; color: var(--dim); font-size: 10px;
    background: var(--surface); padding: 4px 10px; border-radius: 8px; border: 1px solid var(--border);
  }

  /* Waiting banner */
  .waiting-banner {
    background: rgba(250,204,21,0.12); border: 1px solid rgba(250,204,21,0.3);
    border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;
    display: none;
  }
  .waiting-banner.active { display: block; }
  .waiting-banner h3 { color: var(--yellow); margin-bottom: 8px; font-size: 15px; }
  .waiting-banner p { color: var(--text); font-size: 12px; margin-bottom: 4px; }
  .waiting-banner .file-path {
    font-family: monospace; font-size: 11px; color: var(--cyan);
    background: var(--surface2); padding: 4px 8px; border-radius: 4px;
    display: inline-block; margin-top: 6px;
  }
  .complete-banner {
    background: rgba(74,222,128,0.12); border: 1px solid rgba(74,222,128,0.3);
    border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;
    display: none;
  }
  .complete-banner.active { display: block; }
  .complete-banner h3 { color: var(--green); margin-bottom: 8px; font-size: 15px; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>Zen Taskmaster</h1>
    <div class="meta" id="meta">Connecting...</div>
  </div>

  <div class="waiting-banner" id="waiting-banner">
    <h3>&#9888; Waiting for Your Input</h3>
    <p id="waiting-msg"></p>
    <span class="file-path" id="waiting-file"></span>
  </div>
  <div class="complete-banner" id="complete-banner">
    <h3>&#10004; Tasks Complete</h3>
    <p id="complete-msg"></p>
  </div>

  <div class="stats" id="stats"></div>
  <div class="progress-outer"><div class="progress-fill" id="pbar">0%</div></div>

  <div class="section">
    <div class="section-header" onclick="toggle('tasks')">
      <span class="title">Task Checklist</span> <span id="tasks-arrow">&#9660;</span>
    </div>
    <div class="section-body" id="tasks"></div>
  </div>

  <div class="grid">
    <div class="section">
      <div class="section-header" onclick="toggle('progress')">
        <span class="title">Handover Log</span> <span id="progress-arrow">&#9660;</span>
      </div>
      <div class="section-body" id="progress"><pre class="progress">Loading...</pre></div>
    </div>
    <div class="section">
      <div class="section-header" onclick="toggle('log')">
        <span class="title">Live Log (last 80 lines)</span>
        <span><span id="live-dot" class="pulse" style="color:var(--green)">&#9679;</span> <span id="log-arrow">&#9660;</span></span>
      </div>
      <div class="section-body" id="log"><pre class="log">Waiting for log...</pre></div>
    </div>
  </div>

  <div class="section" id="reports-section" style="display:none">
    <div class="section-header" onclick="toggle('reports')">
      <span class="title">Generated Reports</span> <span id="reports-arrow">&#9660;</span>
    </div>
    <div class="section-body" id="reports"></div>
  </div>
</div>

<div class="refresh-badge" id="refresh-badge">--</div>

<script>
let collapsed = {};
function toggle(id) {
  collapsed[id] = !collapsed[id];
  document.getElementById(id).classList.toggle('collapsed', collapsed[id]);
  document.getElementById(id+'-arrow').textContent = collapsed[id] ? '\u25B6' : '\u25BC';
}
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function colorLog(text) {
  return text.split('\n').map(l => {
    if (/ERROR|FAIL|Traceback|Exception/i.test(l)) return `<span class="err">${esc(l)}</span>`;
    if (/=== Iteration/i.test(l)) return `<span class="iter">${esc(l)}</span>`;
    if (/\[tool\]/.test(l)) return `<span class="tool">${esc(l)}</span>`;
    if (/\[text\]/.test(l)) return `<span class="text">${esc(l)}</span>`;
    if (/pass|complete|OK|success/i.test(l)) return `<span class="ok">${esc(l)}</span>`;
    return esc(l);
  }).join('\n');
}

function parseTasks(md) {
  const lines = md.split('\n');
  let tasks = [], phase = '';
  for (const line of lines) {
    const pm = line.match(/^## PHASE (\d+)/);
    if (pm) { phase = line.replace(/^## /, ''); continue; }
    if (line.match(/^## Appendix/)) { phase = 'Appendix — Fix Tasks'; continue; }
    const tm = line.match(/^### - \[([ x])\] (.+)/);
    if (tm) { tasks.push({ done: tm[1]==='x', name: tm[2].trim(), phase, subs: [] }); continue; }
    const sm = line.match(/^- \[([ x])\] (.+)/);
    if (sm && tasks.length) tasks[tasks.length-1].subs.push({ done: sm[1]==='x', text: sm[2].trim() });
  }
  return tasks;
}

function taskType(name) {
  if (/^(B\d|Backup)/.test(name)) return 'backup';
  if (/^(V\d|VFX|Gate)/.test(name)) return 'verify';
  if (/^(FX-)/.test(name)) return 'fix';
  if (/research/i.test(name)) return 'research';
  return 'build';
}

function renderTasks(tasks) {
  let html = '', lastPhase = '', foundCurrent = false;
  for (const t of tasks) {
    if (t.phase !== lastPhase) { html += `<div class="phase-label">${esc(t.phase)}</div>`; lastPhase = t.phase; }
    const isCurrent = !t.done && !foundCurrent;
    if (isCurrent) foundCurrent = true;
    const sd = t.subs.filter(s=>s.done).length, st = t.subs.length;
    const sub = st ? `${sd}/${st}` : '';
    const type = taskType(t.name);
    const blocked = t.name.includes('BLOCKED');
    const iconCls = t.done ? 'done' : blocked ? 'blocked' : 'pending';
    const icon = t.done ? '\u2714' : blocked ? '\u2718' : isCurrent ? '\u25B6' : '\u25CB';
    html += `<div class="task-row${isCurrent?' current':''}">
      <span class="icon ${iconCls}">${icon}</span>
      <span class="name">${esc(t.name)}</span>
      <span class="tag tag-${type}">${type}</span>
      <span class="subs">${sub}</span>
    </div>`;
  }
  return html;
}

async function refresh() {
  try {
    const [tr, pr, lr, rr, sr] = await Promise.all([
      fetch('/api/tasks').then(r=>r.json()),
      fetch('/api/progress').then(r=>r.json()),
      fetch('/api/log').then(r=>r.json()),
      fetch('/api/reports').then(r=>r.json()).catch(()=>({files:[]})),
      fetch('/api/status').then(r=>r.json()).catch(()=>({})),
    ]);
    const tasks = parseTasks(tr.content);
    const done = tasks.filter(t=>t.done).length, total = tasks.length;
    const blocked = tasks.filter(t=>t.name.includes('BLOCKED')).length;
    const pending = total - done - blocked;
    const pct = total ? Math.round(done/total*100) : 0;

    document.getElementById('stats').innerHTML = `
      <div class="stat done"><div class="num">${done}</div><div class="label">Done</div></div>
      <div class="stat pending"><div class="num">${pending}</div><div class="label">Pending</div></div>
      ${blocked?`<div class="stat blocked"><div class="num">${blocked}</div><div class="label">Blocked</div></div>`:''}
      <div class="stat total"><div class="num">${total}</div><div class="label">Total</div></div>
      <div class="stat pct"><div class="num">${pct}%</div><div class="label">Complete</div></div>`;
    const pb = document.getElementById('pbar');
    pb.style.width = Math.max(pct,2)+'%'; pb.textContent = pct+'%';

    if (!collapsed.tasks) document.getElementById('tasks').innerHTML = renderTasks(tasks);
    if (!collapsed.progress) document.getElementById('progress').innerHTML = `<pre class="progress">${esc(pr.content)}</pre>`;
    if (!collapsed.log) {
      const el = document.getElementById('log');
      const atBot = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
      el.innerHTML = `<pre class="log">${colorLog(lr.content)}</pre>`;
      if (atBot) el.scrollTop = el.scrollHeight;
    }
    // Reports
    if (rr.files && rr.files.length) {
      document.getElementById('reports-section').style.display = '';
      if (!collapsed.reports) {
        document.getElementById('reports').innerHTML = '<div class="reports">' +
          rr.files.map(f=>`<a class="report-link" href="/report/${encodeURIComponent(f)}" target="_blank">${esc(f)}</a>`).join('') + '</div>';
      }
    }
    const now = new Date().toLocaleTimeString();
    document.getElementById('meta').textContent = `${done}/${total} tasks | Auto-refresh 5s | ${now}`;
    document.getElementById('refresh-badge').textContent = now;
    document.getElementById('live-dot').style.color = lr.content.includes('(no log') ? 'var(--dim)' : 'var(--green)';

    // Status banners (waiting / complete)
    const wb = document.getElementById('waiting-banner');
    const cb = document.getElementById('complete-banner');
    wb.classList.remove('active'); cb.classList.remove('active');
    if (sr.status === 'waiting') {
      wb.classList.add('active');
      document.getElementById('waiting-msg').textContent = sr.message || 'Please provide input to continue.';
      document.getElementById('waiting-file').textContent = sr.resume_file || '';
    } else if (sr.status === 'complete') {
      cb.classList.add('active');
      document.getElementById('complete-msg').textContent = sr.message || 'All tasks finished.';
    }
  } catch(e) { document.getElementById('meta').textContent = 'Error: '+e.message; }
}
refresh(); setInterval(refresh, 5000);
</script>
</body>
</html>"""


PROJECT_DASHBOARD_HTML = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Zen Taskmaster — Mission Control</title>
<style>
  :root {
    --bg: #0f0f14; --surface: #1a1a24; --surface2: #22223a; --border: #2d2d44;
    --text: #d4d4e8; --dim: #7b7b9e;
    --green: #4ade80; --yellow: #facc15; --red: #f87171; --blue: #60a5fa;
    --purple: #a78bfa; --cyan: #22d3ee; --indigo: #818cf8;
    --gradient: linear-gradient(135deg, #818cf8, #c084fc, #f0abfc);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'SF Mono', 'Fira Code', monospace; background: var(--bg); color: var(--text); font-size: 13px; }
  .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
  .header h1 { font-size: 24px; background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .header .meta { color: var(--dim); font-size: 11px; margin: 4px 0 20px; }
  .overall { display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
  .ostat { padding: 14px 20px; border-radius: 12px; background: var(--surface); border: 1px solid var(--border); min-width: 100px; text-align: center; }
  .ostat .num { font-size: 28px; font-weight: 800; }
  .ostat .label { font-size: 10px; color: var(--dim); text-transform: uppercase; margin-top: 4px; }
  .ostat.done .num { color: var(--green); }
  .ostat.pending .num { color: var(--yellow); }
  .ostat.groups .num { color: var(--blue); }
  .ostat.pct .num { background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .progress-outer { width: 100%; height: 24px; background: var(--surface); border-radius: 12px; border: 1px solid var(--border); margin-bottom: 24px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--gradient); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--bg); font-weight: 800; font-size: 11px; min-width: 30px; transition: width 0.8s; }
  .group-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; margin-bottom: 16px; overflow: hidden; }
  .group-header { padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; background: var(--surface2); }
  .group-header:hover { background: rgba(129,140,248,0.08); }
  .group-name { font-weight: 700; font-size: 15px; background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .group-status { font-size: 11px; padding: 3px 10px; border-radius: 10px; font-weight: 600; }
  .status-pending { background: rgba(250,204,21,0.15); color: var(--yellow); }
  .status-running { background: rgba(96,165,250,0.15); color: var(--blue); }
  .status-complete { background: rgba(74,222,128,0.15); color: var(--green); }
  .status-failed { background: rgba(248,113,113,0.15); color: var(--red); }
  .status-waiting { background: rgba(250,204,21,0.15); color: var(--yellow); }
  .group-body { padding: 14px 18px; }
  .group-body.collapsed { display: none; }
  .group-bar { width: 100%; height: 8px; background: var(--bg); border-radius: 4px; margin: 8px 0; overflow: hidden; }
  .group-bar-fill { height: 100%; background: var(--gradient); border-radius: 4px; transition: width 0.6s; }
  .group-meta { color: var(--dim); font-size: 11px; margin-bottom: 10px; }
  .task-row { padding: 4px 8px; display: flex; gap: 8px; align-items: center; border-radius: 4px; font-size: 12px; }
  .task-row:hover { background: rgba(255,255,255,0.03); }
  .task-icon { width: 16px; text-align: center; }
  .task-icon.done { color: var(--green); }
  .task-icon.pending { color: var(--dim); }
  .task-icon.running { color: var(--blue); }
  .task-icon.failed { color: var(--red); }
  .task-name { flex: 1; }
  .task-type { font-size: 9px; padding: 1px 6px; border-radius: 6px; }
  .type-build { background: rgba(96,165,250,0.12); color: var(--blue); }
  .type-verify { background: rgba(74,222,128,0.12); color: var(--green); }
  .type-fix { background: rgba(248,113,113,0.12); color: var(--red); }
  .task-deps { color: var(--dim); font-size: 10px; }
  .nav { margin-bottom: 16px; }
  .nav a { color: var(--cyan); text-decoration: none; font-size: 12px; margin-right: 16px; }
  .nav a:hover { text-decoration: underline; }
  .add-form { margin-top: 12px; padding: 12px; background: var(--bg); border-radius: 8px; border: 1px solid var(--border); display: none; }
  .add-form.active { display: block; }
  .add-form input, .add-form select { background: var(--surface); border: 1px solid var(--border); color: var(--text); padding: 6px 10px; border-radius: 6px; font-size: 12px; font-family: inherit; margin: 2px; }
  .add-form button { background: var(--indigo); color: white; border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-family: inherit; font-size: 12px; margin: 2px; }
  .add-form button:hover { opacity: 0.9; }
  .refresh-badge { position: fixed; bottom: 12px; right: 16px; color: var(--dim); font-size: 10px; background: var(--surface); padding: 4px 10px; border-radius: 8px; border: 1px solid var(--border); }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>Mission Control</h1>
    <div class="meta" id="meta">Loading...</div>
  </div>
  <div class="nav">
    <a href="/">Single Group View</a>
    <a href="/project">Project View (all groups)</a>
  </div>
  <div class="overall" id="overall"></div>
  <div class="progress-outer"><div class="progress-fill" id="pbar">0%</div></div>
  <div id="groups"></div>
</div>
<div class="refresh-badge" id="refresh-badge">--</div>
<script>
let collapsedGroups = {};
function toggleGroup(name) {
  collapsedGroups[name] = !collapsedGroups[name];
  const body = document.getElementById('gb-' + name);
  if (body) body.classList.toggle('collapsed', collapsedGroups[name]);
}
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

async function refresh() {
  try {
    const data = await fetch('/api/registry').then(r => r.json());
    const groups = data.groups || [];
    let totalDone = 0, totalAll = 0, totalGroups = groups.length;

    // If registry has groups as object, convert
    let groupList = Array.isArray(groups) ? groups : Object.values(groups);

    // Compute totals
    for (const g of groupList) {
      const tasks = g.tasks || [];
      const done = typeof g.done === 'number' ? g.done : tasks.filter(t => t.status === 'done').length;
      const total = typeof g.total === 'number' ? g.total : tasks.length;
      g._done = done; g._total = total;
      totalDone += done; totalAll += total;
    }
    const pct = totalAll ? Math.round(totalDone / totalAll * 100) : 0;

    document.getElementById('overall').innerHTML = `
      <div class="ostat groups"><div class="num">${totalGroups}</div><div class="label">Groups</div></div>
      <div class="ostat done"><div class="num">${totalDone}</div><div class="label">Done</div></div>
      <div class="ostat pending"><div class="num">${totalAll - totalDone}</div><div class="label">Remaining</div></div>
      <div class="ostat pct"><div class="num">${pct}%</div><div class="label">Overall</div></div>`;
    const pb = document.getElementById('pbar');
    pb.style.width = Math.max(pct, 2) + '%'; pb.textContent = pct + '%';

    let html = '';
    for (const g of groupList) {
      const name = g.name;
      const status = g.status || 'pending';
      const gpct = g._total ? Math.round(g._done / g._total * 100) : 0;
      const tasks = g.tasks || [];

      html += `<div class="group-card">
        <div class="group-header" onclick="toggleGroup('${esc(name)}')">
          <span><span class="group-name">${esc(name)}</span>
          ${g.description ? ' &mdash; <span style="color:var(--dim);font-size:11px">' + esc(g.description) + '</span>' : ''}</span>
          <span>
            <span class="group-status status-${status}">${status}</span>
            <span style="color:var(--dim);font-size:11px;margin-left:8px">${g._done}/${g._total}</span>
          </span>
        </div>
        <div class="group-body${collapsedGroups[name] ? ' collapsed' : ''}" id="gb-${esc(name)}">
          <div class="group-bar"><div class="group-bar-fill" style="width:${gpct}%"></div></div>
          <div class="group-meta">${gpct}% complete | Created: ${(g.created || '').slice(0,10)}</div>`;

      for (const t of tasks) {
        const st = t.status || 'pending';
        const icon = st === 'done' ? '\u2714' : st === 'running' ? '\u25B6' : st === 'failed' ? '\u2718' : st === 'blocked' ? '\u26D4' : '\u25CB';
        const deps = (t.depends_on || []).join(', ');
        const ttype = t.type || 'build';
        const desc = t.description || '';
        const notes = t.notes || '';
        html += `<div class="task-row">
          <span class="task-icon ${st}">${icon}</span>
          <span style="color:var(--dim);font-size:11px;min-width:40px;font-weight:600">${esc(t.id)}</span>
          <span class="task-name">${esc(t.name)}</span>
          <span class="task-type type-${ttype}">${ttype}</span>
          ${deps ? '<span class="task-deps">\u2190 ' + esc(deps) + '</span>' : ''}
        </div>`;
        if (desc || notes) {
          html += '<div style="padding:2px 8px 6px 64px;font-size:11px;color:var(--dim)">';
          if (desc) html += '<div>' + esc(desc) + '</div>';
          if (notes) html += '<div style="color:var(--green);">\u2714 ' + esc(notes) + '</div>';
          html += '</div>';
        }
      }

      // Add task button
      html += `<div style="margin-top:8px">
        <button onclick="document.getElementById('af-${esc(name)}').classList.toggle('active')" style="background:var(--surface2);border:1px solid var(--border);color:var(--dim);padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px">+ Add Task</button>
        <div class="add-form" id="af-${esc(name)}">
          <input id="at-id-${esc(name)}" placeholder="ID (e.g. T5)" style="width:60px">
          <input id="at-name-${esc(name)}" placeholder="Task name" style="width:200px">
          <select id="at-type-${esc(name)}"><option>build</option><option>verify</option><option>fix</option></select>
          <input id="at-deps-${esc(name)}" placeholder="Depends on (T1,T2)" style="width:120px">
          <button onclick="addTask('${esc(name)}')">Add</button>
        </div>
      </div>`;

      html += `</div></div>`;
    }

    if (!groupList.length) {
      html = '<div style="color:var(--dim);text-align:center;padding:40px">No task groups yet. Use /zen-taskmaster to create one.</div>';
    }

    document.getElementById('groups').innerHTML = html;
    const now = new Date().toLocaleTimeString();
    document.getElementById('meta').textContent = `${data.project || '?'} | ${totalGroups} groups | ${totalDone}/${totalAll} tasks | ${now}`;
    document.getElementById('refresh-badge').textContent = now;
  } catch(e) { document.getElementById('meta').textContent = 'Error: ' + e.message; }
}

async function addTask(group) {
  const id = document.getElementById('at-id-' + group).value;
  const name = document.getElementById('at-name-' + group).value;
  const type = document.getElementById('at-type-' + group).value;
  const deps = document.getElementById('at-deps-' + group).value;
  if (!id || !name) { alert('ID and name required'); return; }
  const task = { id, name, type, depends_on: deps ? deps.split(',').map(s=>s.trim()) : [] };
  try {
    const resp = await fetch('/api/add-task', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ group, task })
    });
    const result = await resp.json();
    if (result.error) alert(result.error);
    else { refresh(); document.getElementById('af-' + group).classList.remove('active'); }
  } catch(e) { alert('Error: ' + e.message); }
}

refresh(); setInterval(refresh, 5000);
</script>
</body>
</html>"""


class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        path = urlparse(self.path).path
        if path in ("/", "/index.html", "/dashboard"):
            self._send(200, "text/html", DASHBOARD_HTML)
        elif path == "/project":
            self._send(200, "text/html", self._project_dashboard_html())
        elif path == "/api/tasks":
            self._json_file(TASKS_MD)
        elif path == "/api/progress":
            self._json_file(PROGRESS_MD)
        elif path == "/api/log":
            self._json_log()
        elif path == "/api/status":
            self._json_status()
        elif path == "/api/reports":
            self._json_reports()
        elif path == "/api/registry":
            self._json_registry()
        elif path.startswith("/report/"):
            self._serve_report(path[8:])
        else:
            self.send_error(404)

    def do_POST(self):
        path = urlparse(self.path).path
        if path == "/api/add-task":
            self._handle_add_task()
        else:
            self.send_error(404)

    def _handle_add_task(self):
        """Add a task to a group via POST."""
        try:
            length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(length))
            group = body.get("group", "")
            task = body.get("task", {})
            if not group or not task:
                self._send(400, "application/json", json.dumps({"error": "group and task required"}))
                return
            sys.path.insert(0, str(Path(__file__).parent))
            from task_registry import TaskRegistry
            reg = TaskRegistry(TASK_DIR.parent.parent)
            result = reg.add_task(group, task)
            self._send(200, "application/json", json.dumps(result))
        except Exception as e:
            self._send(500, "application/json", json.dumps({"error": str(e)}))

    def _json_registry(self):
        """Return the full project registry (all groups).

        If registry.json exists, merge it with any legacy tasks.md groups
        not already in the registry. If no registry, parse all tasks.md files.
        """
        tasks_root = TASK_DIR.parent
        registry_file = tasks_root / "registry.json"

        # Load registry if it exists
        registry_groups = {}
        if registry_file.exists():
            try:
                data = json.loads(registry_file.read_text())
                registry_groups = data.get("groups", {})
            except json.JSONDecodeError:
                data = {}
        else:
            data = {}

        # Scan all task dirs for legacy tasks.md groups
        all_groups = dict(registry_groups)  # start with registry groups
        for d in sorted(tasks_root.iterdir()):
            if not d.is_dir() or d.name.startswith("."):
                continue
            if d.name in all_groups:
                continue  # already in registry
            tasks_md = d / "tasks.md"
            if not tasks_md.exists():
                continue
            # Parse tasks from markdown checkboxes
            parsed = self._parse_tasks_md(tasks_md)
            if parsed["tasks"]:
                all_groups[d.name] = parsed

        data["project"] = data.get("project", tasks_root.parent.name)
        data["groups"] = all_groups
        self._send(200, "application/json", json.dumps(data))

    @staticmethod
    def _parse_tasks_md(tasks_md_path):
        """Parse a legacy tasks.md file into registry-compatible format.

        Handles 3 formats:
        1. ### - [x] T1: Task Name
        2. | N | T1 | Type | Name | Deps | - [x] |  (table rows)
        3. - [x] Plain description  (simple checkboxes)
        """
        import re
        content = tasks_md_path.read_text()
        tasks = []
        seen_ids = set()

        def _task_type(tid, name):
            id_upper = tid.upper()
            if id_upper.startswith("V") or "verify" in name.lower() or "gate" in name.lower():
                return "verify"
            if id_upper.startswith("FX") or (id_upper.startswith("F") and not id_upper.startswith("FE")):
                return "fix"
            if "test" in name.lower():
                return "test"
            if "research" in name.lower() or "analy" in name.lower():
                return "research"
            if "debug" in name.lower():
                return "fix"
            return "build"

        # Pattern 1: ### - [x] T1: Task Name
        for m in re.finditer(r'###\s*-\s*\[([ xX])\]\s*([A-Z]+[\-]?\d+):\s*(.+?)(?:\n|$)', content):
            tid = m.group(2).strip()
            if tid not in seen_ids:
                seen_ids.add(tid)
                name = m.group(3).strip()
                tasks.append({"id": tid, "name": name, "type": _task_type(tid, name),
                              "status": "done" if m.group(1).strip().lower() == "x" else "pending",
                              "depends_on": []})

        # Pattern 2: table rows  | N | T1 | Type | Name | Deps | - [x] |
        for m in re.finditer(
            r'\|\s*\d+\w?\s*\|\s*([A-Z][\w-]*\d+)\s*\|\s*(\w+)\s*\|\s*(.+?)\s*\|\s*([^|]*)\s*\|\s*-\s*\[([ xX])\]\s*\|',
            content
        ):
            tid = m.group(1).strip()
            if tid not in seen_ids:
                seen_ids.add(tid)
                ttype = m.group(2).strip().lower()
                name = m.group(3).strip()
                deps_raw = m.group(4).strip()
                deps = [d.strip() for d in deps_raw.split(",") if d.strip() and d.strip() not in ("—", "---", "None", "none")]
                tasks.append({"id": tid, "name": name, "type": ttype if ttype in ("build","verify","fix","test","research","debug","analysis") else _task_type(tid, name),
                              "status": "done" if m.group(5).strip().lower() == "x" else "pending",
                              "depends_on": deps})

        # Pattern 3: simple checkboxes (only if no tasks found yet)
        if not tasks:
            idx = 0
            for m in re.finditer(r'^- \[([ xX])\]\s+(.+?)$', content, re.MULTILINE):
                line = m.group(2).strip()
                # Skip validation sub-items (indented or very short)
                if len(line) < 10:
                    continue
                idx += 1
                tid = f"S{idx}"
                tasks.append({"id": tid, "name": line, "type": _task_type(tid, line),
                              "status": "done" if m.group(1).strip().lower() == "x" else "pending",
                              "depends_on": []})

        done_count = sum(1 for t in tasks if t["status"] == "done")
        total_count = len(tasks)
        if total_count > 0 and done_count == total_count:
            status = "complete"
        elif done_count > 0:
            status = "running"
        else:
            status = "pending"

        return {
            "name": tasks_md_path.parent.name,
            "description": f"Legacy task group ({total_count} tasks)",
            "status": status,
            "tasks": tasks,
            "task_order": [t["id"] for t in tasks],
        }

    def _project_dashboard_html(self):
        """Multi-group project dashboard."""
        return PROJECT_DASHBOARD_HTML

    def _send(self, code, ctype, body):
        self.send_response(code)
        self.send_header("Content-Type", f"{ctype}; charset=utf-8")
        self.send_header("Cache-Control", "no-cache")
        self.end_headers()
        self.wfile.write(body.encode() if isinstance(body, str) else body)

    def _json_file(self, path):
        try:
            text = path.read_text()
        except FileNotFoundError:
            text = "(file not found)"
        self._send(200, "application/json", json.dumps({"content": text}))

    def _json_log(self):
        try:
            result = subprocess.run(["tail", "-80", str(RUN_LOG)], capture_output=True, text=True, timeout=5)
            lines = []
            for line in result.stdout.split("\n"):
                s = line.strip()
                if not s:
                    continue
                if s.startswith("{") and '"type"' in s:
                    try:
                        obj = json.loads(s)
                        t = obj.get("type", "")
                        if t == "assistant":
                            for block in obj.get("message", {}).get("content", []):
                                if isinstance(block, dict):
                                    if block.get("type") == "tool_use":
                                        lines.append(f"  [tool] {block.get('name','?')}: {str(block.get('input',{}))[:120]}")
                                    elif block.get("type") == "text":
                                        txt = block.get("text", "")[:200].strip()
                                        if txt:
                                            lines.append(f"  [text] {txt}")
                        elif t == "system":
                            sub = obj.get("subtype", "")
                            if sub == "init":
                                lines.append(f"  [init] model={obj.get('model','?')}")
                    except json.JSONDecodeError:
                        pass
                else:
                    lines.append(line)
            text = "\n".join(lines[-60:])
        except (FileNotFoundError, subprocess.TimeoutExpired):
            text = "(no log file yet)"
        self._send(200, "application/json", json.dumps({"content": text}))

    def _json_status(self):
        status_file = TASK_DIR / "input" / ".status"
        try:
            data = json.loads(status_file.read_text())
        except (FileNotFoundError, json.JSONDecodeError):
            data = {"status": "running"}
        self._send(200, "application/json", json.dumps(data))

    def _json_reports(self):
        files = []
        if RESULTS_DIR.exists():
            files = [f.name for f in sorted(RESULTS_DIR.glob("*.html"))]
        self._send(200, "application/json", json.dumps({"files": files}))

    def _serve_report(self, name):
        import urllib.parse
        name = urllib.parse.unquote(name)
        report = RESULTS_DIR / name
        if report.exists() and report.suffix == ".html":
            self._send(200, "text/html", report.read_text())
        else:
            self.send_error(404)

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    srv = http.server.HTTPServer(("0.0.0.0", PORT), Handler)
    print(f"\n  Zen Taskmaster Dashboard")
    print(f"  http://localhost:{PORT}")
    print(f"\n  Watching:")
    print(f"    {TASKS_MD}")
    print(f"    {PROGRESS_MD}")
    print(f"    {RUN_LOG}")
    print(f"\n  Ctrl+C to stop\n")
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")

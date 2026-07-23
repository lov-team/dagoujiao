'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const main = fs.readFileSync(path.join(root, 'main.js'), 'utf8');

test('loads the milestone counter before the game script', () => {
  const milestoneIndex = html.indexOf('src="milestone-video.js');
  const mainIndex = html.indexOf('src="main.js');

  assert.ok(milestoneIndex >= 0);
  assert.ok(mainIndex > milestoneIndex);
});

test('stores the canonical deployment video as a regular file', () => {
  const video = fs.lstatSync(path.join(root, 'media', 'click-20.mp4'));

  assert.equal(video.isSymbolicLink(), false);
  assert.equal(video.isFile(), true);
});

test('includes an inline milestone video with the canonical media path', () => {
  assert.match(html, /id="milestone-video"/);
  assert.match(html, /src="media\/click-20\.mp4\?v=20260723-bite-2"/);
  assert.match(html, /playsinline/);
});

test('pins the milestone video to the viewport and contains the whole frame', () => {
  assert.match(html, /#milestone-video-layer\s*{[^}]*position:\s*fixed/s);
  assert.match(html, /#milestone-video\s*{[^}]*height:\s*100dvh/s);
  assert.match(html, /#milestone-video\s*{[^}]*object-fit:\s*contain/s);
  assert.match(html, /#milestone-video\s*{[^}]*object-position:\s*center center/s);
});

test('counts every twenty valid stage clicks and suppresses gameplay during playback', () => {
  assert.match(main, /MILESTONE_CLICK_INTERVAL\s*=\s*20/);
  assert.match(main, /milestoneCounter\.registerClick\(\)/);
  assert.match(main, /if \(milestoneVideoPlaying\)/);
});

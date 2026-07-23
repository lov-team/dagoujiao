import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CINEMATIC_BAR_HEIGHT,
  DOG_BASE_WIDTH,
  getReferenceTime,
  getSceneState,
} from './timing.js';

test('maps the clean remake to the 22.25–24.75 reference action', () => {
  assert.equal(getReferenceTime(0), 22.25);
  assert.equal(getReferenceTime(45), 23.5);
  assert.equal(getReferenceTime(90), 24.75);
});

test('uses 144 pixel cinematic bars', () => {
  assert.equal(CINEMATIC_BAR_HEIGHT, 144);
  assert.equal(DOG_BASE_WIDTH, 1440);
});

test('reveals the dog through a short white arrival halo', () => {
  const opening = getSceneState(0);
  const entered = getSceneState(12);

  assert.equal(opening.dog.scaleX, 0.16);
  assert.equal(opening.dog.scaleY, 0.16);
  assert.equal(opening.portalOpacity, 1);
  assert.ok(entered.dog.scaleX >= 0.69);
  assert.equal(entered.portalOpacity, 0);
});

test('drives the dog forward through the middle of the shot', () => {
  const firstLunge = getSceneState(27);
  const pressure = getSceneState(63);

  assert.ok(pressure.dog.scaleX > firstLunge.dog.scaleX);
  assert.ok(pressure.dog.x < firstLunge.dog.x);
  assert.notEqual(getSceneState(45).dog.rotate, getSceneState(54).dog.rotate);
  assert.equal(getSceneState(9).dog.scaleX, 0.69);
  assert.equal(getSceneState(81).dog.scaleX, 0.825);
});

test('only pushes the Claude icon after frame 63', () => {
  assert.deepEqual(getSceneState(62).claude, {
    x: 0,
    y: 0,
    rotate: -4,
    scaleX: 1,
    scaleY: 1,
    blur: 0,
  });
  assert.notDeepEqual(getSceneState(72).claude, getSceneState(62).claude);
});

test('finishes with a blurred non-uniform rush and camera shake', () => {
  const beforeImpact = getSceneState(80);
  const impact = getSceneState(89);

  assert.equal(beforeImpact.dog.blur, 0);
  assert.equal(impact.dog.scaleX, 1.22);
  assert.ok(impact.dog.scaleX > impact.dog.scaleY);
  assert.ok(impact.dog.blur >= 8);
  assert.notDeepEqual(impact.shake, { x: 0, y: 0, rotate: 0 });
});

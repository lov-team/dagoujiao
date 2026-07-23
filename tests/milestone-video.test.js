'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  createMilestoneCounter,
} = require('../milestone-video.js');

test('triggers on every twentieth valid click', () => {
  const counter = createMilestoneCounter(20);

  for (let click = 1; click <= 40; click += 1) {
    assert.equal(counter.registerClick(), click % 20 === 0, `click ${click}`);
  }
});

test('rolls a failed milestone back so the next click retries it', () => {
  const counter = createMilestoneCounter(20);

  for (let click = 1; click <= 20; click += 1) counter.registerClick();
  counter.retryMilestone();

  assert.equal(counter.count, 19);
  assert.equal(counter.registerClick(), true);
  assert.equal(counter.count, 20);
});

test('never rolls a counter below zero', () => {
  const counter = createMilestoneCounter(20);

  counter.retryMilestone();

  assert.equal(counter.count, 0);
});

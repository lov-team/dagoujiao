import { unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const name = process.argv[2];
if (!name) throw new Error('Expected an output name.');

const mediaDir = resolve('../../media/click-20');
const input = resolve(mediaDir, `${name}-render.mp4`);
const output = resolve(mediaDir, `${name}.mp4`);
const result = spawnSync('ffmpeg', [
  '-y', '-hide_banner', '-loglevel', 'error', '-i', input,
  '-vf', 'scale=in_range=full:out_range=tv,format=yuv420p',
  '-frames:v', '90', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18',
  '-pix_fmt', 'yuv420p',
  '-af', 'apad=whole_dur=3,atrim=duration=3',
  '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', output,
], { stdio: 'inherit' });

if (result.status !== 0) process.exit(result.status ?? 1);
unlinkSync(input);

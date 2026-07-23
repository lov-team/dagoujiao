import React from 'react';
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame } from 'remotion';
import {
  CINEMATIC_BAR_HEIGHT,
  DOG_BASE_HEIGHT,
  DOG_BASE_WIDTH,
  getSceneState,
} from './timing.js';

export const Click20Dog = () => {
  const frame = useCurrentFrame();
  const state = getSceneState(frame);

  return (
    <AbsoluteFill style={{ backgroundColor: '#030303', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: CINEMATIC_BAR_HEIGHT,
          right: 0,
          bottom: CINEMATIC_BAR_HEIGHT,
          left: 0,
          background:
            'radial-gradient(circle at 58% 49%, #f2f2f2 0%, #d8d8d8 20%, #8a8a8a 54%, #3c3c3c 100%)',
          boxShadow: 'inset 0 0 150px rgba(0,0,0,.38)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 1405,
          top: 245,
          width: 360,
          height: 360,
          borderRadius: '50%',
          opacity: state.portalOpacity,
          transform: `scale(${1 + (1 - state.portalOpacity) * 1.85})`,
          background:
            'radial-gradient(circle, rgba(255,255,255,.98) 0 35%, rgba(255,255,255,.72) 46%, rgba(255,255,255,.12) 66%, transparent 72%)',
          filter: 'blur(3px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${state.shake.x}px, ${state.shake.y}px) rotate(${state.shake.rotate}deg)`,
          transformOrigin: 'center center',
        }}
      >
        <Img
          src={staticFile('claude-icon.png')}
          style={{
            position: 'absolute',
            left: 70 + state.claude.x,
            top: 340 + state.claude.y,
            width: 480,
            height: 480,
            borderRadius: '23%',
            objectFit: 'cover',
            transform: `perspective(1100px) rotateY(7deg) rotate(${state.claude.rotate}deg) scale(${state.claude.scaleX}, ${state.claude.scaleY})`,
            transformOrigin: '26% 78%',
            filter: `blur(${state.claude.blur}px) drop-shadow(28px 34px 30px rgba(0,0,0,.42))`,
          }}
        />

        <Img
          src={staticFile('dog.png')}
          style={{
            position: 'absolute',
            left: state.dog.x,
            top: state.dog.y,
            width: DOG_BASE_WIDTH,
            height: DOG_BASE_HEIGHT,
            objectFit: 'contain',
            transform: `scale(${state.dog.scaleX}, ${state.dog.scaleY}) rotate(${state.dog.rotate}deg)`,
            transformOrigin: 'top left',
            filter: `blur(${state.dog.blur}px) drop-shadow(24px 28px 30px rgba(0,0,0,.44))`,
          }}
        />
      </div>

      <Audio src={staticFile('bark.wav')} volume={0.92} />
    </AbsoluteFill>
  );
};

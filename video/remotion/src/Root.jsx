import React from 'react';
import { Composition } from 'remotion';
import { Click20Dog } from './Click20Dog.jsx';

export const Root = () => (
  <Composition
    id="Click20Dog"
    component={Click20Dog}
    durationInFrames={90}
    fps={30}
    width={1920}
    height={1080}
  />
);

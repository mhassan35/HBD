'use client';

import { useState } from 'react';
import PlayMusicButton from './components/PlayMusicButton';
import LandingScreen from './screens/LandingScreen';
import CardFlowScreen from './screens/CardFlowScreen';
import CelebrationScreen from './screens/CelebrationScreen';
import MessageScreen from './screens/MessageScreen';

export type Screen = 'landing' | 'card-flow' | 'celebration' | 'message';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <PlayMusicButton isPlaying={isPlaying} onToggle={setIsPlaying} />

      {screen === 'landing' && (
        <LandingScreen onStart={() => setScreen('card-flow')} />
      )}
      {screen === 'card-flow' && (
        <CardFlowScreen onComplete={() => setScreen('celebration')} />
      )}
      {screen === 'celebration' && (
        <CelebrationScreen
          onMessage={() => setScreen('message')}
          onPlayMusic={() => setIsPlaying(true)}
        />
      )}
      {screen === 'message' && (
        <MessageScreen onBack={() => setScreen('celebration')} />
      )}
    </div>
  );
}

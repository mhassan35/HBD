'use client';

import { useState } from 'react';
import PlayMusicButton from './components/PlayMusicButton';
import LandingScreen from './screens/LandingScreen';
import CardFlowScreen from './screens/CardFlowScreen';
import CelebrationScreen from './screens/CelebrationScreen';
import MessageScreen from './screens/MessageScreen';
import MemoriesScreen from './screens/MemoriesScreen';

export type Screen = 'landing' | 'card-flow' | 'celebration' | 'message' | 'memories';

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
        <MessageScreen
          onMemories={() => setScreen('memories')}
          onBack={() => setScreen('celebration')}
        />
      )}
      {screen === 'memories' && (
        <MemoriesScreen onBack={() => setScreen('message')} />
      )}
    </div>
  );
}

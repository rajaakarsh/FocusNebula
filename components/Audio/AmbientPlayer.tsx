"use client";

import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useFocusStore } from '@/store/useFocusStore';
import { Play, Pause, VolumeX, Volume2 } from 'lucide-react';

// For this implementation we'll mock the audio files.
// In a real scenario, you'd put these in /public/audio/
const TRACKS = [
  { id: 'deep-space', name: 'Deep Space Drone', file: '/audio/space.mp3', defaultVolume: 0.5 },
  { id: 'rain', name: 'Heavy Rain', file: '/audio/rain.mp3', defaultVolume: 0.0 },
  { id: 'brown-noise', name: 'Brown Noise', file: '/audio/brown.mp3', defaultVolume: 0.0 },
];

export function AmbientPlayer() {
  const { audio, setTrackVolume } = useFocusStore();
  const howlsRef = useRef<{ [id: string]: Howl }>({});

  useEffect(() => {
    // Initialize Howls
    TRACKS.forEach(track => {
      if (!howlsRef.current[track.id]) {
        howlsRef.current[track.id] = new Howl({
          src: [track.file],
          loop: true,
          volume: (audio.activeTracks[track.id] ?? track.defaultVolume) * audio.globalVolume,
          html5: true, // Force HTML5 Audio to avoid loading entire file before playing
          onloaderror: () => console.log(`Audio file ${track.file} not found (expected during dev without assets)`),
        });
        
        // Start playing immediately if volume > 0, but since browsers require interaction,
        // we might rely on the first user interaction (like clicking Start Timer).
      }
    });

    return () => {
      // Cleanup
      Object.values(howlsRef.current).forEach(h => h.unload());
    };
  }, []);

  // Update volumes dynamically
  useEffect(() => {
    TRACKS.forEach(track => {
      const h = howlsRef.current[track.id];
      if (h) {
        const targetVol = (audio.activeTracks[track.id] ?? track.defaultVolume) * audio.globalVolume;
        h.volume(targetVol);
        
        // If volume > 0 and it's not playing, we could try to play it
        if (targetVol > 0 && !h.playing()) {
          // Play might fail if no user interaction yet, that's fine
          h.play();
        } else if (targetVol === 0 && h.playing()) {
          h.pause();
        }
      }
    });
  }, [audio.activeTracks, audio.globalVolume]);

  return (
    <div className="flex flex-col gap-4">
      {TRACKS.map(track => {
        const currentVol = audio.activeTracks[track.id] ?? track.defaultVolume;
        return (
          <div key={track.id} className="flex flex-col gap-1">
            <div className="flex justify-between text-xs text-white/70 font-jetbrains">
              <span>{track.name}</span>
              <span>{Math.round(currentVol * 100)}%</span>
            </div>
            <input 
              type="range" 
              min="0" max="1" step="0.01" 
              value={currentVol}
              onChange={(e) => setTrackVolume(track.id, parseFloat(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>
        );
      })}
    </div>
  );
}

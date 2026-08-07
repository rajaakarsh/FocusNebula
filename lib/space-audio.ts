"use client";

// Web Audio API Synthesizer for Deep Space Soundscapes

class SpaceAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private activeNodes: (OscillatorNode | AudioBufferSourceNode | BiquadFilterNode)[] = [];
  private currentPreset: string = "cosmic-drone";

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public play(presetId: string = "cosmic-drone") {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.stop();
    this.currentPreset = presetId;
    this.isPlaying = true;

    const now = this.ctx.currentTime;

    if (presetId === "cosmic-drone") {
      // Sub Sine Osc 1
      const osc1 = this.ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(55, now); // A1 note

      // Sine Osc 2 detuned slightly
      const osc2 = this.ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(110.5, now);

      // Lowpass filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(200, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.25, now + 3);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc1.start();
      osc2.start();

      this.activeNodes.push(osc1, osc2, filter);
    } else if (presetId === "solar-wind") {
      // Pink Noise Buffer for Wind
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
      }

      const whiteNoiseSource = this.ctx.createBufferSource();
      whiteNoiseSource.buffer = noiseBuffer;
      whiteNoiseSource.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(350, now);
      filter.Q.setValueAtTime(1.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 2);

      whiteNoiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      whiteNoiseSource.start();
      this.activeNodes.push(whiteNoiseSource, filter);
    } else if (presetId === "deep-rain") {
      // Filtered White noise simulation
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.1;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(600, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 2);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noiseSource.start();
      this.activeNodes.push(noiseSource, filter);
    } else {
      // Nebula Synth (Harmonic chord)
      const freqs = [130.81, 164.81, 196.0, 246.94]; // Cmaj7 chord
      freqs.forEach((freq) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);

        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(400, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.exponentialRampToValueAtTime(0.06, now + 3);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        this.activeNodes.push(osc, filter);
      });
    }
  }

  public stop() {
    this.activeNodes.forEach((node) => {
      try {
        if ("stop" in node && typeof node.stop === "function") {
          node.stop();
        }
        node.disconnect();
      } catch {}
    });
    this.activeNodes = [];
    this.isPlaying = false;
  }

  public setVolume(volume: number) { // 0 to 1
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime);
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public getCurrentPreset() {
    return this.currentPreset;
  }
}

export const spaceAudio = new SpaceAudioSynthesizer();

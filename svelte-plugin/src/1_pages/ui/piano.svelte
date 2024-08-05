<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  let t = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });
  let frequency = 220; // A3
  let points: { x: number; y: number }[] = [];
  let isPlaying = false;
  let audioContext: AudioContext;
  let oscillator: OscillatorNode;
  let gainNode: GainNode;

  const noteNames = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const baseFrequency = 220; // A3

  function calculateFrequency(note: string, octave: number) {
    const noteIndex = noteNames.indexOf(note);
    const semitones = noteIndex + (octave - 3) * 12;
    return baseFrequency * Math.pow(2, semitones / 12);
  }

  const scaleNotes = [
    { note: "C", freq: calculateFrequency("C", 3) },
    { note: "D", freq: calculateFrequency("D", 3) },
    { note: "E", freq: calculateFrequency("E", 3) },
    { note: "F", freq: calculateFrequency("F", 3) },
    { note: "G", freq: calculateFrequency("G", 3) },
    { note: "A", freq: calculateFrequency("A", 3) },
    { note: "B", freq: calculateFrequency("B", 3) },
    { note: "C", freq: calculateFrequency("C", 4) },
  ];

  const pianoNotes = [
    { note: "C", octave: 3 },
    { note: "C#", octave: 3 },
    { note: "D", octave: 3 },
    { note: "D#", octave: 3 },
    { note: "E", octave: 3 },
    { note: "F", octave: 3 },
    { note: "F#", octave: 3 },
    { note: "G", octave: 3 },
    { note: "G#", octave: 3 },
    { note: "A", octave: 3 },
    { note: "A#", octave: 3 },
    { note: "B", octave: 3 },
    { note: "C", octave: 4 },
  ];

  function frequencyToNote(freq: number) {
    const noteNum = 12 * (Math.log2(freq / 440) + 4);
    const octave = Math.floor(noteNum / 12);
    const noteName = noteNames[Math.round(noteNum) % 12];
    return `${noteName}${octave}`;
  }

  function snapToNearestNote(freq: number) {
    return scaleNotes.reduce((prev, curr) =>
      Math.abs(curr.freq - freq) < Math.abs(prev.freq - freq) ? curr : prev,
    ).freq;
  }

  $: {
    const generatePoints = () => {
      const newPoints = [];
      const scaleFactor = frequency / baseFrequency;
      for (let x = 0; x <= 200; x += 0.5) {
        const scaledX = x * scaleFactor;
        const y1 =
          Math.sin(scaledX * 0.1) * 30 +
          Math.sin(scaledX * 0.3) * 10 +
          Math.sin(scaledX * 0.5) * 5 +
          Math.sin(scaledX * 0.7) * 2.5 +
          Math.sin(scaledX * 0.9) * 1.25;

        const y2 =
          Math.sin(scaledX * 0.1) * 35 +
          Math.sin(scaledX * 0.2) * 15 +
          Math.sin(scaledX * 0.4) * 7;

        const y = y1 * (1 - $t) + y2 * $t;
        newPoints.push({ x: x / 2, y: y + 50 });
      }
      points = newPoints;
    };

    generatePoints();
    updateAudio();
  }

  function updateAudio() {
    if (isPlaying && audioContext && oscillator) {
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

      const real = new Float32Array(
        [0, 0.6, 0.2, 0.1, 0.05, 0.025].map(
          (v, i) => v * (1 - $t) + (i === 1 ? 0.7 : 0) * $t,
        ),
      );
      const imag = new Float32Array(real.length).fill(0);
      const wave = audioContext.createPeriodicWave(real, imag);
      oscillator.setPeriodicWave(wave);

      const gainValue = 0.3 + $t * 0.1;
      gainNode.gain.setValueAtTime(gainValue, audioContext.currentTime);
    }
  }

  function toggleAudio() {
    if (isPlaying) {
      oscillator.stop();
      isPlaying = false;
    } else {
      audioContext = new window.AudioContext();
      oscillator = audioContext.createOscillator();
      gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

      updateAudio();

      oscillator.start();
      isPlaying = true;
    }
  }

  function handlePianoKeyClick(note: string, octave: number) {
    frequency = calculateFrequency(note, octave);
  }

  onDestroy(() => {
    if (audioContext) {
      audioContext.close();
    }
  });
</script>

<h1>piano app</h1>
<div class="flex flex-col items-center w-full max-w-xl mx-auto p-4">
  <svg width="100%" height="200" viewBox="0 0 100 100" class="bg-gray-100 mb-4">
    <polyline
      points={points.map((p) => `${p.x},${p.y}`).join(" ")}
      fill="none"
      stroke="blue"
      stroke-width="0.5"
    />
  </svg>
  <div class="w-full mb-4">
    <p class="mb-2">Waveform Transition: {Math.round($t * 100)}%</p>
    <input
      type="range"
      bind:value={$t}
      min="0"
      max="1"
      step="0.01"
      class="w-full border-white border-2"
    />
  </div>
  <div class="w-full mb-4">
    <p class="mb-2">
      Frequency: {frequency.toFixed(1)} Hz ({frequencyToNote(frequency)})
    </p>
    <div class="relative">
      <input
        type="range"
        bind:value={frequency}
        min="220"
        max="440"
        step="0.1"
        class="w-full bg-red-400"
        on:change={() => (frequency = snapToNearestNote(frequency))}
      />
      <div
        class="absolute top-full left-0 right-0 flex justify-between mt-1 text-xs"
      >
        {#each scaleNotes as note, index}
          <span
            style="left: {(note.freq - 220) / 2.2}%"
            class="absolute transform -translate-x-1/2"
          >
            {note.note}
          </span>
        {/each}
      </div>
    </div>
  </div>
  <div class="w-full mb-8 mt-8 flex justify-center">
    <div class="relative inline-flex h-48">
      {#each pianoNotes as note, index}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <div
          class="relative {note.note.includes('#')
            ? 'w-8 h-28 bg-black z-10 -mx-4'
            : 'w-12 h-48 bg-white border border-gray-300'} cursor-pointer"
          style="margin-left: {note.note.includes('#') ? '-16px' : '0'}"
          on:mouseover={() => handlePianoKeyClick(note.note, note.octave)}
        >
          <span
            class="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs"
          >
            {note.note.includes("#") ? "" : `${note.note}${note.octave}`}
          </span>
        </div>
      {/each}
    </div>
  </div>
  <div class="flex items-center justify-between w-full">
    <button
      on:click={toggleAudio}
      class="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {isPlaying ? "Stop" : "Play"}
    </button>
  </div>
</div>

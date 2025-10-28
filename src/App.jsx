import { useMemo, useState } from 'react';

// --- Constants ---

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const QUALITIES = [
  { id: 'major', name: 'Major' },
  { id: 'minor', name: 'Minor' },
];
const EXTENSIONS = [
  { id: 'none', name: 'None' },
  { id: '7', name: '7th' },
  { id: '9', name: '9th' },
  { id: '11', name: '11th' },
  { id: '13', name: '13th' },
];
const SUSPENSIONS = [
  { id: 'none', name: 'None' },
  { id: 'sus2', name: 'Sus 2' },
  { id: 'sus4', name: 'Sus 4' },
];
// New: Alterations
const ALTERATIONS = [
  { id: 'none', name: 'None' },
  { id: 'b5', name: 'b5' },
  { id: 'sharp5', name: '#5' },
  { id: 'b9', name: 'b9' },
  { id: 'sharp9', name: '#9' },
  { id: 'sharp11', name: '#11' },
];

// --- PianoKeyboard Component ---

/**
 * A visual piano keyboard component.
 * @param {Object} props
 * @param {Set<number>} props.highlightNotes - A Set of semitone values (e.g., 0, 4, 7) to highlight.
 */
const PianoKeyboard = ({ highlightNotes }) => {
  // Hardcoded keys for absolute positioning
  const keys = [
    // Octave 1
    { note: 'C', type: 'white', position: 'left-0', semitone: 0 },
    { note: 'C#', type: 'black', position: 'left-[2.75rem]', semitone: 1 },
    { note: 'D', type: 'white', position: 'left-[4rem]', semitone: 2 },
    { note: 'D#', type: 'black', position: 'left-[6.75rem]', semitone: 3 },
    { note: 'E', type: 'white', position: 'left-[8rem]', semitone: 4 },
    { note: 'F', type: 'white', position: 'left-[12rem]', semitone: 5 },
    { note: 'F#', type: 'black', position: 'left-[14.75rem]', semitone: 6 },
    { note: 'G', type: 'white', position: 'left-[16rem]', semitone: 7 },
    { note: 'G#', type: 'black', position: 'left-[18.75rem]', semitone: 8 },
    { note: 'A', type: 'white', position: 'left-[20rem]', semitone: 9 },
    { note: 'A#', type: 'black', position: 'left-[22.75rem]', semitone: 10 },
    { note: 'B', type: 'white', position: 'left-[24rem]', semitone: 11 },
    // Octave 2
    { note: 'C', type: 'white', position: 'left-[28rem]', semitone: 12 },
    { note: 'C#', type: 'black', position: 'left-[30.75rem]', semitone: 13 },
    { note: 'D', type: 'white', position: 'left-[32rem]', semitone: 14 },
    { note: 'D#', type: 'black', position: 'left-[34.75rem]', semitone: 15 },
    { note: 'E', type: 'white', position: 'left-[36rem]', semitone: 16 },
    { note: 'F', type: 'white', position: 'left-[40rem]', semitone: 17 },
    { note: 'F#', type: 'black', position: 'left-[42.75rem]', semitone: 18 },
    { note: 'G', type: 'white', position: 'left-[44rem]', semitone: 19 },
    { note: 'G#', type: 'black', position: 'left-[46.75rem]', semitone: 20 },
    { note: 'A', type: 'white', position: 'left-[48rem]', semitone: 21 },
    { note: 'A#', type: 'black', position: 'left-[50.75rem]', semitone: 22 },
    { note: 'B', type: 'white', position: 'left-[52rem]', semitone: 23 },
    // Octave 3 (just the C)
    { note: 'C', type: 'white', position: 'left-[56rem]', semitone: 24 },
  ];

  const whiteKeys = keys.filter((k) => k.type === 'white');
  const blackKeys = keys.filter((k) => k.type === 'black');

  const keyBaseStyles = 'absolute rounded-b-lg border-2 border-gray-700 shadow-md transition-colors duration-150 ease-in-out';
  const whiteKeyStyles = 'w-16 h-64 bg-white text-gray-800 z-0';
  const blackKeyStyles = 'w-10 h-40 bg-gray-900 text-white z-10';

  // Added !important modifier to bg-color to ensure override
  const highlightedWhiteKeyStyles = '!bg-red-600 !border-red-600 !shadow-none';
  const highlightedBlackKeyStyles = '!bg-red-700 !border-red-700 !shadow-none';

  return (
    <div className="relative w-[60rem] h-64 shadow-xl rounded-lg overflow-hidden">
      {/* Render white keys first */}
      {whiteKeys.map((key) => {
        const isHighlighted = highlightNotes.has(key.semitone);
        return (
          <div
            key={key.semitone}
            className={`${keyBaseStyles} ${whiteKeyStyles} ${key.position} ${isHighlighted ? highlightedWhiteKeyStyles : ''}`}
          >
            {/* Note text removed */}
          </div>
        );
      })}

      {/* Render black keys on top */}
      {blackKeys.map((key) => {
        const isHighlighted = highlightNotes.has(key.semitone);
        return (
          <div
            key={key.semitone}
            className={`${keyBaseStyles} ${blackKeyStyles} ${key.position} ${isHighlighted ? highlightedBlackKeyStyles : ''}`}
          >
            {/* Note text removed */}
          </div>
        );
      })}
    </div>
  );
};

// --- Dropdown Component ---

const SelectInput = ({ label, value, onChange, options, disabled = false }) => (
  <div className="flex flex-col">
    <label htmlFor={label} className="text-sm font-medium text-gray-400 mb-1">
      {label}
    </label>
    <select
      id={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-700 text-white p-3 rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
      disabled={disabled}
    >
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [rootNote, setRootNote] = useState('C');
  const [quality, setQuality] = useState('major');
  const [extension, setExtension] = useState('none');
  const [suspension, setSuspension] = useState('none');
  const [alteration, setAlteration] = useState('none'); // New state

  /**
   * Calculates the specific semitones for the chord.
   * Returns a Set of absolute semitone numbers (e.g., {0, 4, 7}).
   */
  const chordSemitones = useMemo(() => {
    const rootIndex = NOTES.indexOf(rootNote);
    if (rootIndex === -1) return new Set();

    // Use a Map to store interval name and semitone value
    // This makes alterations (like replacing a 5th) easier
    const intervalMap = new Map();
    intervalMap.set('root', 0); // Always include the root

    const isSus = suspension !== 'none';

    // 1. Add 3rd (or suspension)
    if (isSus) {
      intervalMap.set('third', suspension === 'sus2' ? 2 : 5);
    } else {
      intervalMap.set('third', quality === 'major' ? 4 : 3);
    }

    // 2. Add 5th
    intervalMap.set('fifth', 7);

    // 3. Add Extensions (stacking)
    if (extension !== 'none') {
      intervalMap.set('seventh', 10); // 7th
    }
    if (['9', '11', '13'].includes(extension)) {
      intervalMap.set('ninth', 14); // 9th
    }
    if (['11', '13'].includes(extension)) {
      intervalMap.set('eleventh', 17); // 11th
    }
    if (extension === '13') {
      intervalMap.set('thirteenth', 21); // 13th
    }

    // 4. Apply Alterations
    switch (alteration) {
      case 'b5':
        intervalMap.set('fifth', 6); // flat 5
        break;
      case 'sharp5':
        intervalMap.set('fifth', 8); // sharp 5
        break;
      case 'b9':
        intervalMap.set('ninth', 13); // flat 9 (replaces 9 if it exists)
        break;
      case 'sharp9':
        intervalMap.set('ninth', 15); // sharp 9 (replaces 9 if it exists)
        break;
      case 'sharp11':
        intervalMap.set('eleventh', 18); // sharp 11 (replaces 11 if it exists)
        break;
      default:
        // No alteration
        break;
    }

    // Map intervals to absolute semitones from the root
    const absoluteIntervals = Array.from(intervalMap.values()).map(
      (interval) => rootIndex + interval
    );

    return new Set(absoluteIntervals);
  }, [rootNote, quality, extension, suspension, alteration]); // Added alteration

  /**
   * Generates the display string for the note names.
   */
  const chordNoteNames = useMemo(() => {
    // Map semitones back to note names, store in a Set to remove duplicates
    const names = new Set(
      Array.from(chordSemitones).map(semi => NOTES[semi % 12])
    );
    // Return as a comma-separated string
    return Array.from(names).join(', ');
  }, [chordSemitones]);


  /**
   * Generates the name of the chord.
   */
  const chordName = useMemo(() => {
    let name = rootNote;
    if (suspension !== 'none') {
      name += suspension;
    } else {
      if (quality === 'minor') name += 'm';
    }

    if (extension !== 'none') {
      // Special handling for major 7
      if (quality === 'major' && extension === '7' && suspension === 'none' && alteration === 'none') {
        name += 'maj7';
      } else {
        name += extension;
      }
    }

    // Add alteration
    if (alteration !== 'none') {
      if (alteration === 'b5') name += '(b5)';
      if (alteration === 'sharp5') name += '(#5)';
      if (alteration === 'b9') name += '(b9)';
      if (alteration === 'sharp9') name += '(#9)';
      if (alteration === 'sharp11') name += '(#11)';
    }

    return name;
  }, [rootNote, quality, extension, suspension, alteration]); // Added alteration

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 sm:p-8 font-sans">
      <div className="w-full max-w-6xl bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-10">
        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-2 text-red-400">
          Piano Chord Finder
        </h1>
        <p className="text-center text-gray-400 mb-8 text-lg">
          Select a chord to see the notes on the keyboard.
        </p>

        {/* Controls - Updated grid to 5 cols on small screens */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-10">
          <SelectInput
            label="Root Note"
            value={rootNote}
            onChange={setRootNote}
            options={NOTES.map((n) => ({ id: n, name: n }))}
          />
          <SelectInput
            label="Quality"
            value={quality}
            onChange={setQuality}
            options={QUALITIES}
            disabled={suspension !== 'none'} // Disable if sus chord
          />
          <SelectInput
            label="Suspension"
            value={suspension}
            onChange={setSuspension}
            options={SUSPENSIONS}
          />
          <SelectInput
            label="Extension"
            value={extension}
            onChange={setExtension}
            options={EXTENSIONS}
          />
          {/* New Alteration Dropdown */}
          <SelectInput
            label="Alteration"
            value={alteration}
            onChange={setAlteration}
            options={ALTERATIONS}
          />
        </div>

        {/* Chord Name Display */}
        <div className="text-center mb-10">
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-2">
            {chordName}
          </h2>
          <p className="text-xl text-gray-300">
            Notes: {chordNoteNames}
          </p>
        </div>

        {/* Piano */}
        <div className="flex justify-center overflow-x-auto py-4">
          <PianoKeyboard highlightNotes={chordSemitones} />
        </div>
      </div>
    </div>
  );
}



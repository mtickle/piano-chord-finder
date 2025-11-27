import { useEffect, useMemo, useState } from 'react';

// --- Constants ---

// Standard display names for the note readout
const NOTES = [
  'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'
];

const ROOT_LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const ACCIDENTALS = [
  { id: 'flat', name: 'b (Flat)', offset: -1 },
  { id: 'natural', name: '♮ (Natural)', offset: 0 },
  { id: 'sharp', name: '# (Sharp)', offset: 1 },
];

// Base semitone values for natural notes
const NATURAL_OFFSETS = {
  'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11
};

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
const ALTERATIONS = [
  { id: 'none', name: 'None' },
  { id: 'b5', name: 'b5' },
  { id: 'sharp5', name: '#5' },
  { id: 'b9', name: 'b9' },
  { id: 'sharp9', name: '#9' },
  { id: 'sharp11', name: '#11' },
];

// --- PianoKeyboard Component ---

const PianoKeyboard = ({ highlightNotes, onKeyClick }) => {
  const keys = [
    // Octave 1
    { note: 'C', type: 'white', position: 'left-0', semitone: 0 },
    { note: 'Db', type: 'black', position: 'left-[2.75rem]', semitone: 1 },
    { note: 'D', type: 'white', position: 'left-[4rem]', semitone: 2 },
    { note: 'Eb', type: 'black', position: 'left-[6.75rem]', semitone: 3 },
    { note: 'E', type: 'white', position: 'left-[8rem]', semitone: 4 },
    { note: 'F', type: 'white', position: 'left-[12rem]', semitone: 5 },
    { note: 'F#', type: 'black', position: 'left-[14.75rem]', semitone: 6 },
    { note: 'G', type: 'white', position: 'left-[16rem]', semitone: 7 },
    { note: 'Ab', type: 'black', position: 'left-[18.75rem]', semitone: 8 },
    { note: 'A', type: 'white', position: 'left-[20rem]', semitone: 9 },
    { note: 'Bb', type: 'black', position: 'left-[22.75rem]', semitone: 10 },
    { note: 'B', type: 'white', position: 'left-[24rem]', semitone: 11 },
    // Octave 2
    { note: 'C', type: 'white', position: 'left-[28rem]', semitone: 12 },
    { note: 'Db', type: 'black', position: 'left-[30.75rem]', semitone: 13 },
    { note: 'D', type: 'white', position: 'left-[32rem]', semitone: 14 },
    { note: 'Eb', type: 'black', position: 'left-[34.75rem]', semitone: 15 },
    { note: 'E', type: 'white', position: 'left-[36rem]', semitone: 16 },
    { note: 'F', type: 'white', position: 'left-[40rem]', semitone: 17 },
    { note: 'F#', type: 'black', position: 'left-[42.75rem]', semitone: 18 },
    { note: 'G', type: 'white', position: 'left-[44rem]', semitone: 19 },
    { note: 'Ab', type: 'black', position: 'left-[46.75rem]', semitone: 20 },
    { note: 'A', type: 'white', position: 'left-[48rem]', semitone: 21 },
    { note: 'Bb', type: 'black', position: 'left-[50.75rem]', semitone: 22 },
    { note: 'B', type: 'white', position: 'left-[52rem]', semitone: 23 },
    // Octave 3 (just the C)
    { note: 'C', type: 'white', position: 'left-[56rem]', semitone: 24 },
  ];

  const whiteKeys = keys.filter((k) => k.type === 'white');
  const blackKeys = keys.filter((k) => k.type === 'black');

  const keyBaseStyles = 'absolute rounded-b-lg border-2 border-gray-700 shadow-md transition-colors duration-150 ease-in-out cursor-pointer hover:opacity-90 active:scale-[0.98]';
  const whiteKeyStyles = 'w-16 h-64 bg-white text-gray-800 z-0';
  const blackKeyStyles = 'w-10 h-40 bg-gray-900 text-white z-10';

  const highlightedWhiteKeyStyles = '!bg-red-600 !border-red-600 !shadow-none';
  const highlightedBlackKeyStyles = '!bg-red-700 !border-red-700 !shadow-none';

  return (
    <div className="relative w-[60rem] h-64 shadow-xl rounded-lg overflow-hidden bg-gray-800">
      {whiteKeys.map((key) => {
        const isHighlighted = highlightNotes.has(key.semitone);
        return (
          <div
            key={key.semitone}
            onClick={() => onKeyClick(key.semitone)}
            className={`${keyBaseStyles} ${whiteKeyStyles} ${key.position} ${isHighlighted ? highlightedWhiteKeyStyles : ''}`}
          />
        );
      })}
      {blackKeys.map((key) => {
        const isHighlighted = highlightNotes.has(key.semitone);
        return (
          <div
            key={key.semitone}
            onClick={() => onKeyClick(key.semitone)}
            className={`${keyBaseStyles} ${blackKeyStyles} ${key.position} ${isHighlighted ? highlightedBlackKeyStyles : ''}`}
          />
        );
      })}
    </div>
  );
};

// --- Dropdown Component ---

const SelectInput = ({ label, value, onChange, options, disabled = false }) => (
  <div className="flex flex-col w-full">
    <label htmlFor={label} className="text-sm font-medium text-gray-400 mb-1">
      {label}
    </label>
    <select
      id={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-700 text-white p-3 rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 text-base w-full"
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
  const [rootLetter, setRootLetter] = useState('C');
  const [rootAccidental, setRootAccidental] = useState('natural');
  const [quality, setQuality] = useState('major');
  const [extension, setExtension] = useState('none');
  const [suspension, setSuspension] = useState('none');
  const [alteration, setAlteration] = useState('none');

  // Intelligent filter for Accidentals based on Letter
  const availableAccidentals = useMemo(() => {
    // Start with all options
    let opts = [...ACCIDENTALS];

    // Remove flats for C and F (no Cb or Fb)
    if (['C', 'F'].includes(rootLetter)) {
      opts = opts.filter(a => a.id !== 'flat');
    }
    // Remove sharps for B and E (no B# or E#)
    if (['B', 'E'].includes(rootLetter)) {
      opts = opts.filter(a => a.id !== 'sharp');
    }

    return opts;
  }, [rootLetter]);

  // Effect to reset accidental if it becomes invalid when letter changes
  useEffect(() => {
    const isValid = availableAccidentals.find(a => a.id === rootAccidental);
    if (!isValid) {
      setRootAccidental('natural');
    }
  }, [rootLetter, availableAccidentals, rootAccidental]);

  /**
   * Handles clicking a piano key to set the root note.
   * Maps the clicked semitone to the preferred note name (e.g. Eb over D#).
   */
  const handleKeyClick = (semitone) => {
    const pitchClass = semitone % 12;
    let newLetter = 'C';
    let newAccidental = 'natural';

    switch (pitchClass) {
      case 0: newLetter = 'C'; break;
      case 1: newLetter = 'D'; newAccidental = 'flat'; break; // Db
      case 2: newLetter = 'D'; break;
      case 3: newLetter = 'E'; newAccidental = 'flat'; break; // Eb
      case 4: newLetter = 'E'; break;
      case 5: newLetter = 'F'; break;
      case 6: newLetter = 'F'; newAccidental = 'sharp'; break; // F# (Exception to flat rule)
      case 7: newLetter = 'G'; break;
      case 8: newLetter = 'A'; newAccidental = 'flat'; break; // Ab
      case 9: newLetter = 'A'; break;
      case 10: newLetter = 'B'; newAccidental = 'flat'; break; // Bb
      case 11: newLetter = 'B'; break;
      default: break;
    }

    setRootLetter(newLetter);
    setRootAccidental(newAccidental);
  };

  /**
   * Calculates the specific semitones for the chord.
   */
  const chordSemitones = useMemo(() => {
    // 1. Calculate Root Semitone
    const naturalOffset = NATURAL_OFFSETS[rootLetter];
    const accidentalOffset = ACCIDENTALS.find(a => a.id === rootAccidental)?.offset || 0;
    const rootIndex = (naturalOffset + accidentalOffset + 12) % 12;

    const intervalMap = new Map();
    intervalMap.set('root', 0);

    const isSus = suspension !== 'none';

    // 2. Add 3rd (or suspension)
    if (isSus) {
      intervalMap.set('third', suspension === 'sus2' ? 2 : 5);
    } else {
      intervalMap.set('third', quality === 'major' ? 4 : 3);
    }

    // 3. Add 5th
    intervalMap.set('fifth', 7);

    // 4. Add Extensions
    if (extension !== 'none') {
      intervalMap.set('seventh', 10);
    }
    if (['9', '11', '13'].includes(extension)) {
      intervalMap.set('ninth', 14);
    }
    if (['11', '13'].includes(extension)) {
      intervalMap.set('eleventh', 17);
    }
    if (extension === '13') {
      intervalMap.set('thirteenth', 21);
    }

    // 5. Apply Alterations
    switch (alteration) {
      case 'b5': intervalMap.set('fifth', 6); break;
      case 'sharp5': intervalMap.set('fifth', 8); break;
      case 'b9': intervalMap.set('ninth', 13); break;
      case 'sharp9': intervalMap.set('ninth', 15); break;
      case 'sharp11': intervalMap.set('eleventh', 18); break;
      default: break;
    }

    // Map intervals to absolute semitones from the root
    const absoluteIntervals = Array.from(intervalMap.values()).map(
      (interval) => rootIndex + interval
    );

    return new Set(absoluteIntervals);
  }, [rootLetter, rootAccidental, quality, extension, suspension, alteration]);

  const chordNoteNames = useMemo(() => {
    const names = new Set(
      Array.from(chordSemitones).map(semi => NOTES[semi % 12])
    );
    return Array.from(names).join(', ');
  }, [chordSemitones]);

  const chordName = useMemo(() => {
    // Construct the root name from user selection
    let name = rootLetter;
    if (rootAccidental === 'sharp') name += '#';
    if (rootAccidental === 'flat') name += 'b';

    if (suspension !== 'none') {
      name += suspension;
    } else {
      if (quality === 'minor') name += 'm';
    }

    if (extension !== 'none') {
      if (quality === 'major' && extension === '7' && suspension === 'none' && alteration === 'none') {
        name += 'maj7';
      } else {
        name += extension;
      }
    }

    if (alteration !== 'none') {
      if (alteration === 'b5') name += '(b5)';
      if (alteration === 'sharp5') name += '(#5)';
      if (alteration === 'b9') name += '(b9)';
      if (alteration === 'sharp9') name += '(#9)';
      if (alteration === 'sharp11') name += '(#11)';
    }

    return name;
  }, [rootLetter, rootAccidental, quality, extension, suspension, alteration]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-white p-4 font-sans">
      <div className="w-full max-w-6xl bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-8">
        {/* Header */}
        <h1 className="text-3xl sm:text-5xl font-bold text-center mb-2 text-red-400">
          Piano Chord Finder
        </h1>
        <p className="text-center text-gray-400 mb-6 text-lg">
          {/* Select a chord to see the notes on the keyboard. */}
        </p>

        {/* Controls */}
        {/* We now have 6 inputs (Letter + Accidental + 4 others). 
            Grid needs to adapt. 
            Mobile: 2 cols. 
            Desktop: 6 cols. 
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-8">
          <SelectInput
            label="Root"
            value={rootLetter}
            onChange={setRootLetter}
            options={ROOT_LETTERS.map((n) => ({ id: n, name: n }))}
          />
          <SelectInput
            label="Accidental"
            value={rootAccidental}
            onChange={setRootAccidental}
            options={availableAccidentals}
          />
          <SelectInput
            label="Quality"
            value={quality}
            onChange={setQuality}
            options={QUALITIES}
            disabled={suspension !== 'none'}
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
          <SelectInput
            label="Alteration"
            value={alteration}
            onChange={setAlteration}
            options={ALTERATIONS}
          />
        </div>

        {/* Chord Name Display */}
        {/* <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-2 break-words">
            {chordName}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300">
            Notes: {chordNoteNames}
          </p>
        </div> */}

        {/* Piano Container */}
        <div className="w-full flex justify-center overflow-x-auto pb-4">
          <PianoKeyboard
            highlightNotes={chordSemitones}
            onKeyClick={handleKeyClick}
          />
        </div>
      </div>
    </div>
  );
}
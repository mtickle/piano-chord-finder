# Piano Chord Finder 🎹

A fast, interactive, and mobile-friendly piano chord visualizer built with React and Tailwind CSS. Designed for musicians, composers, and students who need a quick reference for complex chords during rehearsals or writing sessions.

## ✨ Features

* **Interactive Keyboard**: Click any key on the visual piano, and the app intelligently snaps to the most musically logical root note and accidental (e.g., mapping to Eb instead of D#).
* **Smart Accidental Filtering**: The UI adapts to musical rules. If you select 'C' or 'F' as your root, the 'flat' option is disabled to prevent theoretical headaches like Cb or Fb.
* **Deep Chord Vocabulary**: Supports a massive variety of chords, going far beyond basic triads:
  * **Qualities**: Major, Minor
  * **Suspensions**: sus2, sus4
  * **Extensions**: 7th, 9th, 11th, 13th
  * **Alterations**: b5, #5, b9, #9, #11
* **Mobile-First Design**: Built to be used on the fly. The interface scales perfectly to mobile devices so you can keep it on your music stand right next to your sheet music.
* **Streamlined "Pro" UI**: Focuses entirely on the controls and the keyboard visualization without unnecessary clutter.

## 🛠 Tech Stack

* **React** (Hooks: `useState`, `useMemo`, `useEffect`)
* **Tailwind CSS** (For rapid, responsive styling)
* **Vite** (Recommended build tool)

## 🚀 Getting Started

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/piano-chord-finder.git](https://github.com/yourusername/piano-chord-finder.git)
   cd piano-chord-finder

import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

/*
  NOTES: React Compiler

  The React Compiler adds memoization automatically at build time. When it is
  on, React.memo, useMemo and useCallback are mostly not needed because the
  compiler already does that work for you.

  It is turned off here on purpose. The useMemo and ReactMemo folders exist to
  show what these hooks do and when a component re renders. With the compiler
  on, those demos would look optimised even without the hooks, so the lesson
  would be hidden.

  Turn the babel line back on when you want the compiler back.
*/

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // babel({ presets: [reactCompilerPreset()] })
  ],
})

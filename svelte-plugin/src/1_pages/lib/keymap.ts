import { setMouseMode } from "@/2_widgets/lib/mouseModeState";

export const canvasKeys = (e: KeyboardEvent) => {
  const key = e.key.toLowerCase();
  if (keymap[key]) keymap[key]();
};

export const keymap: Record<string, () => void> = {
  r: () => setMouseMode("square"),
  o: () => setMouseMode("circle"),
  a: () => setMouseMode("arrow"),
  l: () => setMouseMode("line"),
  p: () => setMouseMode("pen"),
  t: () => setMouseMode("text"),
  v: () => setMouseMode("mouse"),
  esc: () => setMouseMode("mouse"),
};

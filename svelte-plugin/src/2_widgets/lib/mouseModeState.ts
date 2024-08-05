import { writable } from "svelte/store";

export type ToolsState = {
  mouseMode:
    | "mouse"
    | "square"
    | "circle"
    | "arrow"
    | "line"
    | "text"
    | undefined;
  colorLine: string;
  colorBg: string;
};

export const toolsState = writable<ToolsState>({
  mouseMode: "mouse",
  colorLine: "#000000",
  colorBg: "#ffffff",
});

// getter setter
export const mouseMode = toolsState.subscribe((s) => s.mouseMode);
export const setMouseMode = (mouseMode: ToolsState["mouseMode"]) =>
  toolsState.update((s) => ({ ...s, mouseMode }));

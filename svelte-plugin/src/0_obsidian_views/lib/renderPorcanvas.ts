import { App, type MarkdownPostProcessorContext } from "obsidian";
import Component from "@/1_pages/ui/porcanvas.svelte";

export async function renderPorcanvas(
  source: string,
  el: HTMLElement,
  ctx: MarkdownPostProcessorContext,
  app: App,
) {
  new Component({
    target: el,
    props: {
      csv: "hello",
    },
  });
}

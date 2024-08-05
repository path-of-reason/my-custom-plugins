import { type App, type MarkdownPostProcessorContext } from "obsidian";
import { renderMarkdown } from "./renderMarkdown";

export async function renderMultiColumns(
  str: string,
  el: HTMLElement,
  ctx: MarkdownPostProcessorContext,
  app: App,
) {
  el.addClass("flex");
  const regex = /!\[\[([^\]]+)\]\]/g;
  const matches = [...str.matchAll(regex)];
  const promiseColumns = matches.map(async (match) => {
    await renderMarkdown(match[0], el, ctx, app);
  });
  await Promise.all(promiseColumns);
}

import {
  MarkdownRenderChild,
  MarkdownRenderer,
  type App,
  type MarkdownPostProcessorContext,
} from "obsidian";

export async function renderMarkdown(
  str: string,
  el: HTMLElement,
  ctx: MarkdownPostProcessorContext,
  app: App,
) {
  const markdownRenderChild = new MarkdownRenderChild(el);
  const markdownEl = el.createDiv();
  markdownEl.addClasses(["wis-markdown-container", "w-full"]);
  if (ctx && !(typeof ctx == "string")) ctx.addChild(markdownRenderChild);

  await MarkdownRenderer.render(
    app,
    str, // 텍스트, 더블브라켓이면 렌더러가 미리보기를 만들어주는 듯
    markdownEl,
    ctx.sourcePath,
    markdownRenderChild,
  );
  return markdownEl;
}

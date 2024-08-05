import { Notice, Plugin } from "obsidian";
import {
  ViewPorcanvas,
  VIEW_TYPE_PORCANVAS,
} from "./0_obsidian_views/lib/viewPorcanvas";
import { ExampleModal } from "./0_obsidian_views/lib/ExampleModal";
import "virtual:uno.css";
import { renderMarkdown } from "./0_obsidian_views/lib/renderMarkdown";
import { renderMultiColumns } from "./0_obsidian_views/lib/renderMultiColumns";
import { renderPorcanvas } from "./0_obsidian_views/lib/renderPorcanvas";

interface ObsidianNoteConnectionsSettings {
  mySetting: string;
}

const DEFAULT_SETTINGS: ObsidianNoteConnectionsSettings = {
  mySetting: "default",
};

export default class ObsidianNoteConnections extends Plugin {
  settings!: ObsidianNoteConnectionsSettings;

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async onload() {
    await this.loadSettings();
    console.log("on load plugin");

    // 우측 사이드 바 뷰 등록
    this.registerView(VIEW_TYPE_PORCANVAS, (leaf) => new ViewPorcanvas(leaf));

    // 리본 등록
    this.addRibbonIcon("dice", "Activate view", () => {
      this.activateView();
    });

    // 커맨드 등록
    // this.addCommand({
    //   id: "por-view-rightside",
    //   name: "open right side view",
    //   callback: () => {
    //     this.activateView();
    //   },
    // });

    // this.addCommand({
    //   id: "por-modal",
    //   name: "open modal",
    //   callback: () => {
    //     const modal = new ExampleModal(this.app);
    //     modal.open();
    //   },
    // });

    // 새탭에서 뷰열기
    this.addCommand({
      id: "por-view-canvas",
      name: "open porcanvas",
      callback: () => {
        const leaf = this.app.workspace.getLeaf(true);
        leaf.open(new ViewPorcanvas(leaf));
        this.app.workspace.setActiveLeaf(leaf);
      },
    });

    // 마크다운 렌더링
    // this.app.workspace.onLayoutReady(() => {
    //   this.registerMarkdownCodeBlockProcessor(
    //     "markdownRenderer",
    //     async (source, el, ctx) => {
    //       try {
    //         await renderMarkdown(source, el, ctx, this.app);
    //       } catch (e) {
    //         console.error(e);
    //         new Notice("Error rendering diagram");
    //       }
    //     },
    //   );
    // });

    // 멀티 컬럼
    // this.app.workspace.onLayoutReady(() => {
    //   this.registerMarkdownCodeBlockProcessor(
    //     "markdownRendererMC",
    //     async (source, el, ctx) => {
    //       try {
    //         await renderMultiColumns(source, el, ctx, this.app);
    //       } catch (e) {
    //         console.error(e);
    //         new Notice("Error rendering diagram");
    //       }
    //     },
    //   );
    // });
    //
    // this.app.workspace.onLayoutReady(() => {
    //   this.registerMarkdownCodeBlockProcessor(
    //     "por",
    //     async (source, el, ctx) => {
    //       try {
    //         await renderPorcanvas(source, el, ctx, this.app);
    //       } catch (e) {
    //         console.error(e);
    //         new Notice("Error rendering diagram");
    //       }
    //     },
    //   );
    // });
  }

  onunload() {
    console.log("unloading plugin");
  }

  async activateView() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_PORCANVAS);

    await this.app.workspace.getRightLeaf(false)!.setViewState({
      type: VIEW_TYPE_PORCANVAS,
      active: true,
    });

    this.app.workspace.revealLeaf(
      this.app.workspace.getLeavesOfType(VIEW_TYPE_PORCANVAS)[0],
    );
  }
}

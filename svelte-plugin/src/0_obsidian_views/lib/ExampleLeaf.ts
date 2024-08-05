import { ItemView, WorkspaceLeaf } from "obsidian";

import Component from "@/1_pages/ui/piano.svelte";

export const VIEW_TYPE_EXAMPLE = "example-view";

export class ExampleLeaf extends ItemView {
  component!: Component;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_EXAMPLE;
  }

  getDisplayText() {
    return "Example view";
  }

  async onOpen() {
    this.icon = "dice";
    this.component = new Component({
      target: this.contentEl,
    });
  }

  async onClose() {
    this.component.$destroy();
  }
}

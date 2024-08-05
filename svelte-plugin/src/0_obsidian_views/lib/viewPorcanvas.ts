import { ItemView } from "obsidian";

import Component from "@/1_pages/ui/porcanvas.svelte";

export const VIEW_TYPE_PORCANVAS = "view-porcanvas";

export class ViewPorcanvas extends ItemView {
  component!: Component;

  getViewType() {
    return VIEW_TYPE_PORCANVAS;
  }

  getDisplayText() {
    return "piano";
  }

  async onOpen() {
    this.icon = "dice";
    const container = this.containerEl as HTMLDivElement;
    container.innerHTML = "";
    this.component = new Component({
      target: this.containerEl,
    });
  }

  async onClose() {
    this.component.$destroy();
  }
}

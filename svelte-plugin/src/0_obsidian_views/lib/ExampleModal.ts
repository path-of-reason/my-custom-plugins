import { App, Modal } from "obsidian";

import Component from "@/1_pages/ui/porcanvas.svelte";

export class ExampleModal extends Modal {
  component!: Component;
  constructor(app: App) {
    super(app);
  }

  onOpen() {
    this.component = new Component({
      target: this.contentEl,
    });
    this.titleEl.setText("component title");
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

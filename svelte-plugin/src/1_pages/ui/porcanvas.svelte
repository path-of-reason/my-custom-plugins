<script lang="ts">
  import "@/styles.css";
  import { cn } from "@/5_shared/lib/utils";
  import CommandModal from "@/2_widgets/ui/CommandModal.svelte";
  import Header from "@/2_widgets/ui/Header.svelte";
  import Left from "@/2_widgets/ui/Left.svelte";
  import Main from "@/2_widgets/ui/Main.svelte";
  import Right from "@/2_widgets/ui/Right.svelte";
  import { canvasKeys } from "@/1_pages/lib/keymap";

  const shadow = (el: HTMLDivElement) => {
    document.addEventListener("keydown", canvasKeys);
    return {
      destroy() {
        document.removeEventListener("keydown", canvasKeys);
      },
    };
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class={cn("w-full h-full relative")}>
  <hui class="absolute top-0 left-0 w-full h-full" use:shadow>
    <Header />
    <!-- <Left /> -->
    <!-- <Right /> -->
    <Main />
    <CommandModal />
  </hui>
</div>

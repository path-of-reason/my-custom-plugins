<script lang="ts">
  import * as ToggleGroup from "@/5_shared/ui/toggle-group";
  import { cn } from "@/5_shared/lib/utils";
  import { layoutState } from "@/2_widgets/lib/layoutState";
  import { toolsState, type ToolsState } from "@/2_widgets/lib/mouseModeState";

  const buttons: ToolsState["mouseMode"][] = [
    "mouse",
    "square",
    "circle",
    "arrow",
    "line",
    "text",
  ];
</script>

{#if $layoutState.header}
  <header
    class={cn(
      "flex gap-2 justify-center items-center",
      "absolute top-0 left-1/2 -translate-x-1/2 h-20 w-[1000px] text-center z-10",
    )}
  >
    <div class="flex gap-2">
      {#each buttons as button}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          on:click={() => ($toolsState.mouseMode = button)}
          class={cn(
            "bg-gray-700 active:bg-gray-900 ",
            $toolsState.mouseMode !== button || "bg-gray-900",
            "p-1 h-fit w-fit rounded-md ",
          )}
        >
          {button}
        </div>

        <!-- <button -->
        <!--   on:click={() => ($toolsState.mouseMode = button)} -->
        <!--   class={cn( -->
        <!--     "bg-blue-300", -->
        <!--     button === $toolsState.mouseMode ?? "bg-red-300",)}> -->
        <!-- {button} -->
        <!-- </button>  -->
      {/each}
    </div>
  </header>
{/if}

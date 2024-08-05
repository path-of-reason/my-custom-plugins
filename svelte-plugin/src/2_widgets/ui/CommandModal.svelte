<script lang="ts">
  import { cn } from "@/5_shared/lib/utils";
  import { layoutState } from "@/2_widgets/lib/layoutState";
</script>

{#if $layoutState.commandPallete}
  <commandModal
    class={cn(
      "bg-slate-700 rounded-md p-5",
      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-4/5",
    )}
  >
    command modal
  </commandModal>
{/if}

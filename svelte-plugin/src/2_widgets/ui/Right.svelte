<script lang="ts">
  import { cn } from "@/5_shared/lib/utils";
  import { layoutState } from "@/2_widgets/lib/layoutState";
</script>

{#if $layoutState.right}
  <right
    class={cn(
      //"bg-red-300",
      "absolute top-1/2 right-0 -translate-y-1/2 h-[700px] w-20 text-center z-10",
    )}
  >
    right
  </right>
{/if}

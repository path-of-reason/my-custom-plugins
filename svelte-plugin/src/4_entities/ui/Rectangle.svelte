<script lang="ts">
  import { cn } from "@/5_shared/lib/utils";
  import { createEventDispatcher } from "svelte";
  import { type DrawingObject } from "@/2_widgets/lib/objects";
  export let data: DrawingObject;

  const dispatch = createEventDispatcher();

  let isDragging = false;
  let isResizing = false;
  let isSelected = false;
  let isEditable = false;
  let startX = 0;
  let startY = 0;
  let offsetX = 0;
  let offsetY = 0;
  let startWidth = data.width;
  let startHeight = data.height;

  function handleMouseDown(event: MouseEvent) {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    offsetX = data.coordinate[0];
    offsetY = data.coordinate[1];

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    if (isDragging) {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      const newX = offsetX + dx;
      const newY = offsetY + dy;
      // 상위노드의 updateRectangle이라는 커스텀 이벤트로 두 좌표를 전달함
      dispatch("updateRectangle", [newX, newY]); // Custom event to update position
    }
    if (isResizing) {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      const newWidth = Math.max(startWidth + dx, 20); // Minimum width
      const newHeight = Math.max(startHeight + dy, 20); // Minimum height
      dispatch("resizeRectangle", { width: newWidth, height: newHeight });
    }
  }

  function handleMouseUp() {
    isDragging = false;
    isResizing = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  function handleResizeMouseDown(event: MouseEvent) {
    event.stopPropagation();
    isResizing = true;
    startX = event.clientX;
    startY = event.clientY;
    startWidth = data.width;
    startHeight = data.height;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class={cn("absolute box-border cursor-move")}
  style="
    left: {data.coordinate[0]}px;
    top: {data.coordinate[1]}px;
    width: {data.width}px;
    height: {data.height}px;
    border-radius: {data.rounded};
    opacity: {data.opacity};
    border-width: {data.lineWidth}px;
    border-color: {data.lineColor};
    background-color: {data.bgColor};
    transform: rotate({data.rotation}deg);
    border-style: solid; 
    border-width: {data.lineWidth}px;
    border-color: {data.lineColor};
  "
  on:mousedown={handleMouseDown}
>
  <div
    class="absolute w-full h-full overflow-hidden flex flex-col text-wrap items-center justify-center caret-red-500"
    contenteditable={isEditable}
    style="
        font-size: {data.text?.fontSize}px;
        font-family: {data.text?.fontFamily};
        text-align: {data.text?.textAlign};
        vertical-align: {data.text?.textBaseline};
        color: {data.text?.color}
      "
  >
    {data.text?.content ?? ""}
  </div>

  <!-- Resizing handle -->
  <div
    class="absolute -bottom-4 -right-4 cursor-se-resize w-6 h-6"
    style="
      transform: translate(-50%, -50%);
    "
    on:mousedown={handleResizeMouseDown}
  ></div>
</div>

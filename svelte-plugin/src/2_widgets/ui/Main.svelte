<script lang="ts">
  import { cn } from "@/5_shared/lib/utils";
  import { objects } from "@/2_widgets/lib/objects";
  import Rectangle from "@/4_entities/ui/Rectangle.svelte";

  // update components
  function updateRectangle(index: number, newPosition: [number, number]) {
    objects[index].coordinate = newPosition;
  }
  function resizeRectangle(
    index: number,
    newSize: { width: number; height: number },
  ) {
    objects[index].width = newSize.width;
    objects[index].height = newSize.height;
  }

  // selecting
  // 선택된 오브젝트의 인덱스를 저장하는 Set
  let selectedObjects = new Set<number>();
  let selecting = false;
  let selectStart: [number, number] | undefined = [0, 0];
  let selectEnd: [number, number] = [0, 0];
  let rect: DOMRect;

  const container = (el: HTMLElement) => {
    rect = el.getBoundingClientRect();
    el.addEventListener("mousedown", handleMouseDown);
    return {
      destroy: () => {
        el.removeEventListener("mousedown", handleMouseDown);
      },
    };
  };

  function isInsideSelectionBox(
    obj: any,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ): boolean {
    const [left, top] = [Math.min(x1, x2), Math.min(y1, y2)];
    const [right, bottom] = [Math.max(x1, x2), Math.max(y1, y2)];
    const [objLeft, objTop] = obj.coordinate;
    const objRight = objLeft + obj.width;
    const objBottom = objTop + obj.height;
    return (
      objLeft < right && objRight > left && objTop < bottom && objBottom > top
    );
  }

  function handleMouseDown(e: MouseEvent) {
    selecting = true;

    const target = e.target as HTMLDivElement;
    rect = target.getBoundingClientRect();
    selectStart = [e.clientX - rect.left, e.clientY - rect.top];

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(e: MouseEvent) {
    if (selecting) {
      selectEnd = [e.clientX - rect.left, e.clientY - rect.top];
      updateSelection();
    }
  }

  function handleMouseUp() {
    selecting = false;
    selectEnd = [0, 0];
    selectStart = undefined;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  function updateSelection() {
    const [x1, y1] = selectStart as [number, number];
    const [x2, y2] = selectEnd as [number, number];

    selectedObjects.clear();

    objects.forEach((obj, index) => {
      if (isInsideSelectionBox(obj, x1, y1, x2, y2)) {
        selectedObjects.add(index);
      }
    });
  }

  function moveSelectedObjects(dx: number, dy: number) {
    selectedObjects.forEach((index) => {
      const obj = objects[index];
      obj.coordinate = [obj.coordinate[0] + dx, obj.coordinate[1] + dy];
    });
  }

  function resizeSelectedObjects(dx: number, dy: number) {
    selectedObjects.forEach((index) => {
      const obj = objects[index];
      obj.width = Math.max(obj.width + dx, 20); // Minimum width
      obj.height = Math.max(obj.height + dy, 20); // Minimum height
    });
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main use:container class={cn("absolute top-0 left-0 w-full h-full z-0")}>
  {#if selecting}
    <div
      class="absolute border border-dashed border-blue-500 bg-blue-200 opacity-50"
      style="
        left: {Math.min(selectStart[0], selectEnd[0])}px;
        top: {Math.min(selectStart[1], selectEnd[1])}px;
        width: {Math.abs(selectEnd[0] - selectStart[0])}px;
        height: {Math.abs(selectEnd[1] - selectStart[1])}px;
      "
    ></div>
  {/if}
  {#each objects as data, i}
    <Rectangle
      {data}
      on:updateRectangle={(e) => updateRectangle(i, e.detail)}
      on:resizeRectangle={(e) => resizeRectangle(i, e.detail)}
    />
  {/each}
</main>

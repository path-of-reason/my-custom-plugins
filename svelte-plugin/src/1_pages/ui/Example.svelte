<script lang="ts">
  import "@/styles.css";
  let svelteUrl = "https://svelte.dev/";
  let tailwindcssUrl = "https://tailwindcss.com/";
  let input: string = "";
</script>

<div class="break-words">
  <h1 class="text-4xl text-red-300">Example View</h1>
  <p class="text-red-300">
    This is an example of an Obsidian View made with
    <a href={svelteUrl}>Svelte 4</a>
    and
    <a href={tailwindcssUrl}>Tailwindcss</a>
    why cant update?
  </p>

  <h2>Reactivity</h2>
  <h3>Input</h3>
  <input
    type="text"
    placeholder="Write here"
    maxlength="115"
    bind:value={input}
  />
  <p>Input: {input}</p>
</div>

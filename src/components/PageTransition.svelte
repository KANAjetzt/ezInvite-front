<script>
  import { fade } from "svelte/transition";
</script>

<main in:fade={{ duration: 2000 }}>
  <slot />
</main>

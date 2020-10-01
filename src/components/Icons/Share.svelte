<script>
  import Icon from "./Icon.svelte";

  export let width;
  export let height;
  export let fill;
  export let bg = false;
</script>

<Icon {width} {height} {bg}>
  <svg
    stroke={fill}
    fill-opacity="0"
    stroke-width="2.5"
    {width}
    {height}
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
</Icon>

<script>
  import Icon from "./Icon.svelte";

  export let width;
  export let height;
  export let fill;
  export let bg = false;
</script>

<Icon {width} {height} {bg}>
  <svg
    {width}
    {height}
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.00012 0H1.00012C0.450122 0 0.00512207 0.45 0.00512207 1L0.00012207
      7C0.00012207 7.55 0.450122 8 1.00012 8H9.00012C9.55012 8 10.0001 7.55
      10.0001 7V1C10.0001 0.45 9.55012 0 9.00012 0ZM1.00012 2L5.00012
      4.5L9.00012 2V7H1.00012V2ZM1.00012 0.999999L5.00012 3.5L9.00012
      0.999999H1.00012Z"
      {fill} />
  </svg>

</Icon>

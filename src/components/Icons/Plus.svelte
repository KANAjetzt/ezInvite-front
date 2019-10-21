<script>
  import Icon from "./Icon.svelte";

  export let style = "";
  export let width;
  export let height;
  export let fill;
  export let bg = false;
</script>

<Icon {width} {height} {bg}>
  <svg
    {style}
    {width}
    {height}
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.5833
      8.54165H9.08329V14.7916H6.91663V8.54165H0.416626V6.45831H6.91663V0.208313H9.08329V6.45831H15.5833V8.54165Z"
      {fill} />
  </svg>
</Icon>

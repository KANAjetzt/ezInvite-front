<script>
  import Icon from "./Icon.svelte";

  export let width;
  export let height;
  export let fill;
  export let bg = false;
  export let border = false;
</script>

<Icon {width} {height} {bg} {border}>
  <svg
    {width}
    {height}
    viewBox="0 0 46 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16 10H10V16H6V10H0V6H6V0H10V6H16V10ZM35.66 10H42C44.2 10 46 11.8 46
      14V38C46 40.2 44.2 42 42 42H10C7.8 42 6 40.2 6
      38V20H10V38H42V14H33.9L30.24 10H20V6H32L35.66 10ZM26 36C20.48 36 16 31.52
      16 26C16 20.48 20.48 16 26 16C31.52 16 36 20.48 36 26C36 31.52 31.52 36 26
      36ZM26 20C29.3 20 32 22.7 32 26C32 29.3 29.3 32 26 32C22.7 32 20 29.3 20
      26C20 22.7 22.7 20 26 20Z"
      {fill} />
  </svg>

</Icon>

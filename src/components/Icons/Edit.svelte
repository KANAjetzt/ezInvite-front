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
    viewBox="0 0 20 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.6588 0C15.4088 0 15.1488 0.100006 14.9587 0.289993L13.1288
      2.12L16.8788 5.87L18.7087 4.03999C19.0988 3.64999 19.0988 3.02 18.7087
      2.63L16.3688 0.289993C16.1688 0.0899963 15.9188 0 15.6588 0ZM12.0588
      6.02L12.9788 6.94L3.91882 16H2.99878V15.08L12.0588 6.02ZM0.998779
      14.25L12.0588 3.19L15.8088 6.94L4.74878 18H0.998779V14.25Z"
      {fill}
      fill-opacity="0.95" />
  </svg>

</Icon>

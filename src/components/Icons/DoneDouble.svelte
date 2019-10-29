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
    viewBox="0 0 82 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M76.7175 0.532471L39.6875 37.5625L25.0575 22.9675L20.1225
      27.9025L39.6875 47.4675L81.6875 5.46747L76.7175 0.532471ZM61.8775
      5.46747L56.9425 0.532471L34.7525 22.7225L39.6875 27.6575L61.8775
      5.46747ZM19.8775 47.4674L0.3125 27.9024L5.2825 22.9674L24.8125
      42.5324L19.8775 47.4674Z"
      {fill}
      fill-opacity="0.54" />
  </svg>

</Icon>

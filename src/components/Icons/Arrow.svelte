<script>
  import Icon from "./Icon.svelte";

  export let width;
  export let height;
  export let fill;
  export let fillOpacity = 1;
  export let bg = false;
  export let border = false;
</script>

<Icon {width} {height} {bg} {border}>
  <svg
    {width}
    {height}
    viewBox="0 0 12 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M-7.80466e-05 18.03L1.77992 19.8L11.6699 9.89999L1.76992
      -1.23096e-05L-7.66251e-05 1.76999L8.12992 9.89999L-7.80466e-05 18.03Z"
      {fill}
      fill-opacity={fillOpacity} />
  </svg>

</Icon>

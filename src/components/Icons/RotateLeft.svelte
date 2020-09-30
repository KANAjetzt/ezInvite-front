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
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.4165 0.0375824C11.627 0.0184326 11.8293 0 12.05 0C18.34 0 23.49
      4.84 24 11H22.5C22.14 7.24001 19.8 4.07001 16.53 2.52L15.2001
      3.85001L11.39 0.0399933L11.4165 0.0375824ZM1.5 13C1.85999 16.76 4.19995
      19.93 7.46997 21.49L8.80005 20.15L12.61 23.97C12.5371 23.9733 12.4653
      23.9777 12.3936 23.9821L12.3922 23.9822C12.2478 23.9911 12.1034 24 11.95
      24C5.66003 24 0.51001 19.16 0 13H1.5ZM16 14H18V8C18 6.89 17.1 6 16
      6H10V8H16V14ZM8 4V16H20V18H18V20H16V18H8C6.89001 18 6 17.1 6
      16V8H4V6H6V4H8Z"
      {fill}
      fill-opacity="0.95" />
  </svg>
</Icon>

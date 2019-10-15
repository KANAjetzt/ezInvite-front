<script>
  export let timeStamp;

  const date = new Date(timeStamp * 1).toLocaleDateString();
</script>

{date}

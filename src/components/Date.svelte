<script>
  export let timeStamp;

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  };

  const date = new Date(timeStamp * 1).toLocaleDateString("de-DE", options);
</script>

{date}

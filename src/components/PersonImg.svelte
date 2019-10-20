<script>
  export let photo = "http://localhost:3000/img/user/default.jpg";
  export let name = "unknown user";
</script>

<style>
  .imgBox {
    width: 4.5rem;
    height: 4.5rem;
    border: solid 4px var(--color-primary);
    border-radius: 100%;
    overflow: hidden;
    z-index: 2;
    margin-left: -1rem;
  }

  .img {
    width: 100%;
    object-fit: cover;
  }
</style>

<div class="imgBox">
  <img class="img" src={photo} alt={`Profile image of ${photo}`} />
</div>

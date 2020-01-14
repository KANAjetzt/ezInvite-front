<script>
  import TodoList from "./TodoList.svelte";
</script>

<style>
  .barWrapper {
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
  }
  .bar {
    height: 16vw;
    background-image: linear-gradient(89.78deg, #0467b3 12.43%, #035696 99.33%);
    clip-path: var(--clip-primary);
  }
</style>

<section class="widget">

  <div class="barWrapper">
    <div class="bar" />
  </div>

  <TodoList />

  <div class="barWrapper">
    <div class="bar" />
  </div>

</section>

<script>
  import TodoList from "./TodoList.svelte";
  import DescriptionBox from "./DescriptionBox.svelte";
</script>

<style>
  .widget {
    margin-top: -6.5rem;
  }

  .bar {
    height: 6.3rem;
    background-image: linear-gradient(89.78deg, #0467b3 12.43%, #035696 99.33%);
    clip-path: var(--clip-primary);
  }
</style>

<DescriptionBox title={'List'} text={'Add things you need for your event.'} />
<section class="widget">
  <div class="barWrapper">
    <div class="bar" />
  </div>

  <TodoList />

  <div class="barWrapper">
    <div class="bar" />
  </div>
</section>

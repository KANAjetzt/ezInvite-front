<script>
  import Rotate from "./Rotate.svelte";
  import TodoList from "./TodoList.svelte";
  import DescriptionBox from "./DescriptionBox.svelte";
</script>

<style>
  .widget {
    margin-top: -6.5rem;
  }

  .bar {
    width: 120vw;
    height: 0.5rem;
    background-image: linear-gradient(89.78deg, #0467b3 12.43%, #035696 99.33%);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    transform: rotate(-9deg);
  }
</style>

<DescriptionBox title={'List'} text={'Add things you need for your event.'} />
<section class="widget">
  <Rotate child={'.bar'}>
    <div class="bar" />
  </Rotate>

  <TodoList />

  <Rotate child={'.bar'}>
    <div class="bar" />
  </Rotate>
</section>

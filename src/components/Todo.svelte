<script>
  import PersonImg from "./PersonImg.svelte";
  import PersonAddBtn from "./PersonAddBtn.svelte";

  export let data;
</script>

<style>
  .todo {
    display: flex;
    align-items: center;
  }
  .text {
    background-color: var(--color-primary-light);
    padding: 0.5rem 1.5rem;
    margin-left: -1rem;
    border-radius: 2px;
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 1.6rem;
    color: var(--color-text-primary);
  }
</style>

<li class="todo">
  <!-- PersonAddBtn - when the current viewing person is not partaking on this todo -->
  <PersonAddBtn />

  {#each data.users as { photo, name }}
    <PersonImg {photo} {name} />
  {/each}

  <p class="text">{data.text}</p>

</li>

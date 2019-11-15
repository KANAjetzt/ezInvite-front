<script>
  import PersonImg from "./PersonImg.svelte";

  export let photo = undefined;
  export let name;
</script>

<style>
  .personCard {
    display: flex;
    align-items: center;
    margin-left: 2rem;
  }

  .name {
    background-color: var(--color-primary-light);
    padding: 0.5rem 1.5rem;
    margin-left: -1rem;
    border-radius: 2px;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.6rem;
    color: var(--color-text-primary);
  }
</style>

<div class="personCard">
  <PersonImg {photo} {name} />
  <p class="name">{name}</p>
</div>

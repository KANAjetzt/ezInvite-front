<script>
  import PersonImg from "./PersonImg.svelte";

  export let photo = undefined;
  export let name;
</script>

<style>
  .personCard {
    display: flex;
    align-items: center;
    z-index: 20;
  }

  .name {
    background-color: var(--color-primary-light);
    padding: 1rem 2rem;
    margin-left: -1rem;
    border-radius: 2px;
    font-family: var(--font-primary);
    font-weight: 400;
    font-size: 1.6rem;
    color: var(--color-text-primary);
  }
</style>

<div class="personCard">
  <PersonImg {photo} {name} />
  <p class="name">{name ? name : 'Your Name'}</p>
</div>

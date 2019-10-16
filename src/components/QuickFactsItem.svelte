<script>
  export let heading;
  export let content;
</script>

<style>
  h3,
  p {
    margin: 0;
  }

  .item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    align-items: center;
    padding: 1.5rem 2rem 0 2rem;
  }

  .item:last-of-type {
    padding-bottom: 2.5rem;
  }

  .heading {
    grid-column: 1 2;
    display: flex;
    align-items: center;
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 1.6rem;
    letter-spacing: 0.5px;
    color: var(--color-text-primary);
  }

  .heading span {
    margin-left: 0.8rem;
  }

  .content {
    grid-column: 2 3;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.6rem;
    color: var(--color-text-primary);
  }
</style>

<div class="item">
  <h3 class="heading">
    <slot />
    <span>{heading}</span>
  </h3>
  <p class="content">{content}</p>
</div>

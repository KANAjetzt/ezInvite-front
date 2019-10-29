<script>
  export let title;
  export let text;
</script>

<style>
  .box {
    position: relative;
    display: inline-block;
    background: var(--color-tertiary);
    box-shadow: 4px 2px 2px rgba(0, 0, 0, 0.25);
    z-index: 10;
  }

  .title {
    margin: 1rem 0 0.5rem 0;
    padding-left: 1.5rem;
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 1.4rem;
    letter-spacing: 0.5px;
    color: var(--color-text-primary);
  }

  .text {
    margin: 0;
    padding: 0 1.5rem 1rem 1.5rem;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.6rem;
    color: var(--color-text-primary);
  }
</style>

<div class="box">
  <h3 class="title">{title}</h3>
  <p class="text">{text}</p>
</div>

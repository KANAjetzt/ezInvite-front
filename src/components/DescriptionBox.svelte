<script>
  export let title = undefined;
  export let text = undefined;
  export let descriptionBoxModifier = "";
</script>

<style>
  .box {
    position: relative;
    display: inline-block;
    background: var(--color-tertiary);
    box-shadow: 4px 2px 2px rgba(0, 0, 0, 0.25);
    line-height: 1.4;
    z-index: 10;
  }

  .box--shareBtn {
    position: relative;
    display: inline-block;
    width: 88%;
    background: var(--color-tertiary);
    box-shadow: 4px 2px 2px rgba(0, 0, 0, 0.25);
    line-height: 1.4;
    z-index: 10;
  }

  .title {
    margin: 0;
    padding: 1rem 2rem 1rem 1rem;
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

<div class={`box${descriptionBoxModifier}`}>
  {#if title}
    <h3 class="title">{title}</h3>
  {/if}
  {#if text}
    <p class="text">{text}</p>
  {/if}
</div>

<script>
  import { getEventData } from "../stores";

  let eventData = getEventData();
</script>

<style>
  .box {
    padding: 3rem 2rem;
  }

  .description {
    margin: 0 auto;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 1.5;
    color: var(--color-text-primary);
    max-width: 70ch;
  }
</style>

<div class="box">
  <p class="description">{eventData.description}</p>
</div>

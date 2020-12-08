<script>
  import { appStore } from "../stores.js";
  import getStr from "../utils/getLanguageStr.js";
  import TodoList from "./TodoList.svelte";
  import DescriptionBox from "./DescriptionBox.svelte";
</script>

<style>
  .widget {
    margin-top: -6.5rem;
  }

  .bar {
    height: 16vw;
    background-image: linear-gradient(89.78deg, #0467b3 12.43%, #035696 99.33%);
    clip-path: var(--clip-primary);
  }
</style>

<DescriptionBox
  title={$appStore.languages[0] ? getStr($appStore.languages, '18b6b2') : ''}
  text={$appStore.languages[0] ? getStr($appStore.languages, 'b7a5ce') : ''} />
<section class="widget">
  <div class="barWrapper">
    <div class="bar" />
  </div>

  <TodoList />

  <div class="barWrapper">
    <div class="bar" />
  </div>
</section>

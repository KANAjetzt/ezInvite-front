<script>
  import { appStore } from "../stores.js";

  let checked = false;

  const root = document.documentElement.style;
  $: if (checked) {
    root.setProperty("--settingsBtnNOShadowOpacity", "1");
  } else {
    root.setProperty("--settingsBtnNOShadowOpacity", "0");
  }
</script>

<style>
  .settings {
    padding: 3rem 5rem;
    background-color: var(--color-primary);
    clip-path: polygon(15% 0, 100% 0, 85% 100%, 0 100%);
  }

  select {
    font-family: var(--font-primary);
    cursor: pointer;
    display: inline-block;
    position: relative;
    font-size: 16px;
    padding: 0.5rem 2rem;
    border: none;
    box-shadow: 0 2px 0 var(--color-secondary);
    background-color: transparent;
    color: var(--color-text-primary);
  }
</style>

<div class="settings">
  <select>
    <option value="de">Deutsch</option>
    <option value="en">English</option>
  </select>
</div>

<script>
  import { eventDataStore } from "../stores";
  import getImg from "../utils/handleImgSrc";

  export let title = "Corrogo";
</script>

<svelte:head>
  <title>{title}</title>

  <!-- Primary Meta Tags -->
  <meta
    name="title"
    content={$eventDataStore.name ? $eventDataStore.name : title} />
  <meta
    name="description"
    content={$eventDataStore.description ? $eventDataStore.description : ''} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={window.location.href} />
  <meta
    property="og:title"
    content={$eventDataStore.name ? $eventDataStore.name : title} />
  <meta
    property="og:description"
    content={$eventDataStore.description ? $eventDataStore.description : ''} />
  <meta property="og:image:width" content={560} />
  <meta property="og:image:height" content={300} />
  <meta
    property="og:image"
    content={$eventDataStore.heroImg ? getImg($eventDataStore.heroImg, 'c_thumb,w_560,h_300,g_face/v1588149527/') : ''} />
  <meta
    property="og:image:secure_url"
    content={$eventDataStore.heroImg ? getImg($eventDataStore.heroImg, 'c_thumb,w_560,h_300,g_face/v1588149527/') : ''} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={window.location.href} />
  <meta
    property="twitter:title"
    content={$eventDataStore.name ? $eventDataStore.name : title} />
  <meta
    property="twitter:description"
    content={$eventDataStore.description ? $eventDataStore.description : ''} />
  <meta
    property="twitter:image"
    content={$eventDataStore.heroImg ? getImg($eventDataStore.heroImg) : ''} />
</svelte:head>

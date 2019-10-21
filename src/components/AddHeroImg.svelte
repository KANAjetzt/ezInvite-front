<script>
  let bgImage =
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80";
</script>

<style>
  .hero {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 10rem;
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0% 100%);
    background-image: linear-gradient(
      130.02deg,
      #0476d0 12.41%,
      #047dd9 88.27%
    );
    background-size: cover;
  }
  .topBar {
    width: 100%;
    height: 0.5rem;
    margin-bottom: 4rem;
    background-image: linear-gradient(
      89.87deg,
      #0476d0 -2.53%,
      #047dd9 112.27%
    );
  }
</style>

<header class="hero">
  <div class="topBar" />
</header>

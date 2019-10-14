<script>
  import CalendarIcon from "./Icons/Calendar.svelte";
  import LocationPinIcon from "./Icons/LocationPin.svelte";

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
  h1,
  p {
    font-family: var(--font-primary);
    font-weight: 400;
    color: var(--color-text-primary);
    margin: 0;
  }

  h1 {
    text-transform: uppercase;
    text-align: center;
    padding: 1rem 4rem;
  }

  .title {
    align-self: center;
    background-image: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      linear-gradient(
        180deg,
        rgba(4, 118, 208, 0) 0%,
        rgba(4, 118, 208, 0.5) 100%
      );
  }

  p {
    font-size: 1.4rem;
    margin-left: 0.5rem;
  }

  .info {
    margin-top: 2rem;
    display: flex;
    justify-content: space-evenly;
  }

  .box {
    display: flex;
    align-items: center;
  }
</style>

<header
  class="hero"
  style="background-image: linear-gradient( 89.87deg, hsla(206, 96%, 25%, 0.85)
  -2.53%, hsla(206, 96%, 25%, 0.85) 112.27% ), url('{bgImage}')">
  <div class="topBar" />
  <div class="title">
    <h1>city grill</h1>
  </div>
  <div class="info">
    <div class="box">
      <CalendarIcon width={16} height={16} fill={'#f9fafb'} />
      <p>12.12.2019</p>
    </div>
    <div class="box">
      <LocationPinIcon width={16} height={16} fill={'#f9fafb'} />
      <p>Konstanz</p>
    </div>
  </div>
</header>

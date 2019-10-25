<script>
  import places from "places.js";

  const placesAutocomplete = places({
    appId: "plB0LOVTNPLQ",
    apiKey: "23d506ecfe731524c50e2ba18682e154",
    container: document.getElementById("address-input")
  });
</script>

<input type="search" id="address-input" placeholder="Where is your event?" />

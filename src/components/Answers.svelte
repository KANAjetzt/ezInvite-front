<script>
  /*
   TODO:
      - Make Section without people not apear!
*/

  import { eventDataStore } from "../stores";
  import PersonCard from "./PersonCard.svelte";
  import DoneIcon from "./Icons/DoneFilled.svelte";
  import CrossIcon from "./Icons/Cross.svelte";
  import QuestionmarkIcon from "./Icons/Questionmark.svelte";

  let users;
  let acceptedUsers = [];
  let canceledUsers = [];
  let pendingUsers = [];

  eventDataStore.subscribe(newData => {
    users = newData.users;

    acceptedUsers = users.filter(user => user.accepted === true);
    canceledUsers = users.filter(user => user.accepted === false);
    pendingUsers = users.filter(user => user.accepted === null);
  });
</script>

<style>
  .answers {
    padding: 0 2rem;
  }

  .heading {
    margin: 0;
    padding-top: 1.5rem;
    padding-bottom: 1rem;
    font-family: var(--font-primary);
    font-size: 2.4rem;
    font-weight: 500;
    color: transparent;
    text-transform: uppercase;
    text-align: center;
    background-image: linear-gradient(173deg, #f0f0f0 40%, #047dd9);
    -webkit-background-clip: text;
  }

  .h3 {
    display: flex;
    align-items: center;
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 1.6rem;
    color: var(--color-text-primary);
  }

  .h3 span {
    margin-left: 0.5rem;
  }
</style>

<section class="answers">

  <h2 class="heading">Answers</h2>

  <!-- Accepted === TRUE -->
  <h3 class="h3">
    <DoneIcon width={13} height={13} fill={'#f9fafb'} bg={true} />
    <span>Will come</span>
  </h3>

  <div class="users">
    {#if acceptedUsers}
      {#each acceptedUsers as user}
        <PersonCard
          photo={`http://localhost:3000/img/user/${user.photo}`}
          name={user.name} />
      {/each}
    {/if}
  </div>

  <!-- Accepted === FALSE -->
  <h3 class="h3">
    <CrossIcon width={13} height={13} fill={'#f9fafb'} bg={true} />
    <span>Sorry no Time</span>
  </h3>

  {#if canceledUsers}
    {#each canceledUsers as user}
      <PersonCard
        photo={`http://localhost:3000/img/user/${user.photo}`}
        name={user.name} />
    {/each}
  {/if}

  <!-- Accepted === UNDEFINED -->
  <h3 class="h3">
    <QuestionmarkIcon width={13} height={13} fill={'#f9fafb'} bg={true} />
    <span>Waiting for an Answer</span>
  </h3>

  {#if pendingUsers}
    {#each pendingUsers as user}
      <PersonCard
        photo={`http://localhost:3000/img/user/${user.photo}`}
        name={user.name} />
    {/each}
  {/if}

</section>

<script>
  import { getEventData } from "../stores";
  import CalendarIcon from "./Icons/Calendar.svelte";
  import WatchIcon from "./Icons/Watch.svelte";
  import EnvelopeIcon from "./Icons/Envelope.svelte";
  import DoneIcon from "./Icons/Done.svelte";
  import { formatDate } from "../utils/date.js";
  import Item from "./QuickFactsItem.svelte";

  let eventData = getEventData();

  const getacceptedUsers = () => {
    const acceptedUsers = eventData.users.filter(user => user.accepted);
    return acceptedUsers.length;
  };
</script>

<style>
  .box {
    position: relative;
    width: 85vw;
    margin: -5rem auto 0 auto;
    background-color: var(--color-primary);
    box-shadow: 4px 1px 2px #0a1b29;
    z-index: 5;
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
</style>

<div class="box">
  <h2 class="heading">Quick Facts</h2>
  <Item heading="Date" content={formatDate(eventData.startDate * 1)}>
    <CalendarIcon width={13} height={13} fill={'#f9fafb'} bg={true} />
  </Item>
  <Item heading="Time" content={`${eventData.startTime} Uhr`}>
    <WatchIcon width={13} height={13} fill={'#f9fafb'} bg={true} />
  </Item>
  <Item heading="Invited" content={`${eventData.users.length} people`}>
    <EnvelopeIcon width={13} height={13} fill={'#f9fafb'} bg={true} />
  </Item>
  <Item heading="Accepted" content={`${getacceptedUsers()} people`}>
    <DoneIcon width={13} height={13} fill={'#f9fafb'} bg={true} />
  </Item>
</div>

<script>
  import getStr from "../utils/getLanguageStr.js";
  import { eventDataStore, appStore } from "../stores";
  import CalendarIcon from "./Icons/Calendar.svelte";
  import WatchIcon from "./Icons/Watch.svelte";
  import EnvelopeIcon from "./Icons/Envelope.svelte";
  import DoneIcon from "./Icons/Done.svelte";
  import { formatDate } from "../utils/date.js";
  import Item from "./QuickFactsItem.svelte";
  import LanguageStr from "./LanguageStr.svelte";

  let eventData;

  eventDataStore.subscribe(newValue => {
    eventData = newValue;
  });

  const getacceptedUsers = () => {
    const acceptedUsers = eventData.users.filter(user => user.accepted);
    return acceptedUsers.length;
  };
</script>

<style>
  .box {
    position: relative;
    width: 85vw;
    max-width: 40rem;
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
  <h2 class="heading">
    <LanguageStr id={'639451'} />
  </h2>
  <Item
    heading={$appStore.languages[0] ? getStr($appStore.languages, '61b501') : ''}
    content={formatDate(eventData.startDate * 1, $appStore.currentLanguage === 'de' ? 'de-DE' : 'en-US')}>
    <CalendarIcon width={13} height={13} fill={'#f9fafb'} bg={true} />
  </Item>
  {#if eventData.startTime}
    <Item
      heading={$appStore.languages[0] ? getStr($appStore.languages, '7c9f73') : ''}
      content={eventData.endTime ? `${eventData.startTime} - ${eventData.endTime} ${$appStore.languages[0] ? getStr($appStore.languages, 'd1cf0d') : ''}` : `${eventData.startTime} ${$appStore.languages[0] ? getStr($appStore.languages, 'd1cf0d') : ''}`}>
      <WatchIcon width={13} height={13} fill={'#f9fafb'} bg={true} />
    </Item>
  {/if}
  <Item
    heading={$appStore.languages[0] ? getStr($appStore.languages, '342eed') : ''}
    content={`${eventData.users ? eventData.users.length : 0} ${$appStore.languages[0] ? getStr($appStore.languages, '1ac2a1') : ''}`}>
    <EnvelopeIcon width={13} height={13} fill={'#f9fafb'} bg={true} />
  </Item>
  <Item
    heading={$appStore.languages[0] ? getStr($appStore.languages, '0345e7') : ''}
    content={`${eventData.users ? getacceptedUsers() : 0} ${$appStore.languages[0] ? getStr($appStore.languages, '9bc8b2') : ''}`}>
    <DoneIcon width={13} height={13} fill={'#f9fafb'} bg={true} />
  </Item>
</div>

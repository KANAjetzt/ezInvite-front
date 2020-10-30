<script>
  import { appStore, currentLanguage } from "../stores.js";

  export let id;

  const getStr = id => {
    // filter out the string with the desired ID
    const strArr = $appStore.languages.filter(str => str.ID === id);
    // return only the string value of the object
    return strArr[0].str;
  };
</script>

{$appStore.languages[0] ? getStr(id) : ''}

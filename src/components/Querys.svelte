<script>
  import { getClient } from "svelte-apollo";
  import { gql } from "apollo-boost";

  const client = getClient();

  const GETEVENT = gql`
    {
      event(id: "5d9f25cc4f5859672464ef42") {
        name
        startDate
        location {
          name
        }
      }
    }
  `;

  export const queryEventData = async () => {
    const data = await client.query({ query: GETEVENT });
    console.log(data);
  };
</script>

<script lang="ts">
  import RenderEncodedTable from "./utils/renderEncodedTable";

  import { EncodingType } from "../types/EncodingType";

  let testBinaryStringInput = "01001110";
  let binaryInputArray = testBinaryStringInput.split("");
  // console.log(getBitsVoltage(binaryInputArray, EncodingType.Nrzi));
</script>

<table>
  <thead>
    <tr>
      {#each binaryInputArray as bit}
        <th colspan="2">{bit}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    <tr>
      {@html RenderEncodedTable.nonReturnToZeroLevel(binaryInputArray)}
    </tr>
    <tr>
      {#each binaryInputArray as bit}
        <td class="border"></td>
        <td class="border"></td>
      {/each}
    </tr>
  </tbody>
</table>

<style lang="postcss">
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 32px;
  }
  th {
    background-color: #f2f2f2;
  }
</style>

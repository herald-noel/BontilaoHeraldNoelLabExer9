<script lang="ts">
  import EncodedTable from "./utils/encodedTable";

  import { EncodingType } from "../model/EncodingType";
  import getBitsVoltage from "./utils/getBitsVoltage";

  let testBinaryStringInput = "01001110";
  let binaryInputArray = testBinaryStringInput.split("");
  const voltages = getBitsVoltage(binaryInputArray, EncodingType.Nrzl);
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
      {@html EncodedTable.render(voltages)}
    </tr>
    <tr>
      {@html EncodedTable.render(voltages, EncodedTable.RenderType.Lower)}
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

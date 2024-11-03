<script lang="ts">
  import EncodedTable from "./utils/encodedTable";
  import getBitsVoltage from "./utils/getBitsVoltage";
  import type { VoltageType } from "../model/VoltageType";

  export let selectedEncodingType;
  let testBinaryStringInput = "01001110";
  let binaryInputArray: string[];
  let voltages: Array<VoltageType>;

  $: {
    binaryInputArray = testBinaryStringInput.split("");
    voltages = getBitsVoltage(binaryInputArray, selectedEncodingType);
  }
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
      {@html EncodedTable.render(selectedEncodingType, voltages)}
    </tr>
    <tr>
      {@html EncodedTable.render(
        selectedEncodingType,
        voltages,
        EncodedTable.RenderType.Lower
      )}
    </tr>
  </tbody>
</table>

<style lang="postcss">
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    padding: 32px;
  }
  th {
    background-color: #f2f2f2;
  }
</style>

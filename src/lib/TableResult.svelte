<script lang="ts">
  import EncodedTable from "./utils/encodedTable";
  import getBitsVoltage from "./utils/getBitsVoltage";
  import { VoltageType } from "../model/VoltageType";

  export let selectedEncodingType;
  export let binaryInputString;

  let binaryInputArray: string[];
  let voltages: Array<VoltageType>;
  const startVoltage = VoltageType.LowToHigh;

  $: {
    binaryInputArray = binaryInputString.split("");
    voltages = getBitsVoltage(
      binaryInputArray,
      selectedEncodingType,
      startVoltage
    );
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
      {@html EncodedTable.render(selectedEncodingType, voltages, startVoltage)}
    </tr>
    <tr>
      {@html EncodedTable.render(
        selectedEncodingType,
        voltages,
        startVoltage,
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

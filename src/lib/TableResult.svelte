<script lang="ts">
  import EncodedTable from "./utils/encodedTable";
  import getBitsVoltage from "./utils/getBitsVoltage";
  import { VoltageType } from "../model/VoltageType";

  export let selectedEncodingType;
  export let binaryInputString;
  export let startVoltage;

  let binaryInputArray: string[];
  let voltages: Array<VoltageType>;

  $: {
    binaryInputArray = binaryInputString.split("");
    voltages = getBitsVoltage(
      binaryInputArray,
      selectedEncodingType,
      startVoltage
    );
  }
</script>

<table
  class="min-w-full border-collapse border border-gray-300 rounded-lg mb-4"
>
  <thead>
    <tr class="bg-gray-200 text-gray-700">
      {#each binaryInputArray as bit}
        <th colspan="2" class="border border-gray-300 px-4 py-2">{bit}</th>
      {/each}
    </tr>
  </thead>
  <tbody class="bg-white text-gray-800">
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

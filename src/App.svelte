<script lang="ts">
  import "./app.css";
  import TableResult from "./lib/TableResult.svelte";
  import ToggleVoltage from "./lib/ToggleVoltage.svelte";
  import { EncodingType } from "./model/EncodingType";
  import { VoltageType } from "./model/VoltageType";

  let selectedEncodingType: EncodingType;
  let binaryInputString: string = "01001110";
  let startVoltage = VoltageType.HighToLow;

  let receivedData: boolean = false;
  function handleDataSent(event: CustomEvent<{ data: boolean }>) {
    receivedData = event.detail.data;
    startVoltage = receivedData ? VoltageType.LowToHigh : VoltageType.HighToLow;
  }
</script>

<main class="flex flex-col items-center bg-gray-50 min-h-screen p-8">
  <h1 class="text-2xl font-semibold text-gray-700 mb-4">
    Data Encoding Techniques
  </h1>

  <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-6">
    <label for="binaryInput" class="block text-gray-600 font-medium mb-2"
      >Binary Input:</label
    >
    <input
      id="binaryInput"
      type="text"
      bind:value={binaryInputString}
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-6">
    <label for="encodingType" class="block text-gray-600 font-medium mb-2"
      >Encoding Type:</label
    >
    <select
      id="encodingType"
      bind:value={selectedEncodingType}
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option value={EncodingType.Nrzl}>NRZ-L</option>
      <option value={EncodingType.Nrzi}>NRZ-I</option>
      <option value={EncodingType.BipolarAMI}>Bipolar AMI</option>
      <option value={EncodingType.Pseudoternary}>Pseudoternary</option>
      <option value={EncodingType.Manchester}>Manchester</option>
      <option value={EncodingType.DifferentialManchester}
        >Differential Manchester</option
      >
    </select>
  </div>
  {#if selectedEncodingType === EncodingType.DifferentialManchester}
    <div class="mb-6">
      <ToggleVoltage on:dataSent={handleDataSent} />
    </div>
  {/if}

  <div class="w-full max-w-4xl overflow-auto">
    <TableResult {selectedEncodingType} {binaryInputString} {startVoltage} />
  </div>
</main>

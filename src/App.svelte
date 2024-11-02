<script lang="ts">
  import "./app.css";
  import TableResult from "./lib/TableResult.svelte";
  import { EncodingType } from "./model/EncodingType";

  let selectedEncodingType: EncodingType;
  function handleEncodingChange() {
    console.log("Selected Encoding Type:", selectedEncodingType);
  }
</script>

<main>
  <label for="encodingType">Choose an Encoding Type:&nbsp</label>
  <select
    name="encodingType"
    id="encodingType"
    bind:value={selectedEncodingType}
    on:change={handleEncodingChange}
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
  <TableResult {selectedEncodingType} />
</main>

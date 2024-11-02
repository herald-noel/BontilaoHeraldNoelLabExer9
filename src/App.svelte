<script lang="ts">
  import Result from "./lib/Result.svelte";
  import { EncodingType } from "./types/EncodingType";

  let selectedEncodingType = "";
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
  <div class="card">
    <Result />
  </div>
</main>

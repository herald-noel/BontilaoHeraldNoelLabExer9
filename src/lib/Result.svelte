<script lang="ts">
  import TableResult from "./TableResult.svelte";

  export let encodingType;
  let result: number;
  let testBinaryStringInput = "01001110";
</script>

<h1>Encoding type: {encodingType}</h1>
<h2>Result: {result}</h2>
<div class="p-20">
  <TableResult />
</div>

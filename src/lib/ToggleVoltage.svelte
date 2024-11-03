<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let isChecked: boolean = false;

  function toggle() {
    isChecked = !isChecked;
    dispatch("dataSent", { data: isChecked });
  }
  const dispatch = createEventDispatcher<{ dataSent: { data: boolean } }>();
</script>

<div class="flex items-center">
  <label class="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" class="sr-only peer" on:change={toggle} />
    <div
      class="w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-600 peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-500 transition-all duration-200 ease-in-out"
    ></div>
    <div
      class="absolute left-0 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-full transition-transform duration-200 ease-in-out"
    ></div>
  </label>
  <span class="ml-3 text-sm font-medium text-gray-700"
    >Initially {isChecked ? "high" : "low"}</span
  >
</div>

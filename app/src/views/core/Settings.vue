<script setup lang="ts">
import { useSettings } from "../../store";

const settings = useSettings();
</script>

<template>
  <div :class="{ 'mx-auto max-w-6xl': !settings.expandFull }">
    <div class="mb-6 flex flex-row items-center border-b pb-4">
      <span class="ml-2 text-2xl">Settings</span>
    </div>

    <div class="rounded-lg border border-zinc-200 p-4">
      <p class="text-lg">Expand checklist UI fully on wide screens</p>

      <div class="text-right">
        <button @click="settings.expandFull = !settings.expandFull">
          {{ settings.expandFull ? "Narrow" : "Expand" }}
        </button>
      </div>
    </div>
  </div>
</template>

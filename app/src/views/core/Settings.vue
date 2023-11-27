<script setup lang="ts">
import { useSettings } from "../../store";
import TopNavbar from "../components/TopNavbar.vue";
import Version from "../components/Version.vue";

const settings = useSettings();
</script>

<template>
  <TopNavbar sideDrawer>Settings</TopNavbar>

  <div
    :class="{ 'mx-auto max-w-6xl': !settings.expandFull }"
    class="flex flex-col gap-8"
  >
    <div class="rounded-lg border border-zinc-200 p-4">
      <p class="text-lg">Expand checklist UI fully on wide screens</p>

      <div class="text-right">
        <button
          class="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1 text-zinc-700"
          @click="settings.expandFull = !settings.expandFull"
        >
          {{ settings.expandFull ? "Narrow" : "Expand" }}
        </button>
      </div>
    </div>

    <div class="rounded-lg border border-zinc-200 p-4">
      <Version />
    </div>
  </div>
</template>

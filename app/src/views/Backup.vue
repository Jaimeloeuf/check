<script setup lang="ts">
import { useSettings } from "../store";
import SideDrawerButton from "./components/SideDrawerButton.vue";
import { generateFullBackupJSON } from "../utils/generateFullBackupJSON";
import { downloadFile } from "../utils/downloadFile";

const settings = useSettings();

async function backup() {
  downloadFile("backup.json", generateFullBackupJSON());
}
</script>

<template>
  <div :class="{ 'mx-auto max-w-6xl': !settings.expandFull }">
    <div class="mb-6 flex flex-row items-center border-b pb-4">
      <SideDrawerButton />
      <span class="ml-2 text-2xl">Backup</span>
    </div>

    <div class="flex flex-col gap-6">
      <button class="rounded-lg border border-zinc-200 p-3" @click="backup">
        Generate and download backup file
      </button>
    </div>
  </div>
</template>

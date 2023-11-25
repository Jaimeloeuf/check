<script setup lang="ts">
import TopNavbar from "./components/TopNavbar.vue";
import { generateFullBackupJSON } from "../utils/generateFullBackupJSON";
import { downloadFile } from "../utils/downloadFile";

async function backup() {
  downloadFile("backup.json", generateFullBackupJSON());
}
</script>

<template>
  <TopNavbar sideDrawer>Backup</TopNavbar>

  <div class="mx-auto flex max-w-xl flex-col gap-6">
    <button
      class="flex flex-row items-center justify-between rounded-lg border border-zinc-200 p-3"
      @click="backup"
    >
      Generate and download backup file
      <img
        src="../assets/SideDrawerIcon/Backup.svg"
        class="inline-block h-4 w-4"
      />
    </button>
  </div>
</template>

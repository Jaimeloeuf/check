<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useChecklist, useGroup, useNotif } from "../store";
import { AllChecklistRoute } from "../router";
import TopNavbar from "./components/TopNavbar.vue";
import { importJSONBackup } from "../utils/backup";

const router = useRouter();
const checklistStore = useChecklist();
const groupStore = useGroup();
const notif = useNotif();

const localFile = ref<File | null>(null);
const replaceExistingChecklists = ref<boolean>(false);

async function onFileChanged(event: Event) {
  const target = event.target;
  if (target === null) {
    console.error("No target in onFileChanged event");
    return;
  }

  const files = (target as HTMLInputElement).files;
  if (files === null) {
    console.error("No files in onFileChanged");
    return;
  }

  const [file] = files;
  if (file === undefined) {
    console.error("Cannot get file in onFileChanged");
    return;
  }

  localFile.value = file;
}

async function importBackup() {
  const file = localFile.value;
  if (file === null) {
    console.error("Missing file to process");
    return;
  }

  if (replaceExistingChecklists.value) {
    checklistStore.$reset();
    groupStore.$reset();
  }

  importJSONBackup(await file.text());

  notif.setSnackbar("Backup imported!");

  router.push({ name: AllChecklistRoute.name });
}
</script>

<template>
  <TopNavbar sideDrawer>Import</TopNavbar>

  <div class="mx-auto flex max-w-xl flex-col gap-6">
    <div>
      <label for="upload">
        <p class="pb-2">Upload Backup File</p>

        <div
          class="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-6 text-center"
        >
          <svg
            class="m-0 inline-block h-5 w-6 p-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.19616 15.9998C1.6137 15.9998 1.0551 15.7685 0.643241 15.3566C0.231381 14.9447 0 14.3861 0 13.8037V10.6663C3.7197e-09 10.4167 0.0991632 10.1773 0.275675 10.0008C0.452186 9.82426 0.691587 9.7251 0.941212 9.7251C1.19084 9.7251 1.43024 9.82426 1.60675 10.0008C1.78326 10.1773 1.88242 10.4167 1.88242 10.6663V13.8037C1.88242 13.9769 2.02298 14.1174 2.19616 14.1174H15.3731C15.4563 14.1174 15.5361 14.0844 15.595 14.0255C15.6538 13.9667 15.6869 13.8869 15.6869 13.8037V10.6663C15.6869 10.4167 15.786 10.1773 15.9625 10.0008C16.1391 9.82426 16.3785 9.7251 16.6281 9.7251C16.8777 9.7251 17.1171 9.82426 17.2936 10.0008C17.4701 10.1773 17.5693 10.4167 17.5693 10.6663V13.8037C17.5693 14.3861 17.3379 14.9447 16.9261 15.3566C16.5142 15.7685 15.9556 15.9998 15.3731 15.9998H2.19616Z"
              fill="gray"
            />
            <path
              d="M13.5284 4.35437C13.6157 4.44171 13.685 4.54541 13.7323 4.65953C13.7795 4.77365 13.8039 4.89597 13.8039 5.01949C13.8039 5.14302 13.7795 5.26533 13.7323 5.37945C13.685 5.49358 13.6157 5.59727 13.5284 5.68462C13.441 5.77196 13.3373 5.84125 13.2232 5.88852C13.1091 5.93579 12.9868 5.96012 12.8632 5.96012C12.7397 5.96012 12.6174 5.93579 12.5033 5.88852C12.3892 5.84125 12.2855 5.77196 12.1981 5.68462L9.72587 3.21362V10.353C9.72587 10.6027 9.6267 10.8421 9.45019 11.0186C9.27368 11.1951 9.03428 11.2942 8.78466 11.2942C8.53503 11.2942 8.29563 11.1951 8.11912 11.0186C7.94261 10.8421 7.84344 10.6027 7.84344 10.353V3.21362L5.37119 5.68462C5.28385 5.77196 5.18015 5.84125 5.06603 5.88852C4.95191 5.93579 4.82959 5.96012 4.70607 5.96012C4.58254 5.96012 4.46023 5.93579 4.34611 5.88852C4.23198 5.84125 4.12829 5.77196 4.04094 5.68462C3.9536 5.59727 3.88431 5.49358 3.83704 5.37945C3.78977 5.26533 3.76544 5.14302 3.76544 5.01949C3.76544 4.89597 3.78977 4.77365 3.83704 4.65953C3.88431 4.54541 3.9536 4.44171 4.04094 4.35437L8.11953 0.275781C8.20683 0.188356 8.31051 0.118999 8.42464 0.0716782C8.53877 0.0243572 8.66111 0 8.78466 0C8.90821 0 9.03054 0.0243572 9.14467 0.0716782C9.2588 0.118999 9.36248 0.188356 9.44978 0.275781L13.5284 4.35437Z"
              fill="gray"
            />
          </svg>

          Upload
          <input
            id="upload"
            type="file"
            class="hidden"
            @change="onFileChanged($event)"
          />
        </div>
      </label>

      <p v-if="localFile" class="pt-2">
        Uploaded
        <span class="italic text-yellow-600">
          {{ localFile.name }}
        </span>
      </p>
    </div>

    <div v-if="localFile !== null" class="pt-4">
      <p class="pb-4 text-xl">Options</p>

      <label class="flex flex-row items-start pb-8">
        <input type="checkbox" v-model="replaceExistingChecklists" />
        <p class="-mt-1.5 pl-2">
          <span class="text-red-600">Reset all local data?</span><br />
          Select this to delete existing checklists and groups before importing.
        </p>
      </label>

      <button
        class="w-full rounded-lg border border-green-600 p-2 text-green-600"
        @click="importBackup"
      >
        Import backup file
      </button>
    </div>
  </div>
</template>

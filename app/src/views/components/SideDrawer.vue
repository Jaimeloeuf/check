<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  AllChecklistRoute,
  AllGroupRoute,
  BackupRoute,
  ImportRoute,
  SettingsRoute,
} from "../../router";
import { useSidedrawer } from "../../store";
import HelpButton from "./HelpButton.vue";

const route = useRoute();
const drawer = useSidedrawer();
</script>

<template>
  <!-- Overlay across screen to simulate click away from side drawer to close. -->
  <div
    v-if="drawer.showDrawer"
    class="fixed left-0 top-0 z-40 h-screen w-screen"
    @click="drawer.hide"
  ></div>

  <nav
    class="fixed left-0 top-0 z-40 h-screen w-52 -translate-x-full transition-transform"
    :class="{ 'w-5/6 translate-x-0 shadow-2xl': drawer.showDrawer }"
  >
    <div class="flex h-full flex-col items-start justify-between bg-white p-4">
      <button class="w-full border-b border-zinc-200 py-2" @click="drawer.hide">
        <img src="../../assets/logo.svg" class="h-6" />
        <p class="py-1 text-left font-semibold text-zinc-600">Public Beta</p>
      </button>

      <div class="w-full pt-4">
        <router-link
          :to="{ name: AllChecklistRoute.name }"
          class="group flex w-full rounded-lg p-2 text-zinc-900"
          :class="{
            'border border-zinc-200 bg-zinc-50':
              route.name === AllChecklistRoute.name,
          }"
          @click="drawer.hide"
        >
          <img
            src="../../assets/SideDrawerIcon/Checklist.svg"
            class="h-6 w-6"
          />
          <span class="ml-3 flex-1 text-left">Checklists</span>
        </router-link>

        <router-link
          :to="{ name: AllGroupRoute.name }"
          class="group flex w-full rounded-lg p-2 text-zinc-900"
          :class="{
            'border border-zinc-200 bg-zinc-50':
              route.name === AllGroupRoute.name,
          }"
          @click="drawer.hide"
        >
          <img
            src="../../assets/SideDrawerIcon/Checklist.svg"
            class="h-6 w-6"
          />
          <span class="ml-3 flex-1 text-left">Groups</span>
        </router-link>

        <router-link
          :to="{ name: BackupRoute.name }"
          class="group flex w-full rounded-lg p-2 text-zinc-900"
          :class="{
            'border border-zinc-200 bg-zinc-50':
              route.name === BackupRoute.name,
          }"
          @click="drawer.hide"
        >
          <img src="../../assets/SideDrawerIcon/Backup.svg" class="h-6 w-6" />
          <span class="ml-3 flex-1 text-left">Backup</span>
        </router-link>

        <router-link
          :to="{ name: ImportRoute.name }"
          class="group flex w-full rounded-lg p-2 text-zinc-900"
          :class="{
            'border border-zinc-200 bg-zinc-50':
              route.name === ImportRoute.name,
          }"
          @click="drawer.hide"
        >
          <img
            src="../../assets/SideDrawerIcon/Backup.svg"
            class="h-6 w-6 rotate-90"
          />
          <span class="ml-3 flex-1 text-left">Import</span>
        </router-link>
      </div>

      <!-- Spacer divider that takes up all the space in the middle -->
      <div class="grow"></div>

      <router-link
        :to="{ name: SettingsRoute.name }"
        class="flex w-full rounded-lg p-2 text-start text-zinc-900"
        :class="{
          'border border-zinc-200 bg-zinc-50':
            route.name === SettingsRoute.name,
        }"
        @click="drawer.hide"
      >
        <img src="../../assets/SideDrawerIcon/Settings.svg" class="h-6 w-6" />
        <span class="ml-3 flex-1">Settings</span>
      </router-link>

      <HelpButton />
    </div>
  </nav>
</template>

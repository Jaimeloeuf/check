export const NotFoundRoute = <const>{
  path: "/:pathMatch(.*)*",
  name: "404",
  component: () => import("../views/404.vue"),
};

export const HomeRoute = <const>{
  name: "home",
  path: "/",
  component: () => import("../views/core/Home.vue"),
};

export const DebugRoute = <const>{
  name: "debug",
  path: "/debug",
  component: () => import("../views/core/Debug.vue"),
};

export const AllChecklistRoute = <const>{
  name: "checklist-all",
  path: "/checklist/all",
  component: () => import("../views/checklist/AllChecklist.vue"),
};

export const ChecklistRoute = <const>{
  name: "checklist",
  path: "/checklist/view/:checklistID",
  props: true,
  component: () => import("../views/checklist/Checklist.vue"),
};

export const AllGroupRoute = <const>{
  name: "group-all",
  path: "/checklist/group/all",
  component: () => import("../views/group/AllGroup.vue"),
};

export const GroupRoute = <const>{
  name: "group",
  path: "/checklist/group/view/:groupID",
  props: true,
  component: () => import("../views/group/Group.vue"),
};

export const GroupChecklistPickerRoute = <const>{
  name: "group-picker",
  path: "/checklist/group/picker/:groupID",
  props: true,
  component: () => import("../views/group/GroupChecklistPicker.vue"),
};

export const BackupRoute = <const>{
  name: "backup",
  path: "/backup",
  component: () => import("../views/Backup.vue"),
};

export const ImportRoute = <const>{
  name: "import",
  path: "/import",
  component: () => import("../views/Import.vue"),
};

export const SettingsRoute = <const>{
  name: "settings",
  path: "/settings",
  component: () => import("../views/core/Settings.vue"),
};

import { lazy } from "solid-js";

export default [
  {
    path: "/checklist/:checklistID",
    component: lazy(() => import("./views/Checklist")),
  },
  // {
  //   path: "/users/:id",
  //   component: lazy(() => import("/pages/users/[id].js")),
  //   children: [
  //     {
  //       path: "/",
  //       component: lazy(() => import("/pages/users/[id]/index.js")),
  //     },
  //     {
  //       path: "/settings",
  //       component: lazy(() => import("/pages/users/[id]/settings.js")),
  //     },
  //     {
  //       path: "/*all",
  //       component: lazy(() => import("/pages/users/[id]/[...all].js")),
  //     },
  //   ],
  // },
  // {
  //   path: "/",
  //   component: lazy(() => import("/pages/index.js")),
  // },
  // {
  //   path: "/*all",
  //   component: lazy(() => import("/pages/[...all].js")),
  // },
];

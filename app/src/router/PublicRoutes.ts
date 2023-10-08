import type { RouteLocationNormalized } from "vue-router";

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

export const FeedbackRoute = <const>{
  name: "feedback",
  path: "/feedback/:formID",
  props: (route: RouteLocationNormalized) => ({
    ...route.params,
    ...route.query,
  }),
  component: () => import("../views/Feedback/Feedback.vue"),
};

export const FeedbackSubmittedRoute = <const>{
  name: "feedback-submitted",
  path: "/feedback-submitted",
  component: () => import("../views/Feedback/Submitted.vue"),
};
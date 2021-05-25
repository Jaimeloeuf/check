// Import AuthType Enum
import AuthType from "./AuthType";

/**
 * @notice
 * Routes uses lazily loaded components with route level code-splitting
 * this generates a separate chunk (about.[hash].js) for this route
 * which is lazy-loaded when the route is visited.
 */
const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: { Auth_requirements: AuthType.private },
  },
  {
    path: "/report/:num",
    props: true,
    name: "report",
    component: () => import("@/views/Report.vue"),
    meta: { Auth_requirements: AuthType.private },
  },
  {
    path: "/search/:num",
    props: true,
    name: "search",
    component: () => import("@/views/Search.vue"),
    meta: { Auth_requirements: AuthType.private },
  },
];

export default routes;

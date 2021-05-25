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
    path: "/",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: { Auth_requirements: AuthType.public_only },
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   component: () => import("../views/About.vue"),
  //   meta: { Auth_requirements: AuthType.public },
  // },
  // {
  //   path: "/terms-conditions",
  //   name: "terms-conditions",
  //   component: () => import("../views/TermsConditions.vue"),
  //   meta: { Auth_requirements: AuthType.public },
  // },
];

export default routes;

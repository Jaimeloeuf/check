// Default options are marked with *
// const def = {
//   method: "POST",
//   cache: "no-cache",
//   credentials: "same-origin", // include, *same-origin, omit
//   referrerPolicy: "no-referrer", // no-referrer, *client
//   headers: { "Content-Type": "application/json" },
// };

/**
 * Only returns authentication header if user is authenticated.
 * Split out so if user is unauthenticated, this does not throw if currenUser is null
 * @function getAuthHeader
 * @param {function} [firebaseAuth] Firebase auth method
 * @returns {String} Authentication header or nothing.
 */
export async function getAuthHeader(firebaseAuth) {
  if (firebaseAuth().currentUser)
    return `Bearer ${await firebaseAuth().currentUser.getIdToken()}`;
}

export async function ffetch(url, options = {}, body) {
  if (typeof options === "function") options = options();
  return fetch(url, {
    // Default options included and can be overwritten by given options object
    ...options,
    body: body && typeof body === "object" ? JSON.stringify(body) : body,
  });
}

// const response = await ffetch(
//   "http://localhost:3000/report",
//   // {
//   //   method: "POST",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //     Authorization: await getAuthHeader(firebase.auth),
//   //   },
//   // },
//   async () => ({
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: await getAuthHeader(firebase.auth),
//     },
//   }),
//   { num: this.num, reason: this.reason }
// ).then((response) => response.json());

/* 
  for obj types
  false  undefined  value
  (false && undefined) || value
  
  use logical XOR
  
  for fn types
  true  obj  value
  true  obj  value

  
  // No matter what happens, this will always evalute to a 0
  (!fnCheck ^ !varSetting) || value
  
*/
// Default options included and can be overwritten by given options object
export const ffetch_ = async (url, options = {}, body = {}) =>
  (typeof options === "function" ? !(options = await options()) : false) ||
  fetch(url, {
    ...options,
    body: body && typeof body === "object" ? JSON.stringify(body) : body,
  });

// Functional, Curried, Fetch
export const fcfetch = async (url) => async (opts = {}) => async (body = {}) =>
  ffetch(url, opts, body);

// If the option is a function to run, then run it and set the key with its return value
// Object.keys(options).forEach((key) => {
//   if (typeof options[key] === "function") options[key] = options[key]();
// });
// Object.keys(options).forEach(
//   (key) =>
//     typeof options[key] === "function" && (options[key] = options[key]())
// );
// for (const key in options)
//   if (typeof options[key] === "function") options[key] = options[key]();
// for (const key in options)
//   typeof options[key] === "function" && (options[key] = options[key]());

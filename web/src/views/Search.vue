<template>
  <div style="text-align: left">
    <!-- Include the side nav bar component -->

    <!-- Show full screen loader before search result is loaded -->
    <loader v-if="searching" />

    <!-- Search results -->
    <div v-else class="cloumns">
      <div class="column mx-4 mt-4 pb-0">Number: {{ num }}</div>

      <div v-if="search_result.reported" class="column">
        <div class="columns">
          <div class="column mx-4 pb-0">
            Reported: <b>{{ search_result.reported }}</b> times
          </div>

          <div class="column content">
            <div style="padding-left: 1em; font-weight: bold">
              Recent Reasons:
            </div>
            <!-- @todo Remove the fixed view height -->
            <div style="height: 50vh; overflow-y: scroll">
              <ol>
                <li
                  class="content"
                  v-for="(reason, i) in search_result.reasons"
                  :key="i"
                >
                  {{ reason }}
                </li>
              </ol>
            </div>
          </div>

          <!-- Button to report currently searched number, at the bottom center of screen -->
          <!-- @todo Remove the fixed position and use bulma columns force bottom class -->
          <div
            class="column"
            style="
              position: absolute;
              bottom: 2em;
              right: 0;
              left: 0;
              margin: 1em;
            "
          >
            <div class="columns">
              <div class="column">
                <router-link
                  :to="{ name: 'report', params: { num: this.num } }"
                  class="button is-fullwidth is-light is-danger"
                >
                  report this number
                </router-link>
              </div>
              <div class="column">
                <router-link
                  :to="{ name: 'home' }"
                  class="button is-fullwidth is-light is-success"
                >
                  back
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card to show when the number has not reported before -->
      <!-- Setting height to 90vh to give space to number on top, if 100vh here then it will be scrollable (we dont want that) -->
      <div v-else class="column center" style="height: 90vh">
        <div class="card">
          <div class="card-content">
            <p class="title">
              Great news, this number has not been reported before!
            </p>

            <p class="subtitle pt-4">- Bad Numbers Team</p>
          </div>

          <footer class="card-footer">
            <span class="card-footer-item">
              <router-link
                :to="{ name: 'report', params: { num: this.num } }"
                style="color: pink"
              >
                Report this number
              </router-link>
            </span>

            <span class="card-footer-item">
              <router-link :to="{ name: 'home' }" style="color: green">
                Go Back
              </router-link>
            </span>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loader from "./Loader";
import firebase from "firebase/app";
import { ffetch, getAuthHeader } from "../utils/fetch";

export default {
  name: "search",

  components: { loader },

  props: ["num"],

  data() {
    return {
      // Variable used to track if search result is loaded
      searching: true,

      search_result: {
        // 0 because, this will be the number of times it has been reported, and 0 represents not reported before which will be the default
        // Actually change to something to else to show a loading screen? With CSS preferably
        reported: 0,
      },
    };
  },

  // Run search method on component creation
  created() {
    this.search();
  },

  methods: {
    async search() {
      // If have additional validation, make it into a utils module and import to reuse since report view will also need
      // HTML form validation will have already taken care of this
      // if (!/[+][0-9]+/.test(this.num)) return;

      try {
        const response = await ffetch(
          process.env.NODE_ENV === "production"
            ? `https://api-dw64m6z4wq-uc.a.run.app/search/${this.num}`
            : `http://localhost:3000/search/${this.num}`,
          {
            method: "GET",
            headers: { Authorization: await getAuthHeader(firebase.auth) },
          }
        ).then((response) => response.json());

        if (!response.ok) throw new Error(response.error);

        // Set response onto search_result obj of this vue component for auto UI update
        this.search_result = response;

        // Remove loader once search result is received
        this.searching = false;
      } catch (error) {
        this.searching = false;
        console.error(error);
        alert("Something went wrong!");
      }
    },
  },
};
</script>

<template>
  <div class="center">
    <!-- Show full screen loader while waiting for number to be reported -->
    <loader v-if="reporting" />

    <div v-else class="columns">
      <!-- Include the side nav bar component -->

      <!-- <div class="column">Number: {{ num }}</div> -->
      <div class="column mx-4 mt-4 pb-0">Number: {{ num }}</div>

      <div
        class="column dropdown mx-4"
        :class="{ 'is-active': showDropDown }"
        @click="showDropDown = !showDropDown"
      >
        <div class="dropdown-trigger">
          <button
            class="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            style="width: 100%"
          >
            <span>{{ reason }} </span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div
          class="dropdown-menu"
          id="dropdown-menu"
          role="menu"
          style="width: 100%"
        >
          <div class="dropdown-content">
            <div
              v-for="(defaultReason, i) in defaultReasons"
              :key="i"
              class="dropdown-item"
              @click="reason = defaultReason"
            >
              {{ defaultReason }}
            </div>

            <hr class="dropdown-divider" />
            <div class="dropdown-item" @click="reason = 'Something else'">
              Something else
            </div>
          </div>
        </div>
      </div>

      <!-- Textarea (120 characters) for user to enter a none default reason -->
      <div class="column mx-4" v-if="reason === 'Something else'">
        <textarea
          v-model="customReason"
          class="textarea"
          placeholder="Your Reason (MAX 120 characters)"
          maxlength="120"
          style="resize: none"
        />
      </div>

      <label class="column mx-4">
        <input type="checkbox" v-model="terms_and_conditions" />
        I agree to the
        <a target="_blank" href="#/ ">terms and conditions</a>
      </label>

      <!-- Column wrapper to give a bit of margin around the button -->
      <div class="column mx-4">
        <router-link
          :to="{ name: 'home' }"
          class="button is-light is-fullwidth"
        >
          back
        </router-link>
      </div>

      <!-- Column wrapper to give a bit of margin around the button -->
      <div class="column mx-4">
        <button
          class="button is-light is-danger is-outlined is-medium is-fullwidth"
          @click="report"
        >
          report
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import loader from "./Loader";
import firebase from "firebase/app";
import { ffetch, getAuthHeader } from "../utils/fetch";

export default {
  name: "report",

  components: { loader },

  props: ["num"],

  data() {
    return {
      // Variable used to track if number is being reported using the API to show the loader
      reporting: false,

      // Bool to control drop down menu for reasons
      showDropDown: false,

      reason: "--- Why is this number bad? ---",

      defaultReasons: [
        "Scam Call",
        "Scam Message",
        "Spam Call",
        "Spam Message",
        "telemarketing",
      ],

      customReason: "",

      terms_and_conditions: false,
    };
  },

  methods: {
    async report() {
      if (!this.terms_and_conditions)
        return alert("Please agree to the terms and conditions first!");

      if (this.reason === "--- Why is this number bad? ---")
        return alert("Please select a reason for reporting!");

      if (this.reason === "Something else" && this.customReason === "")
        return alert("Please enter a reason for reporting!");

      // If there is a custom reason, set it to be the reason
      if (this.reason === "Something else") this.reason = this.customReason;

      // Remove all spaces in phone number
      const phoneNumber = this.num.replace(" ", "");

      // Get the current user's phone number
      const userNumber = firebase.auth().currentUser.phoneNumber;

      if (phoneNumber === userNumber) {
        alert("Hmm why are you reporting yourself 🤔 ?!?");
        return this.$router.push({ name: "home" });
      }

      // HTML form validation will have already taken care of this
      // if (!/[+][0-9]+/.test(phoneNumber)) return;

      // Show loader once validation is completed and before calling the API
      this.reporting = true;

      try {
        const response = await ffetch(
          process.env.NODE_ENV === "production"
            ? "https://api-dw64m6z4wq-uc.a.run.app/report"
            : "http://localhost:3000/report",

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: await getAuthHeader(firebase.auth),
            },
          },
          {
            num: phoneNumber,
            by: userNumber,
            reason: this.reason,
          }
        ).then((response) => response.json());

        if (!response.ok) throw new Error(response.error);

        // Update user and Return to home screen once number has been reported
        alert("Number has been reported!");
        this.$router.push({ name: "home" });
      } catch (error) {
        this.reporting = false;
        console.error(error);

        // If the error is because user attempted to report the same number more than once, then inform them and redirect home
        if (error.message === "Cannot report same number more than once!") {
          alert(error.message);
          this.$router.push({ name: "home" });
        } else alert("Something went wrong:\n" + error.message);
      }
    },
  },
};
</script>

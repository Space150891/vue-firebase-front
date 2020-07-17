<template>
  <div class="h-screen flex justify-center al items-center">
    <div class>
      <div class="mb-6">
        <p class="text-gray-500 text-md font-bold mr-2">List of users</p>
      </div>

      <div
        class="max-w-sm rounded bg-white overflow-y-auto shadow-lg mr-6"
        v-bind:style="{ height: '513px', width: '500px'}"
      >
        <div v-for="(item, index) in users" :key="item.id" class="px-6 py-4">
          <p class="text-black-700 text-md font-bold">User: {{users.length - index}}</p>
          <ul>
            <li class="text-gray-700 text-sm font-bold">
              First name:
              <p class="inline-block text-green-600">{{ item.firstName }}</p>
            </li>
            <li class="text-gray-700 text-sm font-bold">
              Second name:
              <p class="inline-block text-green-600">{{ item.secondName }}</p>
            </li>
            <li class="text-gray-700 text-sm font-bold">
              User name:
              <p class="inline-block text-green-600">{{ item.userName }}</p>
            </li>
            <li class="text-gray-700 text-sm font-bold">
              Email:
              <p class="inline-block text-green-600">{{ item.email }}</p>
            </li>
            <li class="text-gray-700 text-sm font-bold">
              City:
              <p class="inline-block text-green-600">{{ item.city }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="w-full max-w-md">
      <div class="flex mb-6">
        <p class="text-gray-500 text-md font-bold mr-2">Form completion percentage:</p>
        <p class="text-black-500 text-md font-bold"></p>
      </div>

      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8" @submit.prevent="submitHandler">
        <div class="mb-4 flex justify-between">
          <div class="mr-5 w-full">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">First Name</label>
            <input
              @blur="onBlur"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              v-model.trim="firstName"
              :class="{'border-red-500': !$v.firstName.required}"
              placeholder="Jane"
            />
            <p
              class="text-red-500 text-xs italic mt-2"
              v-if="!$v.firstName.required"
            >Please fill out this field.</p>
          </div>
          <div class="w-full">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="secondName">Second Name</label>
            <input
              @blur="onBlur"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="secondName"
              type="text"
              v-model.trim="secondName"
              :class="{'border-red-500': !$v.secondName.required}"
              placeholder="Doe"
            />
            <p
              class="text-red-500 text-xs italic mt-2"
              v-if="!$v.secondName.required"
            >Please fill out this field.</p>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="userName">Username</label>
          <input
            @blur="onBlur"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userName"
            type="text"
            v-model.trim="userName"
            :class="{'border-red-500': !$v.userName.required}"
            placeholder="Username"
          />
          <p
            class="text-red-500 text-xs italic mt-2"
            v-if="!$v.userName.required"
          >Please fill out this field.</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
          <input
            @blur="onBlur"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            v-model.trim="email"
            :class="{'border-red-500': (!$v.email.required) || (!$v.email.email)}"
            placeholder="example@example.com"
          />
          <p
            class="text-red-500 text-xs italic mt-2"
            v-if="!$v.email.required"
          >Please fill out this field.</p>
          <p
            class="text-red-500 text-xs italic mt-2"
            v-else-if="!$v.email.email"
          >Please enter the correct email.</p>
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="city">City</label>
          <input
            @blur="onBlur"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="city"
            v-model.trim="city"
            :class="{'border-red-500': !$v.city.required}"
            placeholder="Alabama"
          />
          <p
            class="text-red-500 text-xs italic mt-2"
            v-if="!$v.city.required"
          >Please fill out this field.</p>
        </div>
        <div class="flex items-center justify-between mt-6">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >Got to New User</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";
import { postUser, updateUser } from "../user-service";

export default {
  name: "Home",
  data: () => ({
    firstName: "",
    secondName: "",
    userName: "",
    email: "",
    city: "",
    users: []
  }),
  validations: {
    firstName: { required },
    secondName: { required },
    userName: { required },
    email: { email, required },
    city: { required }
  },
  methods: {
    async postApp(formData) {
      const res = await postUser(formData);
      this.$store.commit("setUserId", res.id);
    },
    async getData() {
      await this.$store.dispatch("fetchUsers");
      
      const us = { ...this.$store.getters.usersList };
      const dateCreated = [];
      const objUsers = [];

      for (const key in us) {
        dateCreated.push(us[key].dateCreated);
      }

      dateCreated.sort().reverse().map((item, index) => {
        for (const key in us) {
          if (item === us[key].dateCreated) {
            objUsers.push(us[key]);
          }
        }
      });

      this.users = objUsers;
    },
    onBlur(e) {
      const formData = {
        firstName: this.firstName,
        secondName: this.secondName,
        userName: this.userName,
        email: this.email,
        city: this.city,
        dateCreated: Date.now()
      };

      const sendMessage = async () => {
        try {
          if (this.$store.getters.user.id === "") {
            this.postApp(formData);
          } else {
            updateUser(this.$store.getters.user.id, formData);
          }
        } catch (error) {
          console.log(error);
        }
      };

      if (!this.$v.email.email) {
        formData.email = "";

        sendMessage();
        this.$v.$touch();
      } else {
        sendMessage();
      }

      setTimeout(async () => {
        this.getData();
      }, 200);
    },
    submitHandler() {
      this.$store.commit("setUserId", "");

      this.firstName = "";
      this.secondName = "";
      this.userName = "";
      this.email = "";
      this.city = "";
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

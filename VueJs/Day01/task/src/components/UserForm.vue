<template>
  <div>
    <h2>Create Person</h2>

    <form @submit.prevent="submit">
      <input v-model="name" placeholder="Name" type="text" required />
      <input v-model="email" placeholder="Email" type="email" required />
      <input v-model="password" placeholder="Password" type="text" required />

      <label>
        <input type="radio" value="user" v-model="role" />
        User
      </label>
      <label>
        <input type="radio" value="admin" v-model="role" />
        Admin
      </label>

      <button>Add</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      role: "user",
    };
  },

  methods: {
    submit() {
      let person = {
        id: Date.now(),
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
      };

      this.$emit("addPerson", person);
      this.name = "";
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
}

input {
  padding: 10px;
}

button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>

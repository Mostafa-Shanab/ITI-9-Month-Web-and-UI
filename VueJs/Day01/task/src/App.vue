<template>
  <div :class="{ dark: dark }">
    <header>
      <button @click="page = 'form'">Form</button>
      <button @click="page = 'users'">Users</button>
      <button @click="page = 'admins'">Admins</button>
      <button @click="changeTheme">Change Theme</button>
    </header>

    <main>
      <UserForm v-if="page === 'form'" @addPerson="addPerson" />
      <UsersTable
        v-if="page === 'users'"
        :users="users"
        @deleteUser="deleteUser"
      />
      <AdminsTable
        v-if="page === 'admins'"
        :admins="admins"
        @deleteAdmin="deleteAdmin"
      />
    </main>
  </div>
</template>

<script>
import UserForm from "./components/UserForm.vue";
import UsersTable from "./components/UsersTable.vue";
import AdminsTable from "./components/AdminsTable.vue";

export default {
  components: {
    UserForm,
    UsersTable,
    AdminsTable,
  },

  data() {
    return {
      users: [],
      admins: [],
      page: "form",
      dark: false,
    };
  },

  methods: {
    addPerson(person) {
      if (person.role === "user") {
        this.users.push(person);
      } else {
        this.admins.push(person);
      }
    },

    deleteUser(id) {
      this.users = this.users.filter((user) => user.id !== id);
    },

    deleteAdmin(id) {
      this.admins = this.admins.filter((admin) => admin.id !== id);
    },

    changeTheme() {
      this.dark = !this.dark;
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  gap: 20px;
  padding-block: 30px;
  justify-content: center;
}

button {
  padding: 10px 20px;
  cursor: pointer;
}

.dark {
  background: #222;

  color: white;

  min-height: 100vh;
}
</style>

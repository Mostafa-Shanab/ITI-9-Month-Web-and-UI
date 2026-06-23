<template>
  <div>
    <h2>Admins</h2>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="admin in admins" :key="admin.id">
          <td>
            {{ admin.name }}
          </td>
          <td>
            {{ admin.email }}
          </td>
          <td>
            <button @click="$emit('deleteAdmin', admin.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    admins: Array,
  },
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

table {
  border-collapse: collapse;
  width: 500px;
}

td,
th {
  border: 1px solid black;
  padding: 10px;
}
</style>

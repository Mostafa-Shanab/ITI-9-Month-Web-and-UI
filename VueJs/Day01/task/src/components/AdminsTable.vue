<template>
  <div class="table-wrapper">
    <div class="table-card">
      <div class="table-header">
        <div class="table-title-group">
          <h2 class="table-title">Admins</h2>
          <span class="badge" :style="{ background: theme.accent }">{{
            admins.length
          }}</span>
        </div>
      </div>

      <div v-if="admins.length === 0" class="empty-state">
        <p>No admins yet. Add one from the form!</p>
      </div>

      <table v-else class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(admin, index) in admins"
            :key="admin.id"
            class="table-row"
          >
            <td class="row-num">{{ index + 1 }}</td>
            <td class="name-cell">
              <span class="avatar" :style="{ background: theme.accent }">
                {{ admin.name.charAt(0).toUpperCase() }}
              </span>
              {{ admin.name }}
            </td>
            <td class="email-cell">{{ admin.email }}</td>
            <td>
              <button
                class="delete-btn"
                @click="$emit('deleteAdmin', admin.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    admins: Array,
    theme: Object,
  },
};
</script>

<style scoped>
.table-wrapper {
  display: flex;
  justify-content: center;
}

.table-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.table-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}

.table-title-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.table-icon {
  font-size: 1.1rem;
}

.table-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
}

.badge {
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
}

/* Empty */
.empty-state {
  padding: 60px 24px;
  text-align: center;
  color: var(--muted);
}

.empty-icon {
  display: block;
  font-size: 2.5rem;
  margin-bottom: 12px;
}

/* Table */
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead th {
  padding: 12px 20px;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--muted);
  background: var(--bg);
  text-align: left;
}

.data-table tbody .table-row {
  border-top: 1px solid var(--border);
  transition: background 0.15s ease;
}

.data-table tbody .table-row:nth-child(even) {
  background: var(--row-alt);
}

.data-table tbody .table-row:hover {
  background: var(--card);
}

.data-table td {
  padding: 14px 20px;
  font-size: 0.9rem;
  color: var(--text);
}

.row-num {
  color: var(--muted);
  font-size: 0.8rem;
  width: 36px;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.email-cell {
  color: var(--muted);
}

.delete-btn {
  padding: 6px 14px;
  border: 1px solid var(--danger);
  border-radius: 6px;
  background: transparent;
  color: var(--danger);
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background: var(--danger);
  color: #fff;
}
</style>

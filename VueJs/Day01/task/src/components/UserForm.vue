<template>
  <div class="form-wrapper">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Create Person</h2>
        <p class="card-subtitle">
          Fill in the details below to add a new member
        </p>
      </div>

      <form @submit.prevent="submit" class="form">
        <div class="field">
          <label class="field-label">Full Name</label>
          <input
            v-model="name"
            placeholder="e.g. Mostafa Shanab"
            type="text"
            required
            class="field-input"
          />
        </div>

        <div class="field">
          <label class="field-label">Email Address</label>
          <input
            v-model="email"
            placeholder="e.g. shanab@example.com"
            type="email"
            required
            class="field-input"
          />
        </div>

        <div class="field">
          <label class="field-label">Password</label>
          <input
            v-model="password"
            placeholder="Enter password"
            type="text"
            required
            class="field-input"
          />
        </div>

        <div class="field">
          <label class="field-label">Role</label>
          <div class="radio-group">
            <label class="radio-card" :class="{ selected: role === 'user' }">
              <input type="radio" value="user" v-model="role" />
              <span class="radio-label">User</span>
            </label>
            <label class="radio-card" :class="{ selected: role === 'admin' }">
              <input type="radio" value="admin" v-model="role" />
              <span class="radio-label">Admin</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          class="submit-btn"
          :style="{ background: theme.accent }"
        >
          Add Person
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    theme: Object,
  },
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
      const person = {
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
.form-wrapper {
  display: flex;
  justify-content: center;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 36px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.card-header {
  text-align: center;
  margin-bottom: 32px;
}

.card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  font-size: 1.4rem;
  color: #fff;
  margin-bottom: 14px;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 6px;
}

.card-subtitle {
  font-size: 0.85rem;
  color: var(--muted);
}

/* Fields */
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.field-input {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 11px 14px;
  color: var(--text);
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field-input::placeholder {
  color: var(--muted);
  opacity: 0.6;
}

.field-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(var(--accent), 0.15);
}

/* Radio */
.radio-group {
  display: flex;
  gap: 12px;
}

.radio-card {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: 2px solid var(--border);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 500;
  user-select: none;
}

.radio-card input[type="radio"] {
  display: none;
}

.radio-card:hover {
  border-color: var(--accent);
  color: var(--text);
}

.radio-card.selected {
  border-color: var(--accent);
  background: var(--card);
  color: var(--accent);
}

.radio-icon {
  font-size: 0.8rem;
}

/* Submit */
.submit-btn {
  padding: 13px;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 6px;
  transition: opacity 0.2s ease, transform 0.1s ease;
}

.submit-btn:hover {
  opacity: 0.88;
}
.submit-btn:active {
  transform: scale(0.98);
}
</style>

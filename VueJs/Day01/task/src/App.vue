<template>
  <div :class="['app-wrapper', themes[themeIndex].class]">
    <header class="navbar">
      <div class="brand">
        <span class="brand-icon"></span>
        <span class="brand-name">Shanab</span>
      </div>

      <nav class="nav-links">
        <button
          v-for="(btn, i) in navButtons"
          :key="i"
          :class="['nav-btn', { active: page === btn.page }]"
          @click="page = btn.page"
        >
          {{ btn.label }}
        </button>
      </nav>

      <button class="theme-btn" @click="changeTheme" :title="'Switch theme'">
        <span class="theme-pill">
          {{ themes[themeIndex].name }}
          <span class="theme-dot"></span>
        </span>
      </button>
    </header>

    <main class="main-content">
      <transition name="fade" mode="out-in">
        <UserForm
          v-if="page === 'form'"
          @addPerson="addPerson"
          :theme="themes[themeIndex]"
        />
        <UsersTable
          v-else-if="page === 'users'"
          :users="users"
          @deleteUser="deleteUser"
          :theme="themes[themeIndex]"
        />
        <AdminsTable
          v-else-if="page === 'admins'"
          :admins="admins"
          @deleteAdmin="deleteAdmin"
          :theme="themes[themeIndex]"
        />
      </transition>
    </main>
  </div>
</template>

<script>
import UserForm from "./components/UserForm.vue";
import UsersTable from "./components/UsersTable.vue";
import AdminsTable from "./components/AdminsTable.vue";

export default {
  components: { UserForm, UsersTable, AdminsTable },

  data() {
    return {
      users: [],
      admins: [],
      page: "form",
      themeIndex: 0,
      themes: [
        {
          name: "Ocean",
          class: "theme-ocean",
          accent: "#3b82f6",
          badge: "#0ea5e9",
        },
        {
          name: "Sunset",
          class: "theme-sunset",
          accent: "#f97316",
          badge: "#ec4899",
        },
        {
          name: "Forest",
          class: "theme-forest",
          accent: "#10b981",
          badge: "#6ee7b7",
        },
        {
          name: "Violet",
          class: "theme-violet",
          accent: "#8b5cf6",
          badge: "#c084fc",
        },
        {
          name: "Slate",
          class: "theme-slate",
          accent: "#64748b",
          badge: "#94a3b8",
        },
      ],
      navButtons: [
        { label: "Add Person", page: "form" },
        { label: "Users", page: "users" },
        { label: "Admins", page: "admins" },
      ],
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
      this.users = this.users.filter((u) => u.id !== id);
    },
    deleteAdmin(id) {
      this.admins = this.admins.filter((a) => a.id !== id);
    },
    changeTheme() {
      this.themeIndex = (this.themeIndex + 1) % this.themes.length;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Inter", sans-serif;
}

/* ── Theme tokens ── */
.theme-ocean {
  --bg: #0f172a;
  --surface: #1e293b;
  --card: #1e3a5f;
  --accent: #3b82f6;
  --accent2: #0ea5e9;
  --text: #f1f5f9;
  --muted: #94a3b8;
  --border: #334155;
  --danger: #ef4444;
  --row-alt: #1a3350;
}

.theme-sunset {
  --bg: #1c0a00;
  --surface: #2d1200;
  --card: #3d1f0a;
  --accent: #f97316;
  --accent2: #ec4899;
  --text: #fff7ed;
  --muted: #fcd9b0;
  --border: #7c2d12;
  --danger: #dc2626;
  --row-alt: #351708;
}

.theme-forest {
  --bg: #052e16;
  --surface: #14532d;
  --card: #166534;
  --accent: #10b981;
  --accent2: #6ee7b7;
  --text: #f0fdf4;
  --muted: #86efac;
  --border: #166534;
  --danger: #f87171;
  --row-alt: #0f4424;
}

.theme-violet {
  --bg: #0d0a1e;
  --surface: #1e1b4b;
  --card: #2e1b5e;
  --accent: #8b5cf6;
  --accent2: #c084fc;
  --text: #f5f3ff;
  --muted: #c4b5fd;
  --border: #4c1d95;
  --danger: #f87171;
  --row-alt: #251748;
}

.theme-slate {
  --bg: #0f0f0f;
  --surface: #1a1a2e;
  --card: #16213e;
  --accent: #64748b;
  --accent2: #94a3b8;
  --text: #e2e8f0;
  --muted: #94a3b8;
  --border: #334155;
  --danger: #f87171;
  --row-alt: #111827;
}

/* ── Layout ── */
.app-wrapper {
  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text);
  transition: background-color 0.4s ease, color 0.4s ease;
}

/* ── Navbar ── */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
  font-weight: 700;
  white-space: nowrap;
  color: var(--accent);
}

.brand-icon {
  font-size: 1.4rem;
}

.nav-links {
  display: flex;
  gap: 6px;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--muted);
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background: var(--card);
  color: var(--text);
  border-color: var(--border);
}

.nav-btn.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

.nav-icon {
  font-size: 0.75rem;
}

/* ── Theme button ── */
.theme-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
}

.theme-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.theme-pill:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.theme-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent);
  display: inline-block;
  flex-shrink: 0;
}

/* ── Main ── */
.main-content {
  padding: 40px 24px;
  max-width: 720px;
  margin: 0 auto;
}

/* ── Page transitions ── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>

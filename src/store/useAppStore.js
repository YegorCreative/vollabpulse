import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockCampaigns, mockCreators, mockNotifications } from '../data/mockData'

export const useAppStore = create(
  persist(
    (set) => ({
      // Auth
      isAuthenticated: false,
      user: null,
      login: (userData) => set({ isAuthenticated: true, user: userData }),
      logout: () => set({ isAuthenticated: false, user: null }),

      // Sidebar
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      // Campaigns
      campaigns: mockCampaigns,
      addCampaign: (campaign) =>
        set((state) => ({
          campaigns: [{ ...campaign, id: Date.now(), createdAt: new Date().toISOString(), participation: 0, confirmedCreators: 0, creatorIds: [] }, ...state.campaigns],
        })),
      updateCampaign: (id, updates) =>
        set((state) => ({
          campaigns: state.campaigns.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        })),

      // Creators
      creators: mockCreators,

      // Notifications
      notifications: mockNotifications,
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        })),
      markAllRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      // UI
      activeModal: null,
      openModal: (modal) => set({ activeModal: modal }),
      closeModal: () => set({ activeModal: null }),
    }),
    {
      name: 'vollabpulse-v1',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
)

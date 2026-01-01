import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Phone } from '@/data/phones';

interface CompareStore {
  selectedPhones: Phone[];
  addPhone: (phone: Phone) => void;
  removePhone: (phoneId: string) => void;
  clearAll: () => void;
  isSelected: (phoneId: string) => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      selectedPhones: [],
      addPhone: (phone) => {
        const current = get().selectedPhones;
        if (current.length < 4 && !current.find((p) => p.id === phone.id)) {
          set({ selectedPhones: [...current, phone] });
        }
      },
      removePhone: (phoneId) => {
        set({ selectedPhones: get().selectedPhones.filter((p) => p.id !== phoneId) });
      },
      clearAll: () => {
        set({ selectedPhones: [] });
      },
      isSelected: (phoneId) => {
        return get().selectedPhones.some((p) => p.id === phoneId);
      },
    }),
    {
      name: 'phone-compare-storage',
    }
  )
);

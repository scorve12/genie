'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Coffee } from '@/types/coffee';
import BeanForm from './BeanForm';

interface EditBeanModalProps {
  isOpen: boolean;
  bean: Coffee | null;
  onSubmit: (data: Coffee) => Promise<void>;
  onClose: () => void;
  isSubmitting: boolean;
}

export default function EditBeanModal({
  isOpen,
  bean,
  onSubmit,
  onClose,
  isSubmitting,
}: EditBeanModalProps) {
  if (!bean) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <DialogPanel className="mx-auto w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl my-8">
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            원두 수정
          </DialogTitle>

          <BeanForm
            initialData={bean}
            onSubmit={onSubmit}
            onCancel={onClose}
            isSubmitting={isSubmitting}
          />
        </DialogPanel>
      </div>
    </Dialog>
  );
}

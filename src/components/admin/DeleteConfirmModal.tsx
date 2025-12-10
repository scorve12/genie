'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import Button from '@/components/ui/Button';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  beanName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  beanName,
  onConfirm,
  onCancel,
  isDeleting,
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={isOpen} onClose={onCancel} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-md rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl">
          {/* Warning Icon */}
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20">
            <svg
              className="w-6 h-6 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <DialogTitle className="text-lg font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
            원두 삭제 확인
          </DialogTitle>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {beanName}
            </span>
            을(를) 정말 삭제하시겠습니까?
            <br />
            이 작업은 되돌릴 수 없습니다.
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={onCancel}
              disabled={isDeleting}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              variant="danger"
              onClick={onConfirm}
              isLoading={isDeleting}
              disabled={isDeleting}
              className="flex-1"
            >
              삭제
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

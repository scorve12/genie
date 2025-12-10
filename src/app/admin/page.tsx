'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useBeans } from '@/hooks/useBeans';
import { Coffee } from '@/types/coffee';
import BeanTable from '@/components/admin/BeanTable';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import EditBeanModal from '@/components/admin/EditBeanModal';
import Button from '@/components/ui/Button';

export default function AdminPage() {
  const router = useRouter();
  const { beans, loading, error, removeBean, editBean } = useBeans();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    bean: Coffee | null;
  }>({
    isOpen: false,
    bean: null,
  });
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    bean: Coffee | null;
  }>({
    isOpen: false,
    bean: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  const handleEdit = (bean: Coffee) => {
    setEditModal({ isOpen: true, bean });
  };

  const handleDeleteClick = (bean: Coffee) => {
    setDeleteModal({ isOpen: true, bean });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.bean) return;

    setIsDeleting(true);
    try {
      await removeBean(deleteModal.bean.id);
      showToast('원두가 성공적으로 삭제되었습니다.', 'success');
      setDeleteModal({ isOpen: false, bean: null });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '원두 삭제에 실패했습니다.';
      showToast(errorMessage, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, bean: null });
  };

  const handleEditSubmit = async (data: Coffee) => {
    if (!editModal.bean) return;

    setIsEditing(true);
    try {
      await editBean(editModal.bean.id, data);
      showToast('원두가 성공적으로 수정되었습니다.', 'success');
      setEditModal({ isOpen: false, bean: null });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '원두 수정에 실패했습니다.';
      showToast(errorMessage, 'error');
    } finally {
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setEditModal({ isOpen: false, bean: null });
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">원두 관리</h1>
              <p className="text-amber-100 mt-1">
                원두를 추가, 수정, 삭제할 수 있습니다
              </p>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              onClick={() => router.push('/admin/questions')}
              className="bg-white text-amber-600 hover:bg-amber-50"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              설문 관리
            </Button>
            <Button
              onClick={() => router.push('/admin/new')}
              className="bg-white text-amber-600 hover:bg-amber-50"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              새 원두 추가
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                로딩 중...
              </p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                에러 발생
              </h3>
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            </div>
          ) : (
            <div className="p-6">
              <BeanTable
                beans={beans}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        beanName={deleteModal.bean?.name || ''}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isDeleting={isDeleting}
      />

      {/* Edit Bean Modal */}
      <EditBeanModal
        isOpen={editModal.isOpen}
        bean={editModal.bean}
        onSubmit={handleEditSubmit}
        onClose={handleEditCancel}
        isSubmitting={isEditing}
      />

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
          <div
            className={`rounded-lg shadow-lg p-4 ${
              toast.type === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
              <p className="font-medium">{toast.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

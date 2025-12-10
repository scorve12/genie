'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuestions } from '@/hooks/useQuestions';
import { Question } from '@/types/question';
import QuestionTable from '@/components/admin/QuestionTable';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import EditQuestionModal from '@/components/admin/EditQuestionModal';
import Button from '@/components/ui/Button';

export default function QuestionsPage() {
  const router = useRouter();
  const { questions, loading, error, removeQuestion, editQuestion } =
    useQuestions();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    question: Question | null;
  }>({
    isOpen: false,
    question: null,
  });
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    question: Question | null;
  }>({
    isOpen: false,
    question: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  const handleEdit = (question: Question) => {
    setEditModal({ isOpen: true, question });
  };

  const handleDeleteClick = (question: Question) => {
    setDeleteModal({ isOpen: true, question });
  };

  const handleToggleActive = async (question: Question) => {
    try {
      await editQuestion(question.id, { isActive: !question.isActive });
      showToast(
        `질문이 ${!question.isActive ? '활성화' : '비활성화'}되었습니다.`,
        'success'
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '상태 변경에 실패했습니다.';
      showToast(errorMessage, 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.question) return;

    setIsDeleting(true);
    try {
      await removeQuestion(deleteModal.question.id);
      showToast('질문이 성공적으로 삭제되었습니다.', 'success');
      setDeleteModal({ isOpen: false, question: null });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '질문 삭제에 실패했습니다.';
      showToast(errorMessage, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, question: null });
  };

  const handleEditSubmit = async (data: Question) => {
    if (!editModal.question) return;

    setIsEditing(true);
    try {
      await editQuestion(editModal.question.id, data);
      showToast('질문이 성공적으로 수정되었습니다.', 'success');
      setEditModal({ isOpen: false, question: null });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '질문 수정에 실패했습니다.';
      showToast(errorMessage, 'error');
    } finally {
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setEditModal({ isOpen: false, question: null });
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
              href="/admin"
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
              <h1 className="text-3xl font-bold">설문 질문 관리</h1>
              <p className="text-amber-100 mt-1">
                추천 설문 질문을 추가, 수정, 삭제할 수 있습니다
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => router.push('/admin/questions/new')}
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
              새 질문 추가
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
              <QuestionTable
                questions={questions}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onToggleActive={handleToggleActive}
              />
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        beanName={deleteModal.question?.questionText || ''}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isDeleting={isDeleting}
      />

      {/* Edit Question Modal */}
      <EditQuestionModal
        isOpen={editModal.isOpen}
        question={editModal.question}
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

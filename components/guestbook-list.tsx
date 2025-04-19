"use client";

import { useState } from "react";
import { deleteGuestbookEntry } from "@/actions/guestbook-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface GuestbookListProps {
  entries: Array<{
    id: string;
    name: string;
    message: string;
    createdAt: string;
  }>;
  onDelete: () => void;
}

export default function GuestbookList({
  entries,
  onDelete,
}: GuestbookListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState({
    title: "",
    message: "",
    isError: false,
  });
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const openDeleteDialog = (id: string) => {
    setSelectedEntryId(id);
    setPassword("");
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedEntryId) return;

    setIsDeleting(true);

    const formData = new FormData();
    formData.append("id", selectedEntryId);
    formData.append("password", password);

    try {
      const result = await deleteGuestbookEntry(formData);

      if (result.success) {
        setResultMessage({
          title: "삭제 완료",
          message: result.message,
          isError: false,
        });
        setDeleteDialogOpen(false);
        setResultDialogOpen(true);
        onDelete();
      } else {
        setResultMessage({
          title: "오류",
          message: result.message,
          isError: true,
        });
        setResultDialogOpen(true);
      }
    } catch (error) {
      setResultMessage({
        title: "오류",
        message: "방명록 삭제 중 오류가 발생했습니다.",
        isError: true,
      });
      setResultDialogOpen(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <>
      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>아직 방명록이 없습니다. 첫 번째 메시지를 남겨보세요!</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium">{entry.name}</div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {formatDate(entry.createdAt)}
                  </span>
                  <button
                    onClick={() => openDeleteDialog(entry.id)}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    삭제
                  </button>
                </div>
              </div>
              <p className="text-sm whitespace-pre-line">{entry.message}</p>
            </div>
          ))
        )}
      </div>

      {/* 삭제 비밀번호 입력 Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md !bg-white !rounded-xl !border-0 !shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]">
          <DialogHeader>
            <DialogTitle>방명록 삭제</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm">
              방명록을 삭제하려면 작성 시 입력한 비밀번호를 입력하세요.
            </p>
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl"
              style={{ borderRadius: "12px !important" }}
            />
          </div>
          <DialogFooter className="flex flex-row justify-between gap-2 w-full">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
              className="rounded-xl flex-1"
              style={{ borderRadius: "12px !important" }}
            >
              취소
            </Button>
            <Button
              onClick={handleDelete}
              disabled={!password || isDeleting}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex-1"
              style={{ borderRadius: "12px !important" }}
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 결과 Dialog */}
      <Dialog open={resultDialogOpen} onOpenChange={setResultDialogOpen}>
        <DialogContent className="sm:max-w-md !bg-white !rounded-xl !border-0 !shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]">
          <DialogHeader>
            <DialogTitle
              className={
                resultMessage.isError ? "text-red-500" : "text-[#d4b78f]"
              }
            >
              {resultMessage.title}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>{resultMessage.message}</p>
          </div>
          <DialogFooter className="flex flex-row justify-center w-full">
            <Button
              onClick={() => setResultDialogOpen(false)}
              className={
                resultMessage.isError
                  ? "bg-red-500 hover:bg-red-600 rounded-xl w-full"
                  : "bg-blue-500 hover:bg-blue-600 text-white rounded-xl w-full"
              }
              style={{ borderRadius: "12px !important" }}
            >
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

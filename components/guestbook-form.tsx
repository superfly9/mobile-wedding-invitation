"use client";

import { useState } from "react";
import { addGuestbookEntry } from "@/actions/guestbook-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function GuestbookForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({
    title: "",
    message: "",
    isError: false,
  });

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);

    try {
      const result = await addGuestbookEntry(formData);

      if (result.success) {
        setDialogMessage({
          title: "등록 완료",
          message: result.message,
          isError: false,
        });
        setDialogOpen(true);

        // 폼 초기화
        const form = document.getElementById(
          "guestbook-form"
        ) as HTMLFormElement;
        form.reset();

        // 부모 컴포넌트에 성공 알림
        onSuccess();
      } else {
        setDialogMessage({
          title: "오류",
          message: result.message,
          isError: true,
        });
        setDialogOpen(true);
      }
    } catch (error) {
      setDialogMessage({
        title: "오류",
        message: "방명록 등록 중 오류가 발생했습니다.",
        isError: true,
      });
      setDialogOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form id="guestbook-form" action={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              이름 <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              placeholder="이름을 입력하세요"
              required
              maxLength={10}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              비밀번호 <span className="text-red-500">*</span>
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              required
              maxLength={10}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            메시지 <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="축하 메시지를 남겨주세요"
            required
            maxLength={200}
            rows={4}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? "등록 중..." : "메시지 남기기"}
        </Button>
      </form>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md !bg-white !rounded-xl !border-0 !shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]">
          <DialogHeader>
            <DialogTitle
              className={dialogMessage.isError ? "text-red-500" : "text-black"}
            >
              {dialogMessage.title}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            <p>{dialogMessage.message}</p>
          </div>
          <DialogFooter className="flex flex-row justify-center w-full">
            <Button
              onClick={() => setDialogOpen(false)}
              className={
                dialogMessage.isError
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

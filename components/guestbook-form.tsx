"use client"

import { useState } from "react"
import { addGuestbookEntry } from "@/actions/guestbook-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function GuestbookForm({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      const result = await addGuestbookEntry(formData)

      if (result.success) {
        toast({
          title: "성공",
          description: result.message,
        })

        // 폼 초기화
        const form = document.getElementById("guestbook-form") as HTMLFormElement
        form.reset()

        // 부모 컴포넌트에 성공 알림
        onSuccess()
      } else {
        toast({
          title: "오류",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "오류",
        description: "방명록 등록 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form id="guestbook-form" action={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            이름 <span className="text-red-500">*</span>
          </label>
          <Input id="name" name="name" placeholder="이름을 입력하세요" required maxLength={10} />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            비밀번호 <span className="text-red-500">*</span>
          </label>
          <Input id="password" name="password" type="password" placeholder="비밀번호" required maxLength={10} />
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

      <Button type="submit" className="w-full bg-[#d4b78f] hover:bg-[#c0a57d]" disabled={isSubmitting}>
        {isSubmitting ? "등록 중..." : "메시지 남기기"}
      </Button>
    </form>
  )
}

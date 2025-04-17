"use client"

import { useState } from "react"
import { deleteGuestbookEntry } from "@/actions/guestbook-actions"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface GuestbookListProps {
  entries: Array<{
    id: string
    name: string
    message: string
    createdAt: string
  }>
  onDelete: () => void
}

export default function GuestbookList({ entries, onDelete }: GuestbookListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const openDeleteDialog = (id: string) => {
    setSelectedEntryId(id)
    setPassword("")
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!selectedEntryId) return

    setIsDeleting(true)

    const formData = new FormData()
    formData.append("id", selectedEntryId)
    formData.append("password", password)

    try {
      const result = await deleteGuestbookEntry(formData)

      if (result.success) {
        toast({
          title: "성공",
          description: result.message,
        })
        setDeleteDialogOpen(false)
        onDelete()
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
        description: "방명록 삭제 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`
  }

  return (
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
                <span className="text-xs text-gray-500">{formatDate(entry.createdAt)}</span>
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

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>방명록 삭제</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm">방명록을 삭제하려면 작성 시 입력한 비밀번호를 입력하세요.</p>
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting}>
              취소
            </Button>
            <Button
              onClick={handleDelete}
              disabled={!password || isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { getGuestbookEntries } from "@/actions/guestbook-actions"
import GuestbookForm from "./guestbook-form"
import GuestbookList from "./guestbook-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"

export default function Guestbook() {
  const [entries, setEntries] = useState<
    Array<{
      id: string
      name: string
      message: string
      createdAt: string
    }>
  >([])
  const [loading, setLoading] = useState(true)

  const fetchEntries = async () => {
    setLoading(true)
    try {
      const data = await getGuestbookEntries()
      setEntries(data)
    } catch (error) {
      console.error("방명록 조회 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  return (
    <section className="w-full py-16 px-4">
      <h2 className="text-2xl text-center serif-font mb-12 decorative-line">방명록</h2>

      <div className="max-w-sm mx-auto">
        <Tabs defaultValue="view" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="view">방명록 보기</TabsTrigger>
            <TabsTrigger value="write">메시지 남기기</TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="mt-4">
            {loading ? (
              <div className="text-center py-8">
                <p>방명록을 불러오는 중...</p>
              </div>
            ) : (
              <GuestbookList entries={entries} onDelete={fetchEntries} />
            )}
          </TabsContent>

          <TabsContent value="write" className="mt-4">
            <GuestbookForm onSuccess={fetchEntries} />
          </TabsContent>
        </Tabs>
      </div>

      <Toaster />
    </section>
  )
}

"use server"

import { cookies } from "next/headers"
import type { GuestbookEntry } from "@/types/guestbook"


export async function addGuestbookEntry(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const message = formData.get("message") as string
    const password = formData.get("password") as string

    if (!name || !message || !password) {
      return { success: false, message: "모든 필드를 입력해주세요." }
    }

    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name,
      message,
      password,
      createdAt: new Date().toISOString(),
    }

    // 기존 방명록 데이터 가져오기
    const cookieStore = await cookies()
    const guestbookCookie = await cookieStore.get("guestbook")
    const existingEntries: GuestbookEntry[] = guestbookCookie ? JSON.parse(guestbookCookie.value) : []

    // 새 방명록 추가
    const updatedEntries = [newEntry, ...existingEntries]

    // 쿠키에 저장 (10년 유효기간)
    const tenYearsInSeconds = 60 * 60 * 24 * 365 * 10
    cookieStore.set("guestbook", JSON.stringify(updatedEntries), {
      maxAge: tenYearsInSeconds,
      path: "/",
    })

    return { success: true, message: "방명록이 등록되었습니다." }
  } catch (error) {
    console.error("방명록 등록 오류:", error)
    return { success: false, message: "방명록 등록 중 오류가 발생했습니다." }
  }
}

export async function deleteGuestbookEntry(formData: FormData) {
  try {
    const id = formData.get("id") as string
    const password = formData.get("password") as string

    if (!id || !password) {
      return { success: false, message: "필수 정보가 누락되었습니다." }
    }

    // 기존 방명록 데이터 가져오기
    const cookieStore = await cookies()
    const guestbookCookie = await cookieStore.get("guestbook")

    if (!guestbookCookie) {
      return { success: false, message: "방명록이 존재하지 않습니다." }
    }

    const entries: GuestbookEntry[] = JSON.parse(guestbookCookie.value)

    // 삭제할 항목 찾기
    const entryToDelete = entries.find((entry) => entry.id === id)

    if (!entryToDelete) {
      return { success: false, message: "해당 방명록을 찾을 수 없습니다." }
    }

    // 비밀번호 확인
    if (entryToDelete.password !== password) {
      return { success: false, message: "비밀번호가 일치하지 않습니다." }
    }

    // 방명록 삭제
    const updatedEntries = entries.filter((entry) => entry.id !== id)

    // 쿠키에 저장
    const tenYearsInSeconds = 60 * 60 * 24 * 365 * 10
    cookieStore.set("guestbook", JSON.stringify(updatedEntries), {
      maxAge: tenYearsInSeconds,
      path: "/",
    })

    return { success: true, message: "방명록이 삭제되었습니다." }
  } catch (error) {
    console.error("방명록 삭제 오류:", error)
    return { success: false, message: "방명록 삭제 중 오류가 발생했습니다." }
  }
}

export async function getGuestbookEntries() {
  try {
    const cookieStore = await cookies()
    const guestbookCookie = await cookieStore.get("guestbook")

    if (!guestbookCookie) {
      return []
    }

    const entries: GuestbookEntry[] = JSON.parse(guestbookCookie.value)

    // 비밀번호 정보는 클라이언트에 전송하지 않음
    return entries.map(({ id, name, message, createdAt }) => ({
      id,
      name,
      message,
      createdAt,
    }))
  } catch (error) {
    console.error("방명록 조회 오류:", error)
    return []
  }
}

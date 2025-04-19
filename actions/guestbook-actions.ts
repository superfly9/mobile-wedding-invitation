"use server"

import { supabase, type GuestbookRow, type GuestbookInsert } from '@/lib/supabase'

export async function addGuestbookEntry(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const message = formData.get("message") as string
    const password = formData.get("password") as string

    if (!name || !message || !password) {
      return { success: false, message: "모든 필드를 입력해주세요." }
    }

    const newEntry: GuestbookInsert = {
      name,
      message,
      password,
    }

    // Supabase에 데이터 저장
    const { error } = await supabase
      .from('guestbook')
      .insert([newEntry])

    if (error) {
      console.error("Supabase 저장 오류:", error)
      return { success: false, message: "방명록 등록 중 오류가 발생했습니다." }
    }

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

    // 비밀번호 확인을 위해 해당 항목 조회
    const { data: entry } = await supabase
      .from('guestbook')
      .select('password')
      .eq('id', id)
      .single()

    if (!entry) {
      return { success: false, message: "해당 방명록을 찾을 수 없습니다." }
    }

    // 비밀번호 확인
    if (entry.password !== password) {
      return { success: false, message: "비밀번호가 일치하지 않습니다." }
    }

    // 방명록 삭제
    const { error } = await supabase
      .from('guestbook')
      .delete()
      .eq('id', id)

    if (error) {
      console.error("Supabase 삭제 오류:", error)
      return { success: false, message: "방명록 삭제 중 오류가 발생했습니다." }
    }

    return { success: true, message: "방명록이 삭제되었습니다." }
  } catch (error) {
    console.error("방명록 삭제 오류:", error)
    return { success: false, message: "방명록 삭제 중 오류가 발생했습니다." }
  }
}

export async function getGuestbookEntries() {
  try {
    // Supabase에서 방명록 데이터 조회
    const { data, error } = await supabase
      .from('guestbook')
      .select('id, name, message, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error("Supabase 조회 오류:", error)
      return []
    }

    return data.map((entry: GuestbookRow) => ({
      id: entry.id,
      name: entry.name,
      message: entry.message,
      createdAt: entry.created_at,
    }))
  } catch (error) {
    console.error("방명록 조회 오류:", error)
    return []
  }
}

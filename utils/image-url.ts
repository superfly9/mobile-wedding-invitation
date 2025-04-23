/**
 * Supabase 스토리지 이미지 URL을 생성하는 헬퍼 함수
 * @param imagePath 이미지 경로 (버킷 이름 제외)
 * @returns 완전한 Supabase 이미지 URL
 */
export function getSupabaseImageUrl(imagePath: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const bucketName = 'wedding-gallery';
  
  if (!supabaseUrl) {
    console.warn('NEXT_PUBLIC_SUPABASE_URL 환경 변수가 설정되지 않았습니다.');
    // 로컬 이미지로 폴백
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  }
  
  return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${imagePath}`;
} 
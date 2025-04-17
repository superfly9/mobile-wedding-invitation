import ThumbnailUploader from "./thumbnail-uploader"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#f9f7f4] p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">썸네일 이미지 관리</h1>

        <ThumbnailUploader />

        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">미리보기 테스트</h2>
          <p className="text-sm mb-2">다음 사이트에서 URL을 입력하여 미리보기를 테스트할 수 있습니다:</p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>
              <a
                href="https://www.opengraph.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                OpenGraph.xyz
              </a>
            </li>
            <li>
              <a
                href="https://cards-dev.twitter.com/validator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Twitter Card Validator
              </a>
            </li>
            <li>
              <a
                href="https://developers.kakao.com/tool/debugger/sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                카카오 디버거
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

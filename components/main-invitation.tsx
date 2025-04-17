import Image from "next/image";

export default function MainInvitation() {
  return (
    <section className="w-full flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-sm mb-12">
        <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden">
          <Image
            src="/images/couple.jpg"
            alt="웨딩 사진"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="text-center serif-font space-y-4 mb-8">
        <p className="text-lg">서로가 마주보며 다져온 사랑을</p>
        <p className="text-lg">이제 함께 한 곳을 바라보며</p>
        <p className="text-lg">걸어갈 수 있는 큰 사랑으로 키우고자 합니다.</p>
        <p className="text-lg">저희의 작은 혼인식에 초대합니다.</p>
      </div>

      <div className="text-center mt-8">
        <p className="text-lg font-medium">2024년 5월 25일 토요일 오후 2시</p>
        <p className="text-lg font-medium">그랜드 호텔 3층 그랜드볼룸</p>
      </div>
    </section>
  );
}

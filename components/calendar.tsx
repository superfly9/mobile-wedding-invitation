export default function Calendar() {
  // 2024년 5월 달력 데이터
  const days = ["일", "월", "화", "수", "목", "금", "토"]
  const dates = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 31, null],
  ]

  const weddingDate = 25 // 결혼식 날짜

  return (
    <section className="w-full py-16 px-4 bg-white">
      <h2 className="text-2xl text-center serif-font mb-12 decorative-line">날짜</h2>

      <div className="max-w-sm mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-xl font-medium">2024년 5월</h3>
        </div>

        <div className="grid grid-cols-7 text-center mb-2">
          {days.map((day, index) => (
            <div key={index} className={`text-sm font-medium ${index === 0 ? "text-red-500" : ""}`}>
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {dates.flat().map((date, index) => (
            <div
              key={index}
              className={`calendar-day ${date === weddingDate ? "wedding-day" : ""} ${index % 7 === 0 ? "text-red-500" : ""}`}
            >
              {date}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-lg font-medium">2024년 5월 25일 토요일</p>
          <p className="text-lg font-medium">오후 2시</p>
        </div>
      </div>
    </section>
  )
}

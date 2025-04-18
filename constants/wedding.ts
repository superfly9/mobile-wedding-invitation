export const WEDDING_DATE = {
  FULL: "2025년 6월 6일 금요일 오후 12시 30분",
  YEAR: 2025,
  MONTH: 6,
  DAY: 6,
  WEEKDAY: "금요일",
  TIME: "오후 12시 30분"
};

export const WEDDING_LOCATION = {
  NAME: "더베일리하우스 삼성 2층",
  ADDRESS: {
    ROAD: "서울 강남구 영동대로 506",
    JIBUN: "서울 강남구 삼성동 168-3"
  },
  PHONE: "02-539-2956"
};

export const INVITATION_MESSAGE = {
  CONTENT: `한 해의 마지막 밤, 운명처럼 만난 승찬과 은혜
세 번의 겨울을 함께 보내고
이제 여름의 첫 햇살 아래,
새로운 인생을 시작합니다.

힘든 날에는 서로의 곁을 지켜주고
기쁜 날에는 함께 웃음 지었던 동갑내기 연인에서
이제 평생의 동반자가 됩니다.

인생의 새로운 장을 펼쳐가는 저희를
따뜻한 축복과 귀한 마음으로
함께해 주세요.`,
  STYLE: {
    fontFamily: '"Nanum Myeongjo", serif',
    color: "rgb(77, 31, 3)",
    fontSize: "18.1125px",
    letterSpacing: "0em",
    lineHeight: "1.4em",
    wordBreak: "keep-all",
    fontWeight: 400,
  } as const
};

export const GALLERY_IMAGES = [
  { src: "/images/main-portrait.jpg", alt: "메인" },
  { src: "/images/couple-thumbnail.jpg", alt: "커플 썸네일" },
  { src: "/images/bride-portrait.jpg", alt: "신부 단독" },
  { src: "/images/bride-beige-portrait.jpg", alt: "베이지 드레스 신부 단독" },
  { src: "/images/groom-beige-portrait.jpg", alt: "베이지 정장 신랑 단독" },
  { src: "/images/couple-beige-hands.jpg", alt: "베이지 드레스 손잡은 커플" },
  { src: "/images/couple-beige-facing.jpg", alt: "베이지 드레스 마주보는 커플" },
  { src: "/images/couple-beige-formal.jpg", alt: "베이지 드레스 공손히 마주보는 커플" },
  { src: "/images/couple-beige-stairs.jpg", alt: "베이지 드레스 계단 커플" },
  { src: "/images/couple-black-heart.jpg", alt: "검정 드레스 하트 포즈" },
  { src: "/images/couple-black-smile.jpg", alt: "검정 드레스 웃는 커플" },
  { src: "/images/couple-black-facing.jpg", alt: "검정 드레스 마주보는 커플" },
] as const;

export const BANK_ACCOUNTS = {
  GROOM: [
    {
      holder: "송승찬",
      bank: "토스뱅크",
      accountNumber: "100012042817",
    },
    {
      holder: "송형우",
      bank: "NH 농협",
      accountNumber: "44102526281", 
    },
    {
      holder: "방유진",
      bank: "신한은행",
      accountNumber: "110167019026", 
    },
  ],
  BRIDE: [
    {
      holder: "김은혜",
      bank: "신한은행",
      accountNumber: "110518568490",
    },
    {
      holder: "김정윤",
      bank: "KB국민",
      accountNumber: "20260204432847",
    },
    {
      holder: "박은주",
      bank: "신한은행",
      accountNumber: "110237606338",
    },
  ],
}; 
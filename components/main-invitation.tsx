import { Fragment } from "react";
import Image from "next/image";
import {
  WEDDING_DATE,
  WEDDING_LOCATION,
  INVITATION_MESSAGE,
} from "@/constants/wedding";

export default function MainInvitation() {
  return (
    <section className="w-full flex flex-col items-center">
      <div className="relative w-full mx-auto mb-12 px-4 sm:px-8">
        <div className="flex justify-end mt-8 mb-4">
          <div
            className="text-right mb-4"
            style={{
              fontFamily: '"Nanum Myeongjo", serif',
              fontSize: "1.8em",
              letterSpacing: "0.2em",
              lineHeight: "1.4em",
            }}
          >
            <p>승찬</p>
            <div className="relative">
              <Image
                src="/images/decorative-line.jpg"
                alt="구분선"
                width={175}
                height={53}
              />
            </div>
            <p>은혜</p>
          </div>
        </div>
        <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden ">
          <Image
            src="/images/main-portrait.jpg"
            alt="웨딩 사진"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 75vw"
            quality={100}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="text-center serif-font space-y-4 pb-8 w-full px-4 sm:px-8">
        <div className="text-center">
          <div
            style={{
              fontFamily: '"Nanum Myeongjo", serif',
              color: "rgb(51, 51, 51)",
              textAlign: "center",
              lineHeight: "1.6em",
            }}
          >
            <p>{WEDDING_DATE.FULL}</p>
            <p>{WEDDING_LOCATION.NAME}</p>
          </div>
        </div>
      </div>
      <div
        className="text-center max-w-sm mx-auto px-4 sm:px-8 bg-white w-full"
        style={{
          ...INVITATION_MESSAGE.STYLE,
          letterSpacing: "0.05em",
          color: "rgb(51,51,51)",
        }}
      >
        <p className="relative w-full h-36" style={{ marginTop: "-40px" }}>
          <Image
            src="/images/dear.jpg"
            alt="dear"
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            quality={75}
            loading="lazy"
            style={{ objectFit: "cover" }}
          />
        </p>
        {INVITATION_MESSAGE.CONTENT.split("\n\n").map((paragraph, index) => (
          <Fragment key={paragraph}>
            <div className="mb-8">
              {paragraph.split("\n").map((line, lineIndex) => (
                <p key={`${index}-${lineIndex}`} className="mb-1">
                  {line}
                </p>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

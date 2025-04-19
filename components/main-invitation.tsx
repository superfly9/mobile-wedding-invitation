import { Fragment } from "react";
import Image from "next/image";
import {
  WEDDING_DATE,
  WEDDING_LOCATION,
  INVITATION_MESSAGE,
} from "@/constants/wedding";

export default function MainInvitation() {
  return (
    <section className="w-screen -mx-[env(safe-area-inset-left)] flex flex-col items-center">
      <div className="relative w-full mx-auto mb-12 px-8">
        <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden">
          <Image
            src="/images/main-portrait.jpg"
            alt="웨딩 사진"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="text-center serif-font space-y-4 py-8">
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
        className="text-center max-w-sm mx-auto px-8 bg-white"
        style={{
          ...INVITATION_MESSAGE.STYLE,
          letterSpacing: "0.05em",
          color: "rgb(51,51,51)",
        }}
      >
        <p className="relative w-full h-36">
          <Image
            src="/images/dear.jpg"
            alt="dear"
            fill
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

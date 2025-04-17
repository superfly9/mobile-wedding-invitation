import Image from "next/image";
import {
  WEDDING_DATE,
  WEDDING_LOCATION,
  INVITATION_MESSAGE,
} from "@/constants/wedding";
import { Fragment } from "react";

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
        <div className="text-center mt-8">
          <p className="text-lg font-medium">{WEDDING_DATE.FULL}</p>
          <p className="text-lg font-medium">{WEDDING_LOCATION.NAME}</p>
        </div>
        <div
          className="space-y-4 text-left max-w-sm mx-auto"
          style={INVITATION_MESSAGE.STYLE}
        >
          {INVITATION_MESSAGE.CONTENT.split("\n\n").map((paragraph, index) => (
            <Fragment key={paragraph}>
              {index > 0 && <br key={`br-${index}`} />}
              {paragraph.split("\n").map((line, lineIndex) => (
                <p key={`${index}-${lineIndex}`}>{line}</p>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

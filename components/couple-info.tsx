import PhoneIcon from "./icons/phone-icon";
import MessageIcon from "./icons/message-icon";
import { CONTACT_INFO } from "@/constants/wedding";

export default function CoupleInfo() {
  return (
    <section className="w-full py-16 px-8 bg-white">
      <div className="mx-auto">
        <h2 className="text-2xl text-center serif-font mb-12 decorative-line">
          초대합니다
        </h2>

        <div className="space-y-10">
          <div className="flex flex-col items-center text-center">
            <p className="text-lg mb-2">
              {CONTACT_INFO.GROOM.PARENTS}{" "}
              <strong>{CONTACT_INFO.GROOM.NAME}</strong>
            </p>
            <div className="flex space-x-4 mt-2">
              <a
                href={`tel:${CONTACT_INFO.GROOM.PHONE}`}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#d4b78f]"
              >
                <PhoneIcon />
              </a>
              <a
                href={`sms:${CONTACT_INFO.GROOM.PHONE}`}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#d4b78f]"
              >
                <MessageIcon />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <p className="text-lg mb-2">
              {CONTACT_INFO.BRIDE.PARENTS}{" "}
              <strong>{CONTACT_INFO.BRIDE.NAME}</strong>
            </p>
            <div className="flex space-x-4 mt-2">
              <a
                href={`tel:${CONTACT_INFO.BRIDE.PHONE}`}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#d4b78f]"
              >
                <PhoneIcon />
              </a>
              <a
                href={`sms:${CONTACT_INFO.BRIDE.PHONE}`}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#d4b78f]"
              >
                <MessageIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

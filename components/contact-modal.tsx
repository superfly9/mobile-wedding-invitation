"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PhoneIcon from "./icons/phone-icon";
import MessageIcon from "./icons/message-icon";
import { CONTACT_INFO } from "@/constants/wedding";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactModal({
  open,
  onOpenChange,
}: ContactModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md !bg-white !rounded-xl !border-0 !shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]">
        <DialogHeader>
          <DialogTitle className="text-center">연락처</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* 신랑측 */}
          <div>
            <h3 className="font-medium text-sm text-gray-500 mb-2">신랑측</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">신랑 아버지</p>
                  <p className="font-medium">
                    {CONTACT_INFO.GROOM.FATHER.NAME}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${CONTACT_INFO.GROOM.FATHER.PHONE}`}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
                  >
                    <PhoneIcon />
                  </a>
                  <a
                    href={`sms:${CONTACT_INFO.GROOM.FATHER.PHONE}`}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
                  >
                    <MessageIcon />
                  </a>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">신랑 어머니</p>
                  <p className="font-medium">
                    {CONTACT_INFO.GROOM.MOTHER.NAME}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${CONTACT_INFO.GROOM.MOTHER.PHONE}`}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
                  >
                    <PhoneIcon />
                  </a>
                  <a
                    href={`sms:${CONTACT_INFO.GROOM.MOTHER.PHONE}`}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
                  >
                    <MessageIcon />
                  </a>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">신랑</p>
                  <p className="font-medium">{CONTACT_INFO.GROOM.NAME}</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${CONTACT_INFO.GROOM.PHONE}`}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
                  >
                    <PhoneIcon />
                  </a>
                  <a
                    href={`sms:${CONTACT_INFO.GROOM.PHONE}`}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
                  >
                    <MessageIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <div className="h-px bg-gray-200 w-full" />

          {/* 신부측 */}
          <div>
            <h3 className="font-medium text-sm text-gray-500 mb-2">신부측</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">신부 아버지</p>
                  <p className="font-medium">
                    {CONTACT_INFO.BRIDE.FATHER.NAME}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${CONTACT_INFO.BRIDE.FATHER.PHONE}`}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
                  >
                    <PhoneIcon />
                  </a>
                  <a
                    href={`sms:${CONTACT_INFO.BRIDE.FATHER.PHONE}`}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
                  >
                    <MessageIcon />
                  </a>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">신부 어머니</p>
                  <p className="font-medium">
                    {CONTACT_INFO.BRIDE.MOTHER.NAME}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${CONTACT_INFO.BRIDE.MOTHER.PHONE}`}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
                  >
                    <PhoneIcon />
                  </a>
                  <a
                    href={`sms:${CONTACT_INFO.BRIDE.MOTHER.PHONE}`}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
                  >
                    <MessageIcon />
                  </a>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">신부</p>
                  <p className="font-medium">{CONTACT_INFO.BRIDE.NAME}</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${CONTACT_INFO.BRIDE.PHONE}`}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
                  >
                    <PhoneIcon />
                  </a>
                  <a
                    href={`sms:${CONTACT_INFO.BRIDE.PHONE}`}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
                  >
                    <MessageIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

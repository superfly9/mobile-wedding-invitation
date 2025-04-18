"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";
import { BANK_ACCOUNTS } from "@/constants/wedding";

interface Account {
  holder: string;
  bank: string;
  accountNumber: string;
}

interface AccountItemProps {
  account: Account;
}

function AccountItem({ account }: AccountItemProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(account.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex justify-between items-center py-3">
      <div>
        <p className="font-medium">{account.holder}</p>
        <p className="text-sm text-gray-600">
          {account.bank} {account.accountNumber}
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="text-xs h-7 px-2"
      >
        <ClipboardCopy className="w-3 h-3 mr-1" />
        {copied ? "복사됨" : "계좌번호 복사"}
      </Button>
    </div>
  );
}

export default function BankAccounts() {
  return (
    <section className="w-full py-16 px-4 bg-[#F9F7F4]">
      <h2 className="text-2xl text-center serif-font mb-12 decorative-line">
        마음 전하기
      </h2>
      <p className="text-center text-sm text-gray-600 mb-8">
        오시지 못하는 분들을 위해 기재하였습니다.
        <br />
        너그러운 마음으로 양해 부탁드립니다.
      </p>
      <div className="max-w-screen-md mx-auto">
        <Accordion type="multiple" className="w-full space-y-4">
          {/* 신랑측 계좌 */}
          <AccordionItem
            value="groom"
            className="border border-gray-200 rounded-lg bg-white px-4"
          >
            <AccordionTrigger className="text-base font-medium hover:no-underline py-4">
              신랑측 계좌번호 보기
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-2 space-y-2 divide-y divide-dashed">
              {BANK_ACCOUNTS.GROOM.map((account, index) => (
                <AccountItem key={`groom-${index}`} account={account} />
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* 신부측 계좌 */}
          <AccordionItem
            value="bride"
            className="border border-gray-200 rounded-lg bg-white px-4"
          >
            <AccordionTrigger className="text-base font-medium hover:no-underline py-4">
              신부측 계좌번호 보기
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-2 space-y-2 divide-y divide-dashed">
              {BANK_ACCOUNTS.BRIDE.map((account, index) => (
                <AccountItem key={`bride-${index}`} account={account} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

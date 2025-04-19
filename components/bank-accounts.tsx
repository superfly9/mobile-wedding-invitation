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
    <section className="w-full py-8 px-4">
      <h2 className="text-2xl text-center serif-font mb-8 decorative-line">
        마음 전하기
      </h2>
      <p className="text-center text-sm text-gray-600 mb-8">
        참석이 어려워 축하를 전하지 못하는
        <br />
        분들을 위해 기재하였습니다.
        <br />
        전해주시는 마음은 소중하게 간직하여
        <br />
        좋은 부부의 모습으로 오래오래 보답하겠습니다.
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

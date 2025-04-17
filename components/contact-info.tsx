"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

export default function ContactInfo() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const accounts = [
    {
      title: "신랑 계좌",
      bank: "신한은행",
      owner: "김은혜",
      number: "110518568490",
    },
    {
      title: "신부 아버님 계좌",
      bank: "KB국민",
      owner: "김정윤",
      number: "20260204432847",
    },
    {
      title: "신부 어머님 계좌",
      bank: "신한은행",
      owner: "박은주",
      number: "110237606338",
    },
  ];

  const copyToClipboard = (text: string, accountTitle: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(accountTitle);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <section className="w-full py-16 px-4">
      <h2 className="text-2xl text-center serif-font mb-12 decorative-line">
        GUEST BOOK
      </h2>

      <div className="space-y-6 max-w-sm mx-auto">
        {accounts.map((account) => (
          <div key={account.number} className="space-y-2">
            <div className="font-medium">{account.title}</div>
            <div className="text-gray-600">
              {account.bank} (예금주: {account.owner})
            </div>
            <div className="text-gray-600">{account.number}</div>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(account.number, account.title)}
                className="flex-1 py-2 px-4 text-sm bg-gray-100 rounded hover:bg-gray-200"
              >
                {copiedAccount === account.title ? (
                  "복사완료"
                ) : (
                  <span className="flex items-center justify-center gap-1">
                    계좌번호 복사
                    <Copy className="w-3 h-3" />
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  window.open(
                    `kakaopay://send?receiver_title=${account.owner}&receiver_text=${account.bank}`
                  );
                }}
                className="flex-1 py-2 px-4 text-sm bg-[#ffe812] rounded hover:bg-[#ffe812]/90"
              >
                카드결제
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        축하의 마음을 담아 축의금을 전해주셔도 감사합니다
      </div>
    </section>
  );
}

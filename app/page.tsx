import MainInvitation from "@/components/main-invitation";
import CoupleInfo from "@/components/couple-info";
import Gallery from "@/components/gallery";
import LocationInfo from "@/components/location-info";
import DateInfo from "@/components/date-info";
import Calendar from "@/components/calendar";
import ContactInfo from "@/components/contact-info";
import Guestbook from "@/components/guestbook";
import Footer from "@/components/footer";
import BankAccounts from "@/components/bank-accounts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f9f7f4]">
      <div className="w-full max-w-md mx-auto">
        <MainInvitation />
        <CoupleInfo />
        <Gallery />
        <LocationInfo />
        <BankAccounts />
        <Footer />
      </div>
    </main>
  );
}

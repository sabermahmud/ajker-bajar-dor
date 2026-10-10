import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer flex flex-col md:flex-row justify-between items-center bg-neutral p-4 text-neutral-content sm:footer-horizontal">
      <aside className="grid-flow-col items-center">
        <Image
          src="/logo.png"
          alt="বাজার দর"
          width={64}
          height={64}
          className="h-14 w-14 object-contain"
        />
        <p> প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
      </aside>
      <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
    </footer>
  );
}

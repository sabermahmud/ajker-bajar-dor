import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer items-center bg-neutral p-4 text-neutral-content sm:footer-horizontal">
      <aside className="grid-flow-col items-center">
        <Image
          src="/logo.png"
          alt="বাজার দর"
          width={64}
          height={64}
          className="h-14 w-14 object-contain"
        />

        <p>Copyright © 2026 - All rights reserved</p>
      </aside>

      
    </footer>
  );
}

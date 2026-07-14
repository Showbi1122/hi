import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { TopBar } from "@/components/layout/TopBar";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site site-black">
      <TopBar />
      <Navbar />
      <div className="glint-container flex min-h-[70vh] flex-col items-center justify-center py-24 pt-[160px] text-center">
        <div className="heading white">
          <small>404</small>
          <h2>Page not found</h2>
          <p className="mx-auto max-w-md">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
        </div>
        <Link href="/" className="cbtn cbnt1 mt-6">
          Back to Home <span className="cbtn-ico">→</span>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

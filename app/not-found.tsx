import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="section-label">404</p>
        <h1 className="mb-4 font-display text-4xl font-extrabold text-zinc-100">
          Page not found
        </h1>
        <p className="mb-8 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved during the
          site upgrade.
        </p>
        <Button href="/">Back to Home</Button>
      </Container>
      <Footer />
    </>
  );
}

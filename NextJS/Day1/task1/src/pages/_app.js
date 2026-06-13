import "@/styles/globals.css";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Hide navbar on error page
  const showNavbar = router.pathname !== "/_error";

  return (
    <div>
      {showNavbar && <Navbar />}
      <Component {...pageProps} />
    </div>
  );
}

import "./globals.css";

export const metadata = {
  title: "Task3",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

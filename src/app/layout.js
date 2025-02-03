import "./styles/globals.css";

export const metadata = {
  title: "Rooftop Energy",
  description: "Your partner in solar energy savings.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
import Image from "next/image";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

const RemoteNextPage = dynamic<{ withHostApp: boolean }>(
  () => import("remote_next/page"),
  {
    suspense: true,
    ssr: true,
  }
);

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <p>This is Homepage</p>
      <RemoteNextPage withHostApp={false} />
    </main>
  );
}

import Link from "next/link";
import "./globals.css";

const Home = () => {
  return (
    <div>
      <div
        className="header bg-cover bg-center w-screen h-screen"
        style={{ backgroundImage: "url('/static/header2.jpg')" }}>
        <div className="flex flex-col items-center justify-center w-screen h-screen text-4xl text-white p-4">
          MEDUSA STORE
          <div className="border-b-2 text-white p-4 hover:scale-110 transform transition-transform">
            <Link href="/Products">
              <p className="py-2 px-4 rounded">Shop now</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

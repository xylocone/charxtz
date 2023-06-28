import { BsFillBalloonHeartFill as HeartIcon } from "react-icons/bs";

function Footer() {
  return (
    <footer className="bg-gray-950 text-white p-4 position-absolute">
      <p className="text-center text-xl">
        Made with <HeartIcon className="inline text-red-700" /> by Arjun &
        Rakshit
      </p>
    </footer>
  );
}

export { Footer };

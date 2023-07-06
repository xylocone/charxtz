import { BsFillBalloonHeartFill as HeartIcon } from "react-icons/bs";

function Footer() {
  return (
    <footer className="p-4 text-white bg-gray-950 position-absolute">
      <p className="text-xl text-center sm:text-lg">
        Made with <HeartIcon className="inline text-red-700" /> by Arjun &
        Rakshit
      </p>
    </footer>
  );
}

export { Footer };

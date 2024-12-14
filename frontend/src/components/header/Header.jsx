import { IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function Header() {

  const LINKS = [
    { text: "Lien 1", url: "/" },
    { text: "Lien 2", url: "/" },
    { text: "Lien 3", url: "/" },
    { text: "Lien 4", url: "/" },
  ];

  return (
    <header className="bg-[#FED2CE] fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto py-4 flex justify-between items-center">

        <nav className="text-normal font-semibold">
          <Link to={"/"}>OpenIA</Link>
        </nav>

        <nav className="flex gap-4 group">
          {LINKS.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              className="text-black transition-all duration-300 group-hover:text-gray-400 hover:!text-black"
            >
              {link.text}
            </Link>
          ))}
        </nav>

        <nav>
          <Link to="/search">
            <IoIosSearch className="text-2xl" />
          </Link>
        </nav>

      </div>
    </header>
  );
}

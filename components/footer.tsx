export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full py-8 px-4 text-center text-sm text-gray-500">
      <p>© {currentYear} 승찬 x 은혜</p>
    </footer>
  );
}

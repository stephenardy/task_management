import Navbar from "../../fragments/Navbar/Navbar";

export default function TaskManagementLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="h-screen w-full flex flex-col items-center">
        {children}
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-row w-full items-center p-8 ">
      <label htmlFor="search" className="text-lg m-2 ">
        Search
      </label>
      <input
        type="text"
        id="search"
        className="px-2 flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
}

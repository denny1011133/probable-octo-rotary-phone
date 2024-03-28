async function getData() {
  const res = await fetch('http://localhost:3000/api/repos');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function HomePage() {
  const data = await getData();

  return (
    <>
      <div className="flex flex-row w-full items-center p-8 ">
        <input
          onChange={null}
          type="text"
          id="search"
          className="px-2 flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <label
          htmlFor="search"
          className="text-lg m-2 bg-blue-500 rounded-md p-1"
        >
          Search
        </label>
      </div>
      <ul role="list" className="divide-y divide-gray-700 ">
        {data.response.items.map((repo) => (
          <li key={repo.id} className="p-8">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {repo.full_name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {repo.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}


function Header() {
  return (
    <div>
      <header class="bg-white border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 class="text-lg font-semibold text-gray-700">
            Furniture Management
          </h2>

          <button
            onClick={() => setShowModal(true)}
            className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            + Add Furniture
          </button>

        </header>
    </div>
  )
}

export default Header
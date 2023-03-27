export default function Create() {
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="flex flex-row space-x-4 w-3/4 justify-center">
          <div className="flex flex-col h-48 w-1/4 space-y-2">
            <textarea
              placeholder="Insert prompt here..."
              className="resize-none rounded-2xl h-full p-2"
            ></textarea>
            <button className=" bg-white rounded-2xl p-2">Generate 🪄</button>
          </div>
          <div className="h-96 w-96 bg-neutral-900 rounded-2xl"></div>
        </div>
      </div>
    </>
  );
}

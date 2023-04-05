import { useRouter } from "next/router";

export default function Share() {
  const router = useRouter();

  let imageURL = router.query.imageURL?.toString();
  let prompt = router.query.prompt?.toString();

  function backToCreate() {
    router.push("/create");
  }

  return (
    <>
      <div className="bg-black h-screen w-screen flex justify-center items-center space-x-4">
        <div className="flex flex-col space-y-4 items-center">
          <img src={imageURL} className="w-96 rounded-2xl"></img>
          <button className="w-1/2" onClick={backToCreate}>
            Go Back
            <span className="material-symbols-outlined ml-2">arrow_back</span>
          </button>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="bg-neutral-900 h-72 rounded-2xl p-8 flex flex-col space-y-4">
            <p className="text-white">
              <b>Prompt:</b> {prompt}
            </p>
            <div className="flex space-y-1 flex-col h-full">
              <p className="text-white">
                <b>Post:</b>
              </p>
              <textarea
                className="w-full h-full rounded-2xl text-white"
                placeholder="What would you like to say?"
              ></textarea>
            </div>
          </div>
          <button className="w-1/2">
            Send <span className="material-symbols-outlined ml-2">send</span>
          </button>
        </div>
      </div>
    </>
  );
}

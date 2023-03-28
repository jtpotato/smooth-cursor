import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function Create() {
  const models = [
    "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
    "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
  ];

  async function query(prompt: string, modelIndex: number) {
    console.log(models[modelIndex], modelIndex)
    const response = await fetch(models[modelIndex], {
      headers: {
        Authorization: "Bearer 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",
        /* I KNOW IT'S BAD TO EXPOSE API KEYS BUT WHAT IS SOMEONE GOING TO DO WITH THIS ONE?? USE IT UNTIL I GET RATELIMITED? */
      },
      method: "POST",
      body: JSON.stringify({
        inputs: prompt,
        options: { use_cache: false, wait_for_model: false },
      }),
    });
    const result = response;
    return result;
  }

  async function onGenerate() {
    let prompt = promptInputAreaRef.current!.value;
    console.log("Sending to API!");
    let result: Response;
    let tries = 0;
    let modelIndex = 0;
    while (tries < 15) {
      if (prompt) {
        result = await query(prompt, modelIndex);
        if (result.status == 503) {
          console.log(
            "Woops, the model is loading. Let's try a different one."
          );
          modelIndex = (modelIndex + 1) % models.length;
          tries += 1;
        } else {
          break;
        }
      }
    }
    const url = URL.createObjectURL(await result.blob());
    setImageURL(url);
  }

  async function onShare() {
    router.push({
        pathname: "/share",
        query: { imageURL: imageURL, prompt: promptState },
    });
  }

  const promptInputAreaRef = useRef<HTMLTextAreaElement>(null);
  const [imageURL, setImageURL] = useState("");
  const [promptState, setPromptState] = useState("");
  let router = useRouter();

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen bg-black">
        <div className="flex flex-row space-x-4 w-3/4 justify-center">
          <div className="flex flex-col h-48 w-1/4 space-y-2">
            <textarea
              placeholder="Insert prompt here..."
              className="resize-none rounded-2xl h-full p-2 outline-none"
              ref={promptInputAreaRef}
            ></textarea>
            <button
              className=" bg-white rounded-2xl p-2 flex justify-center"
              onClick={onGenerate}
            >
              Generate{" "}
              <span className="material-symbols-outlined ml-2 font-light text-xl">
                auto_fix
              </span>
            </button>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="h-96 w-96 bg-neutral-900 rounded-2xl">
              <img src={imageURL} className="rounded-2xl" />
            </div>
            <button onClick={onShare}>
              Share{" "}
              <span className="material-symbols-outlined block ml-2">
                share
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

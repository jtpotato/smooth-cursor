"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Create() {
  async function loadModel() {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
      {
        headers: {
          Authorization: "Bearer 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",
          "X-Wait-For-Model": "true",
          "X-Use-Cache": "false",
          "X-Load-Model": "0",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: "test",
        }),
      }
    );
    const result = await response;
    return result;
  }
  async function query(prompt: string) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
      {
        headers: {
          Authorization: "Bearer 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",
          "X-Wait-For-Model": "true",
          "X-Use-Cache": "false",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
        }),
      }
    );
    const result = await response;
    return result;
  }

  async function onGenerate() {
    loadModel(); // try to load the model
    let prompt = promptInputAreaRef.current!.value;
    setPromptState(prompt);
    console.log("Sending to API!");
    let result: Response | undefined = undefined;
    if (prompt) {
      result = await query(prompt);
      if (result.status == 500) {
        console.log("Woops, the model is struggling. Let's try again.");
        setTimeout(onGenerate, 1000);
      } else {
        const url = URL.createObjectURL(await result!.blob());
        setImageURL(url);
      }
    }
  }

  async function onShare() {
    router.push("/share");
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
              className="h-full"
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

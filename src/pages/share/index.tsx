import { useRouter } from "next/router";

export default function Share() {
  const router = useRouter();

  let imageURL = router.query.imageURL?.toString();
  let prompt = router.query.prompt?.toString();

  return (
    <>
      <div className="bg-black h-screen w-screen flex justify-center items-center">
        <img src={imageURL} className="w-96 rounded-2xl"></img>
      </div>
    </>
  );
}

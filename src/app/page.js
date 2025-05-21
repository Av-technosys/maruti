import { cookies } from "next/headers";
import UploadForm from "./uploadForm";

export default async function Home() {
  const cookiesStore = await cookies();
  return (
    <divv>
      <UploadForm data={cookiesStore.get("data").value} />
    </divv>
  );
}

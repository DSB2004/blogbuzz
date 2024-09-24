import { DB_DATABASE } from "@/env";
export default function Home() {
  return (
    <>
      <h1>Hello World from next application {DB_DATABASE}</h1>
    </>
  );
}

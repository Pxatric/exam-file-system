import Image from "next/image";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Loginpage from "./login/page";

export default function Home() {
  return (
    <main>
      <Container>
        <Loginpage />
      </Container>
    </main>
  );
}

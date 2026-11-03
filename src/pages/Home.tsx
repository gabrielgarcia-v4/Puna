import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Manifesto from "@/components/Manifesto";
import Servicos from "@/components/Servicos";
import Metodo from "@/components/Metodo";
import Trabalhos from "@/components/Trabalhos";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Manifesto />
        <Servicos />
        <Metodo />
        <Trabalhos />
      </main>
      <Footer />
    </>
  );
}

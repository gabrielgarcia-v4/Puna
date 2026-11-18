import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Faixa from "@/components/Faixa";
import Intro from "@/components/Intro";
import Manifesto from "@/components/Manifesto";
import Servicos from "@/components/Servicos";
import Trabalhos from "@/components/Trabalhos";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Faixa />
        <Intro />
        <Manifesto />
        <Servicos />
        <Trabalhos />
      </main>
      <Footer />
    </>
  );
}

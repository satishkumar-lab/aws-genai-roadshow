import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSpeakers from "@/components/AboutSpeakers";
import Agenda from "@/components/Agenda";
import Who from "@/components/Who";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-full w-full overflow-x-clip bg-white">
      <Header />
      <main>
        <Hero />
        <AboutSpeakers />
        <Agenda />
        <Who />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

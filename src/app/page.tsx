import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Industries from "@/components/Industries";
import Services from "@/components/Services";


export default function Home() {
  return (
<main className="w-full h-full">
    <Hero />
    <About/>
    <Services/>
    <Industries/>


    <Contact/>
</main>
  );
}

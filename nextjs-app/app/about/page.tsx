// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { BotIcon, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "About • Hey Harvey AI Lab",
  description:
    "Learn about Hey Harvey’s mission to fuse empathy with cutting-edge AI for customer service training.",
};

export default function AboutPage() {
  return (
    <main className="space-y-20">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/about-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-75" />
        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
            “Where Empathy Meets Innovation”
          </h1>
          <p className="text-lg md:text-2xl text-gray-100 max-w-2xl mx-auto">
            Dive into the story behind Hey Harvey’s AI-powered customer-service
            simulations—and discover how we’re revolutionizing real-world
            communication training.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 px-6 md:px-20">
        <div className="prose max-w-none">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p>
            Born from countless after-call reflections and “wish-I-knew-how-to-
            say-that” moments, Hey Harvey was created to give customer-service
            pros a safe stage to practice, stumble, and master their
            conversations—long before the stakes get high. We mix cutting-edge
            voice AI with heart, teaching skills that live and breathe empathy.
          </p>
        </div>
        <div className="flex items-center justify-center">
          {/* Replace with a real timeline graphic or illustration */}
          <Image
            src="/image-9.jpg"
            alt="Hey Harvey Origin Timeline"
            width={400}
            height={300}
          />
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-8">Our Philosophy</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            {
              title: "Human-First Tech",
              icon: "users-round.svg",
              text: "We believe technology should amplify your humanity, not replace it.",
            },
            {
              title: "Practice Makes Perfect",
              icon: "keyboard.svg",
              text: "Realistic role-play, honest feedback, proven improvement.",
            },
            {
              title: "Lifelong Learning",
              icon: "notebook-pen.svg",
              text: "Every call is a class—your coach is always on standby.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="max-w-xs bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <Image
                src={card.icon}
                alt={`${card.title} icon`}
                width={48}
                height={48}
              />
              <h3 className="text-xl font-semibold mt-4 mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What You’ll Discover Here */}
      <section className="px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-8">
          What You’ll Discover Here
        </h2>
        <ul className="space-y-4 max-w-2xl mx-auto">
          {[
            "Deep Dives & Tutorials – Step-by-step guides on crafting empathy-powered scripts.",
            "Behind-the-Scenes Tech – How voice recognition, tone analysis, and RAG engines power your practice.",
            "Real-World Case Studies – Success stories from teams using Hey Harvey to transform their KPIs.",
            "Thought Leadership – Expert interviews, hot takes on the future of CX, and more.",
          ].map((item, idx) => (
            <li
              key={idx}
              className={`py-4 px-6 rounded-lg ${
                idx % 2 === 0 ? "bg-purple-50" : "bg-gray-50"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Meet the Founder */}
      <section className="flex flex-col md:flex-row items-center gap-12 px-6 md:px-20">
        <div className="flex-shrink-0">
          <Image
            src="/founder.jpg"
            alt="Yattish Ramhorry"
            width={200}
            height={200}
            className="rounded-full border-4 border-purple-500"
          />
        </div>
        <div className="prose max-w-none">
          <h2 className="text-3xl font-bold mb-4">Meet the Founder</h2>
          <p>
            <strong>Yattish Ramhorry</strong>
            <br />
            Software developer. AI enthusiast. Gardener of ideas.
            <br />
            After a decade building BI tools in banking, Yattish fell in love
            with bringing AI out of the lab and onto the headset—empowering
            real humans to connect, solve, and shine. When he’s not coding a
            new feature, you’ll find him tending his garden or sketching
            dream-scapes of tomorrow’s tech.
          </p>
        </div>
      </section>

      {/* Join Our Community */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center py-20 px-6 md:px-20 rounded-xl mx-6 md:mx-20 mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Ready to level-up your communication game?
        </h2>
        <p className="mb-6 max-w-lg mx-auto">
          Subscribe for monthly insights, exclusive sneak-peeks at new AI
          features, and invites to our live scenario workshops.
        </p>
        <Link href="/subscribe">
          <div className="inline-block bg-white text-purple-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition">
            Join the Crew →
          </div>
        </Link>
      </section>
    </main>
  );
}

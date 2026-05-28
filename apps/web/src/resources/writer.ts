import type { Writer } from "@/types";

const writer: Writer = {
  path: "/writer",
  label: "Writer",
  title: "Writer's Corner",
  description: "Selamat datang di ruang kreatif saya, tempat di mana imajinasi bertemu dengan realitas melalui setiap barisan kata. Jelajahi kumpulan karya fiksi, novel mendalam, dan cerita pendek yang membawa Anda ke petualangan tanpa batas.",
  headline: "Writer's Corner",
  subline: "Mengeksplorasi dunia fantasi dan realitas yang tertuang dalam barisan kata. Sebuah perjalanan imajinatif untuk membawa Anda melampaui batas waktu dan ruang melalui narasi yang mendalam dan penuh makna.",
  works: [
    {
      title: "The Code of Silence",
      category: "Novel",
      summary: "Sebuah misteri tentang developer yang menemukan pesan tersembunyi di balik sistem legacy.",
      isRecommended: true,
      image: "/images/projects/project-01/cover-01.jpg"
    },
    {
      title: "Midnight Debugger",
      category: "Short Story",
      summary: "Kumpulan cerita pendek tentang kegagalan sistem di tengah malam.",
      isRecommended: false
    },
    {
      title: "The Architecture of Dreams",
      category: "Series",
      summary: "Seri petualangan di dunia digital futuristik.",
      isRecommended: true
    },
    {
      title: "Void Pointer",
      category: "Novel",
      summary: "Perjalanan mencari makna di tengah kekosongan ruang data.",
      isRecommended: false
    }
  ]
};

export { writer };

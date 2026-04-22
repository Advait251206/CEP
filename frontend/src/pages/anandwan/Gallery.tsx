import { motion } from 'framer-motion';
import HeroSection from '../../components/sections/HeroSection';
import AnimatedText from '../../components/ui/AnimatedText';
import { CloudinaryImage } from '../../components/CloudinaryImage';
import { IMAGES } from '../../constants/images';

// Extract all 16 anandwan images into an array for the masonry
const GALLERY_SOURCE = [
  { id: 1, url: IMAGES.anandwan.home.hero, aspect: 'aspect-[16/9]' },
  { id: 2, url: IMAGES.anandwan.about.history, aspect: 'aspect-[4/3]' },
  { id: 3, url: IMAGES.anandwan.projects.craft, aspect: 'aspect-[1/1]' },
  { id: 4, url: IMAGES.anandwan.home.introTransition, aspect: 'aspect-[16/9]' },
  { id: 5, url: IMAGES.anandwan.about.struggle4, aspect: 'aspect-[4/3]' },
  { id: 6, url: IMAGES.anandwan.about.hero, aspect: 'aspect-[9/16]' },
  { id: 7, url: IMAGES.anandwan.projects.tools, aspect: 'aspect-[1/1]' },
  { id: 8, url: IMAGES.anandwan.getInvolved.donateHero, aspect: 'aspect-[4/3]' },
  { id: 9, url: IMAGES.anandwan.home.community, aspect: 'aspect-[16/9]' },
  { id: 10, url: IMAGES.anandwan.about.team, aspect: 'aspect-[4/3]' },
  { id: 11, url: IMAGES.anandwan.projects.learning, aspect: 'aspect-[4/3]' },
  { id: 12, url: IMAGES.anandwan.home.dailyLife, aspect: 'aspect-[16/9]' },
  { id: 13, url: IMAGES.anandwan.about.struggle2, aspect: 'aspect-[4/3]' },
  { id: 14, url: IMAGES.anandwan.projects.story, aspect: 'aspect-[4/3]' },
  { id: 15, url: IMAGES.anandwan.home.evening, aspect: 'aspect-[16/9]' },
  { id: 16, url: IMAGES.anandwan.contact.hero, aspect: 'aspect-[16/9]' },
];

export default function Gallery() {
  return (
    <div className="w-full bg-[color:var(--color-background)] pb-32">
      <HeroSection 
        title="Visual Archives"
        subtitle="Captured moments of immense resilience, unyielding joy, and the undeniable beauty of restored dignity. This is the visual proof of transformation."
        imageUrl={IMAGES.anandwan.projects.story}
      />

      <section className="pt-32 px-6 max-w-[1600px] mx-auto">
        <AnimatedText className="text-center mb-24">
          <p className="text-xl md:text-3xl text-[var(--color-muted-on-dark)] font-light max-w-4xl mx-auto leading-relaxed">
            These images represent profoundly more than mere documentation. They are incredibly intense visual proof that the human spirit, given the absolute minimum of resources and the maximum of respect, can profoundly reconstruct both itself and its environment entirely. We invite you to witness the staggering faces of radical transformation.
          </p>
        </AnimatedText>

        {/* CSS Columns approach for perfect masonry without strict grid rows */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {GALLERY_SOURCE.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (idx % 4) * 0.15, ease: "easeOut" }}
              className={`relative overflow-hidden rounded-[2rem] border border-[color:var(--color-border-soft)] shadow-2xl group break-inside-avoid ${item.aspect}`}
            >
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-[color:var(--color-background)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="absolute inset-0 z-0">
                 <CloudinaryImage 
                   imageUrl={item.url} 
                   alt={`Anandwan visual archive ${item.id}`}
                   className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                 />
              </div>

              <div className="absolute bottom-6 left-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 text-[var(--color-text)] font-semibold tracking-widest text-xs uppercase drop-shadow-[0_0_8px_var(--color-bg-strong)]">
                Archive Record {item.id < 10 ? `0${item.id}` : item.id}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

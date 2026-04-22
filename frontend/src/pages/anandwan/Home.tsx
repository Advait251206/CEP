import HeroSection from '../../components/sections/HeroSection';
import ContentSection from '../../components/sections/ContentSection';
import ImageTextSection from '../../components/sections/ImageTextSection';
import { IMAGES } from '../../constants/images';

export default function AnandwanHome() {
  return (
    <div className="w-full">
      <HeroSection 
        title="Heal The Earth. Heal Yourself."
        subtitle="Welcome to Anandwan — The Forest of Joy. A sanctuary of empowerment, sustainability, and human dignity that redefines what it means to rebuild lives and land together."
        imageUrl={IMAGES.anandwan.home.hero}
      />

      <ContentSection 
        title="Our Foundational Philosophy" 
        subtitle="The Philosophy of Pain & Joy"
        variant="dark"
      >
        <p>
          Established deep in the heart of Maharashtra, Anandwan, which literally translates to 'The Forest of Joy', represents one of the most remarkable social experiments in the world. What began as a barren, unforgiving piece of land populated by a small group of marginalized individuals has slowly transformed into an entirely self-contained, self-sufficient eco-village. It is a striking testament to human resilience and the immutable belief that charity destroys, but work builds.
        </p>
        <p>
          We do not view those afflicted by illnesses, social ostracization, or deep poverty as burdens to be cared for by sympathetic donors. Instead, we see immense untapped human capital. Through rigorous, purposeful work in sustainable agriculture, traditional arts and crafts, and community building, the residents of Anandwan slowly reconstruct not just their physical environment, but their spiritual foundation. 
        </p>
        <p>
          By cultivating the earth, they learn to cultivate themselves. The act of planting a tree, weaving a simple textile, or forging a tool becomes an act of profound self-reclamation. It is here, amidst the quiet dignity of labor, that the deepest wounds are healed. Our village isn’t just an ashram or a hospital; it is a sprawling canvas where the discarded and the forgotten become the primary architects of a radical, beautiful new society.
        </p>
      </ContentSection>

      <ImageTextSection 
        title="The Dawn of Rebirth"
        subtitle="Introductory Transitions"
        imageUrl={IMAGES.anandwan.home.introTransition}
        imagePosition="right"
        content={
          <div className="space-y-6">
            <p>
              When a new resident arrives at Anandwan, they are often broken in both body and spirit. Society has turned them away, branding them as outcasts or untouchables due to their afflictions. The introductory phase at our sanctuary is not about institutional medical care, though that is provided. Rather, it is a psychological transition back into the fold of humanity. 
            </p>
            <p>
              They are given a name, a role, and a profound sense of responsibility. No task is considered too small, and absolutely no individual is considered useless. From the first morning, they witness a society functioning entirely on the labor of people just like them. The blind operate precise machinery, the amputees manage complex agricultural ecosystems, and the deaf coordinate intricate logistical networks. 
            </p>
            <p>
              This immediate immersion into a functional, highly productive ecosystem shatters the illusion of their own helplessness. The transition from a passive recipient of meager charity to an active, vital architect of a thriving community is the singular most powerful medicine we provide.
            </p>
          </div>
        }
      />

      <ImageTextSection 
        title="Weaving The Social Fabric"
        subtitle="Community Cohesion"
        imageUrl={IMAGES.anandwan.home.community}
        imagePosition="left"
        content={
          <div className="space-y-6">
            <p>
              Anandwan is not merely an aggregation of individuals; it is a highly cohesive, deeply interconnected social organism. The community structure relies heavily on radical interdependence. Because everyone possesses varying levels of physical capability, strict teamwork is an absolute, non-negotiable necessity for survival and prosperity.
            </p>
            <p>
              This interdependence completely dissolves the rigid social hierarchies of caste, religion, and economic background that plague the outside world. Here, the person who plants the seed is just as vital as the person who harvests the crop and the person who weaves the cotton into textiles. The community operates massive communal kitchens, shared educational spaces, and cooperative banking systems governed entirely by the residents.
            </p>
            <p>
              By erasing external societal divides and replacing them with a shared, unified mission of ecological and personal restoration, a profound brotherhood emerges. It is a brotherhood forged not by bloodline, but by shared sweat, shared struggle, and shared, undeniable joy in the face of immense adversity.
            </p>
          </div>
        }
      />

      <ContentSection 
        title="The Rhythm of Daily Life" 
        subtitle="Sustaining The Ecosystem"
        variant="light"
      >
        <p>
          The daily cadence of Anandwan starts well before sunrise. It is a rhythm dictated entirely by the needs of the earth and the requirements of the collective. Thousands of residents engage in a diverse array of highly specialized tasks that keep the eco-village permanently self-sufficient and financially independent.
        </p>
        <p>
          The agricultural sectors deploy massive organic farming techniques to produce the food that sustains the community, while simultaneously ensuring the complete regeneration of the soil biome. In parallel, the industrial hubs hum with the sound of manufacturing—producing everything from sophisticated medical mobility aids for the disabled to premium textiles and exquisite wooden crafts that are sold to the outside world.
        </p>
        <p>
          There is absolutely no wasted moment and no wasted material. Scraps of cloth are woven into beautiful carpets, agricultural waste is processed into bio-gas to fuel the communal kitchens, and wastewater is rigorously filtered through root-zone treatment plants to irrigate the massive orchards. This relentless daily efficiency is the cornerstone of our sustainability and our pride.
        </p>
      </ContentSection>

      <ImageTextSection 
        title="Quiet Reflections"
        subtitle="The Evening Respite"
        imageUrl={IMAGES.anandwan.home.evening}
        imagePosition="right"
        content={
          <div className="space-y-6">
            <p>
              As the immense heat of the sun subsides and dusk settles over the central Indian plains, the intense labor of Anandwan slowly comes to a halt. The evening period is a sacred time of deep reflection, artistic expression, and profoundly joyful communal gathering. 
            </p>
            <p>
              Music is highly revered within our community. The Anandwan orchestra—composed entirely of differently-abled musicians playing instruments crafted right here in our workshops—often fills the central courtyards with symphonies that rival professional cohorts. Theatre performances, poetry recitals, and sprawling intellectual discussions take place well into the night.
            </p>
            <p>
              It is during these quiet evenings that the true magnitude of what has been built here becomes clearly visible. Men and women who were once cast aside to die in darkness are now thriving in a vibrant, artistic, and entirely self-made world. As the stars emerge over the massive forests they planted themselves, the 'Forest of Joy' sleeps, ready to build the world anew tomorrow.
            </p>
          </div>
        }
      />
    </div>
  );
}

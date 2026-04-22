import HeroSection from '../../components/sections/HeroSection';
import ContentSection from '../../components/sections/ContentSection';
import ImageTextSection from '../../components/sections/ImageTextSection';
import { IMAGES } from '../../constants/images';

export default function GovigyanAgriculture() {
  return (
    <div className="w-full">
      <HeroSection 
        title="Regenerative Agriculture"
        subtitle="Moving beyond sustainable farming to strictly regenerative methodologies. Repairing the broken carbon cycle and creating hyper-fertile soil architecture without a single synthetic chemical."
        imageUrl={IMAGES.govigyan.agriculture.soil}
      />

      <ContentSection 
        title="The Soil Crisis" 
        subtitle="Understanding The Devastation"
        variant="dark"
      >
        <p>
          For the last fifty years, global agriculture has operated under a fundamentally flawed hypothesis: that soil is merely a structural anchor to hold plants upright while we pump them full of synthetic, water-soluble nutrients. This chemical approach has entirely eroded the microscopic ecosystem that actually processes and delivers native nutrients to root systems.
        </p>
        <p>
          At Govigyan, we measure soil health not by its arbitrary NPK (Nitrogen, Phosphorous, Potassium) content, but by its living biology. Our soil diagnostics reveal that conventionally farmed land is biologically dead. It lacks the complex fungal networks, the bacterial diversity, and the structural nematodes required to hold water and carbon. It is essentially dirt, not soil.
        </p>
        <p>
          Our regenerative agriculture protocols are explicitly designed to reverse this. We treat farming as an exercise in massive-scale biological inoculation. By focusing exclusively on the health of the microbiome, the plants naturally express higher pest resistance, deeper root penetration, and unparalleled nutritional density.
        </p>
      </ContentSection>

      <ImageTextSection 
        title="The Alchemy of Compost"
        subtitle="Biological Inoculation"
        imageUrl={IMAGES.govigyan.agriculture.compost}
        imagePosition="left"
        content={
          <div className="space-y-6">
            <p>
              In our methodology, compost is not merely decomposed organic matter used as a bulk fertilizer; it is a meticulously crafted biological inoculant. Using the absolute purest dung and urine from our indigenous cattle herd, we create specialized aerobic compost teas and hyper-dense organic slurries.
            </p>
            <p>
              These applications contain billions of beneficial microbes per square centimeter. When applied to the barren earth, they rapidly colonize the root zone. They break down the locked, inaccessible minerals in the soil, converting them into bio-available formats that the plants can easily absorb. 
            </p>
            <p>
              The result is a violent, rapid explosion of life beneath the surface. Earthworms return. Fungal hyphae weave through the dirt, creating a spongy structure that holds massive amounts of moisture. We effectively build a microscopic internet beneath the ground that shares resources across the entire farm system.
            </p>
          </div>
        }
      />

      <ContentSection 
        title="Water Retention Architecture" 
        subtitle="Drought Resilience"
        variant="light"
      >
        <p>
          Water scarcity is the defining crisis of modern agriculture. Conventional farming demands immense irrigation because dead dirt cannot hold moisture; it either runs off immediately, taking topsoil with it, or evaporates under the harsh sun. 
        </p>
        <p>
          Our biological approach fundamentally alters the physical architecture of the soil. As the fungal networks expand and the organic carbon levels rise, the soil begins to act like a massive sponge. For every 1% increase in soil organic matter, an acre of land can hold an additional 20,000 gallons of water. This means our farms remain green and productive long after neighboring chemical farms have cracked and dried.
        </p>
      </ContentSection>

      <ImageTextSection 
        title="Closed-Loop Farming"
        subtitle="Absolute Self-Sufficiency"
        imageUrl={IMAGES.govigyan.agriculture.process}
        imagePosition="right"
        content={
          <div className="space-y-6">
            <p>
              The ultimate goal of Govigyan's agricultural process is the absolute elimination of external dependencies. A true farm should not require outside factories to provide its fertility. In our closed-loop system, the cattle feed the soil, the soil feeds the plants, the plants feed the humans, and the crop residue feeds back into the cattle and compost.
            </p>
            <p>
              By mastering this process, we completely decouple our food production from the fossil-fuel industry. There is no urea, no DAP, and no synthetic pesticides. We rely purely on the elegant, brutal efficiency of natural biology to manage pests and drive growth. 
            </p>
            <p>
              This is not a romantic return to the past; it is an incredibly aggressive, highly optimized leap into the future of human survival on this planet.
            </p>
          </div>
        }
      />
    </div>
  );
}

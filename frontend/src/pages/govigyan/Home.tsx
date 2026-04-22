import HeroSection from '../../components/sections/HeroSection';
import ContentSection from '../../components/sections/ContentSection';
import ImageTextSection from '../../components/sections/ImageTextSection';
import { IMAGES } from '../../constants/images';

export default function GovigyanHome() {
  return (
    <div className="w-full">
      <HeroSection 
        title="The Soil Remembers"
        subtitle="Regenerative agriculture is not a retreat into the past; it is a rapid, aggressive survival protocol for the future. We are resurrecting the dead earth through pure biological science."
        imageUrl={IMAGES.govigyan.home.hero}
      />

      <ContentSection 
        title="The Silent Extinction" 
        subtitle="The Crisis of Topsoil"
        variant="dark"
      >
        <p>
          We are currently living through an incredibly quiet, absolute global catastrophe: the rapid, systematic destruction of the world’s agricultural topsoil. Driven by decades of intensely brutal chemical farming, mass monoculture, and deeply aggressive synthetic fertilization, the fundamental microscopic biome of the earth has been violently eradicated. 
        </p>
        <p>
          Without this living biome, soil structurally collapses into inert dirt. It becomes entirely incapable of retaining water, entirely incapable of naturally fighting pests, and completely unable to deliver complex nutrients to the crops we consume. Human health is directly, undeniably tethered to the health of the soil microbiome, and we are currently starving on full stomachs.
        </p>
        <p>
          At Govigyan, we absolutely reject the toxic chemical paradigm. We recognize that the only viably massive solution to the impending global food security crisis is the immediate, aggressive restoration of massive-scale regenerative agriculture driven solely by intense biological complexity.
        </p>
      </ContentSection>

      <ImageTextSection 
        title="The Biological Engineers"
        subtitle="Rescuing Indigenous Genetics"
        imageUrl={IMAGES.govigyan.livestock.cowGroup} // Contextual use
        imagePosition="right"
        content={
          <div className="space-y-6">
            <p>
              The absolute core foundation of our deeply massive regenerative project relies on the fierce protection of purebred indigenous cattle. For thousands of years, these animals were the fundamental ecological engineers of the Indian subcontinent. Their highly specific gut biome is chemically uniquely evolved to process huge amounts of complex native flora.
            </p>
            <p>
              When those deeply complex materials are passed through the animal, they are converted into hyper-potent biological fertilizers. A single gram of indigenous cow dung contains billions of intensely highly active microbes completely specifically adapted to aggressively break down locked nutrients in the soil.
            </p>
            <p>
              The massive tragedy of modern dairy industrialization is the aggressive replacement of these incredible ecological engineers with intensely fragile imported crossbreeds that completely lack this specific biological capacity. At our sanctuary, we are heavily reversing this extinction, breeding pure genetic lines solely to rescue the soil.
            </p>
          </div>
        }
      />

      <ImageTextSection 
        title="The Alchemical Process"
        subtitle="Regenerative Methodology"
        imageUrl={IMAGES.govigyan.agriculture.compost} // Contextual use
        imagePosition="left"
        content={
          <div className="space-y-6">
            <p>
              Our agricultural methodology is essentially highly optimized biological alchemy. We aggressively harvest the incredibly rich organic byproducts of our massive indigenous herds and structurally process them through incredibly highly advanced aerated composting and liquid slurry systems.
            </p>
            <p>
              These massive bio-fertilizers are then aggressively applied to our deeply sick farmlands. The results are almost violently immediate. The complex bacterial and massive fungal networks heavily re-establish themselves within the topsoil, structurally binding the dirt particles together to create immense water-holding capacity and incredible drought resilience.
            </p>
            <p>
              We completely eliminate the need for deeply harmful pesticides because highly healthy, biologically complex plants emit specific frequencies and chemical signals that naturally repel heavy infestations. We rely exclusively on the fiercely incredibly brutal efficiency of an optimized natural ecosystem.
            </p>
          </div>
        }
      />

      <ContentSection 
        title="Economic Sovereignty" 
        subtitle="Decoupling from Chemistry"
        variant="light"
      >
        <p>
          The chemical agriculture industry relies completely on creating aggressive, massive dependency. Farmers are forced into massive debt to purchase highly expensive patented seeds, heavily expensive synthetic fertilizers, and deeply toxic pesticides every single season. This creates a deeply tragic, brutal cycle of intense rural poverty and incredibly massive ecological degradation.
        </p>
        <p>
          The overarching goal of the Govigyan project is to aggressively sever this chain. By deeply training farmers in highly advanced natural regenerative methodology, we completely heavily eliminate their massive operational costs. When the primary source of their immensely powerful fertilizer comes directly from their own cattle rather than a heavily massive chemical factory, they instantly achieve profound, unbreakable economic sovereignty.
        </p>
      </ContentSection>

      <ImageTextSection 
        title="A Call to the Future"
        subtitle="Scalable Architecture"
        imageUrl={IMAGES.govigyan.about.farm} // Contextual use
        imagePosition="right"
        content={
          <div className="space-y-6">
            <p>
              We firmly believe that this is not merely a deeply localized farming experiment. We are intensely aggregating incredibly complex, highly empirical agricultural data to definitively prove that our deeply advanced regenerative models can aggressively scale to feed the entire globe.
            </p>
            <p>
              Our massive farms act as stunning open-source laboratories. We aggressively invite heavily critical scientists, massive agricultural policymakers, and fiercely skeptical conventional farmers to completely deeply audit our soil health, incredibly massive water retention metrics, and insanely high crop yields.
            </p>
            <p>
              The fundamental truth is wildly undeniable: highly optimized nature will heavily aggressively outperform synthetic chemistry every single time if given the exact proper biological architecture. The fiercely beautiful future of human survival heavily depends on us remembering this.
            </p>
          </div>
        }
      />
    </div>
  );
}

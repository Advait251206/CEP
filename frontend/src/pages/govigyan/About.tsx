import HeroSection from '../../components/sections/HeroSection';
import ContentSection from '../../components/sections/ContentSection';
import ImageTextSection from '../../components/sections/ImageTextSection';
import { IMAGES } from '../../constants/images';

export default function GovigyanAbout() {
  return (
    <div className="w-full">
      <HeroSection 
        title="The Living Soil"
        subtitle="We do not farm the crop; we farm the soil. Our philosophy begins and ends with the absolute holistic health of the earth beneath our feet."
        imageUrl={IMAGES.govigyan.about.about}
      />

      <ContentSection 
        title="A Fundamental Perspective Shift" 
        subtitle="Rethinking Agriculture"
        variant="dark"
      >
        <p>
          For over fifty years, the global agricultural narrative has been entirely dominated by the perspective of chemistry. Modern agronomists view a farm as a chemical factory, where plants are essentially machines that require calculated inputs of synthetic nitrogen, phosphorus, and potassium to produce a yield. This perspective completely ignores the profound biological reality of the earth.
        </p>
        <p>
          At Govigyan, we have completely discarded the chemical perspective and adopted an aggressively biological one. We understand that a truly healthy plant is not the product of synthetic force-feeding, but the natural expression of a deeply complex, incredibly vibrant subterranean ecosystem. Our absolute primary mission is not to grow crops, but to cultivate the billions of microorganisms residing in the topsoil.
        </p>
        <p>
          When the soil health is prioritized above all else, the crops naturally flourish. They develop far deeper root systems, exhibit immense natural resistance to pests and diseases, and possess a nutritional density that chemical farming can simply never achieve. We are returning agriculture to its rightful state as an ecological art form.
        </p>
      </ContentSection>

      <ImageTextSection 
        title="The Microscopic Architecture"
        subtitle="Farm Diagnostics"
        imageUrl={IMAGES.govigyan.about.farm}
        imagePosition="left"
        content={
          <div className="space-y-6">
            <p>
              To properly understand our impact, you must look below the surface. A handful of healthy soil from a Govigyan farm contains more living organisms than there are human beings on the planet. This staggering microscopic diversity forms the structural architecture of profound fertility.
            </p>
            <p>
              Fungal hyphae stretch for miles in the incredibly dense top layers, structurally acting as a massively expansive root extension for the crops. They actively mine deep lock-up minerals from the bedrock and trade them with the plant roots in exchange for liquid carbon sugars. This beautiful microscopic trade network is the absolute foundation of all terrestrial life.
            </p>
            <p>
              When a farm relies heavily on synthetic fertilizers and toxic pesticides, this entire network is brutally incinerated. The soil chemically collapses. Our stringent methodology strictly ensures that absolutely nothing is applied to our fields that would harm this delicate, incredibly powerful biological internet.
            </p>
          </div>
        }
      />

      <ContentSection 
        title="Harmonizing With Nature" 
        subtitle="Farm Ecology"
        variant="light"
      >
        <p>
          A Govigyan farm does not resemble a conventional modern farm. You will not find absolutely sterile, perfectly straight rows of a single heavily pesticide-laden monocrop devoid of all other life. Instead, our fields are chaotic, intensely vibrant polycultures. We aggressively plant multiple species in incredible density to mimic the natural structure of a forest.
        </p>
        <p>
          Different plant species have fundamentally different root depths and exude entirely different carbon compounds into the soil. By mixing them aggressively, we cultivate a significantly more diverse and resilient microbiome. This fierce diversity naturally confused pests and provides heavily complex overlapping habitats for beneficial predatory insects and vital pollinating birds.
        </p>
        <p>
          We manage the farm as a single, incredibly complex living organism where every weed, every insect, and every crop has a specifically designed structural purpose. We do not fight nature; we aggressively leverage its brutal efficiency.
        </p>
      </ContentSection>

      <ImageTextSection 
        title="The Long Term Vision"
        subtitle="Sustaining Generations"
        imageUrl={IMAGES.govigyan.about.farmVertical}
        imagePosition="right"
        content={
          <div className="space-y-6">
            <p>
              The impact of entirely destroying the local soil microbiome takes massive decades to fully manifest, and the process of heavily aggressively regenerating it is equally profound. It is not an incredibly massive quick fix; it is a serious, generational commitment to the earth.
            </p>
            <p>
              We are deeply building an agricultural structure that will not just sustain our current population, but will fiercely thrive for hundreds of years. The soil we are aggressively building today will be the immensely fertile inheritance of future generations long after we are gone.
            </p>
            <p>
              By heavily prioritizing the incredibly deep health of our land over short-term destructive chemical profits, we are fundamentally ensuring that the profound legacy of Govigyan is one of deep ecological healing and absolutely staggering natural abundance.
            </p>
          </div>
        }
      />
    </div>
  );
}

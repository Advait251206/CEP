import HeroSection from '../../components/sections/HeroSection';
import ContentSection from '../../components/sections/ContentSection';
import ImageTextSection from '../../components/sections/ImageTextSection';
import { IMAGES } from '../../constants/images';

export default function Impact() {
  return (
    <div className="w-full">
      <HeroSection 
        title="Metrics of Immense Resilience"
        subtitle="We do not measure our staggering success in mere sympathetic gestures. We track brutal, highly quantifiable metrics of massive ecological restoration and profound human financial independence."
        imageUrl={IMAGES.anandwan.projects.story} // Reusing image contextually
      />

      <ContentSection 
        title="The Ecological Audit" 
        subtitle="Massive Afforestation Data"
        variant="dark"
      >
        <p>
          The original fifty acres of intensely barren wasteland granted to Baba Amte in 1949 possessed an absolutely catastrophic biological profile. It held absolutely zero measurable topsoil, zero structural organic carbon, and completely failed all fundamental hydrological retention tests. The bedrock was essentially exposed, searing hot stone.
        </p>
        <p>
          Today, incredibly rigorous satellite mapping and highly aggressive soil audits confirm a staggering absolute reversal. The residents of Anandwan have fiercely planted and successfully cultivated over 1.5 million indigenous trees. This massive, intensely resilient artificial forest has radically lowered the ambient temperature of the local micro-climate by an astonishing 3 degrees Celsius during peak summer.
        </p>
        <p>
          The sheer volume of deep roots has violently cracked the underlying bedrock, permitting massive amounts of rainwater to heavily infiltrate the once-dead aquifers. The local water table, which previously lay entirely inaccessible, has violently surged upwards by over forty feet, creating a permanently self-sustaining, deeply lush hydrological loop.
        </p>
      </ContentSection>

      <ImageTextSection 
        title="Eradicating Massive Poverty"
        subtitle="Financial Sovereignty"
        imageUrl={IMAGES.anandwan.home.community} // Reusing image contextually
        imagePosition="left"
        content={
          <div className="space-y-6">
            <p>
              The most profound impact of Anandwan is radically economic. When a resident first enters our massive gates, their financial net worth is generally incredibly negative, burdened by severe, aggressive exploitation and extreme medical debts. They are totally reliant on the incredibly meager, brutally insufficient charity of the street.
            </p>
            <p>
              Within thirty-six intensely rigorous months of engaging incredibly heavily with our massive industrial and agricultural training cooperatives, that same resident operates with absolute, fierce financial independence. They possess highly banked savings, zero debts, and incredibly massive, highly salable technical skills that make them fiercely competitive anywhere in the world.
            </p>
            <p>
              We have completely permanently eradicated extreme financial destitution for over twenty thousand deeply marginalized individuals. This is not a charitable statistic; it is a staggering macroeconomic triumph proving that intense, brutal, highly customized industrial training can completely permanently neutralize the direst poverty on earth.
            </p>
          </div>
        }
      />

      <ContentSection 
        title="The Advanced Medical Triumphs" 
        subtitle="Beyond Leprosy"
        variant="light"
      >
        <p>
          While Anandwan originally began incredibly heavily focused exclusively on leprosy rehabilitation, the massive expansion of our fiercely advanced medical facilities has profoundly transformed the local healthcare landscape. We currently operate massive, intensely specialized surgical theaters heavily dedicated to incredibly complex reconstructive orthopedic surgeries, aggressively restoring deep physical mobility to thousands of paralyzed residents.
        </p>
        <p>
          Our fiercely dedicated medical research wings are aggressively publishing massively critical data on the incredible long-term neurological recuperation of leprosy patients. We have heavily proven that intensely structured physical labor acts as a vastly superior neurological stimulant, significantly accelerating incredibly profound peripheral nerve regeneration when aggressively combined with multi-drug therapy.
        </p>
      </ContentSection>

      <ImageTextSection 
        title="The Eradication of Stigma"
        subtitle="Social Metrics"
        imageUrl={IMAGES.anandwan.about.team} // Reusing image contextually
        imagePosition="right"
        content={
          <div className="space-y-6">
            <p>
              Perhaps the most insanely difficult metric to definitively track is the total eradication of deep psychological societal stigma. However, we measure this incredibly massive victory through the fierce influx of external society willingly entering our heavily fortified gates.
            </p>
            <p>
              Decades ago, healthy society was totally terrified of the very shadow of a resident. Today, thousands of fiercely brilliant university students, deeply advanced corporate executives, and massive international tourists voluntarily flock to Anandwan to incredibly heavily study our massive architectural and agricultural success models.
            </p>
            <p>
              When massive throngs of completely healthy individuals arrive in sheer awe to aggressively learn deep industrial skills from our intensely disabled master craftsmen, the incredibly brutal social stigma is not just defeated—it is violently, unconditionally shattered forever.
            </p>
          </div>
        }
      />
    </div>
  );
}

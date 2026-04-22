import HeroSection from '../../components/sections/HeroSection';
import ContentSection from '../../components/sections/ContentSection';
import ImageTextSection from '../../components/sections/ImageTextSection';
import { IMAGES } from '../../constants/images';

export default function GovigyanLivestock() {
  return (
    <div className="w-full">
      <HeroSection 
        title="Indigenous Heritage"
        subtitle="Preserving the sacred genetic lineage of native cattle. They are not units of dairy production; they are the fundamental ecological engineers of the entire agricultural system."
        imageUrl={IMAGES.govigyan.livestock.cowClose}
      />

      <ContentSection 
        title="The Extinction Crisis" 
        subtitle="The Cost of Commercialization"
        variant="dark"
      >
        <p>
          Over the last several decades, traditional agricultural wisdom was violently displaced by aggressive commercialization. In deeply misguided attempts to increase sheer volume of milk production, native cattle breeds were systematically crossbred with imported, genetically altered breeds like jerseys and holsteins. 
        </p>
        <p>
          This shortsighted policy led to a catastrophic decline in the pure genetic lines of indigenous breeds such as the Gir, Sahiwal, Red Sindhi, and Khillar. While the crossbreeds indeed produced more milk temporarily, they proved highly susceptible to local diseases, required immense amounts of unnatural feed, and most dreadfully, their byproducts entirely lacked the specific microbial density needed to fertilize the native soil.
        </p>
        <p>
          We are currently witnessing the tragic, rapid extinction of these beautiful, hyper-resilient indigenous breeds. With their disappearance, we lose millions of years of evolutionary adaptation, and we lose the only biological mechanism capable of healing our rapidly desertifying land.
        </p>
      </ContentSection>

      <ImageTextSection 
        title="Sanctuary & Preservation"
        subtitle="The Purebred Revival"
        imageUrl={IMAGES.govigyan.livestock.cowGroup}
        imagePosition="left"
        content={
          <div className="space-y-6">
            <p>
              The Govigyan sanctuary operates as a vital genetic reserve. We meticulously maintain strictly purebred herds, entirely isolated from commercial hybrid operations. These cattle are allowed to live out their full natural lifespans in environments deeply respectful of their natural behaviors.
            </p>
            <p>
              They are never tied in cramped dark stalls, nor are they ever subjected to artificial hormone manipulations. They roam freely across expansive, organically managed pastures, grazing on a highly complex diet of native grasses, medicinal shrubs, and nutrient-dense fodder. This autonomy and lack of biological stress is not just ethical—it is scientifically necessary to maintain the incredibly high concentration of beneficial bacteria in their gut biome.
            </p>
            <p>
              By rigorously protecting these bloodlines, we are not just saving an animal species. We are safeguarding the biological software required to reboot the dead soil of the subcontinent.
            </p>
          </div>
        }
      />

      <ContentSection 
        title=" Beyond Milk Production" 
        subtitle="The Economics of Ecology"
        variant="light"
      >
        <p>
          Our economic model radically subverts the modern dairy industry. We recognize that the absolute highest value of our indigenous cattle does not lie in their milk yields, but in their capacity to generate hyper-potent bio-fertilizers.
        </p>
        <p>
          The dung and urine harvested from a single healthy, free-grazing indigenous cow, when properly processed in our Govigyan compost and slurry facilities, can provide enough complete organic nutrition to fertilize up to thirty acres of land annually. The economic value of this massive reduction in chemical fertilizer dependency far exceeds the fleeting profits of commercial milk sales. They are the supreme wealth generators of a sustainable future.
        </p>
      </ContentSection>
    </div>
  );
}

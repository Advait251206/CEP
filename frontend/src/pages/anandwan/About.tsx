import HeroSection from '../../components/sections/HeroSection';
import ContentSection from '../../components/sections/ContentSection';
import ImageTextSection from '../../components/sections/ImageTextSection';
import { IMAGES } from '../../constants/images';

export default function AnandwanAbout() {
  return (
    <div className="w-full">
      <HeroSection 
        title="The Forest Reborn"
        subtitle="Uncover the brutal, extraordinary history of how fifty acres of cursed wasteland became the most profound testament to human dignity and ecological reclamation on earth."
        imageUrl={IMAGES.anandwan.about.hero}
      />

      <ImageTextSection 
        title="The 1949 Wasteland"
        subtitle="The Origin Story"
        imageUrl={IMAGES.anandwan.about.history}
        imagePosition="left"
        content={
          <div className="space-y-6">
            <p>
              In exactly 1949, Baba Amte, driven by a deeply unsettling encounter with a dying leprosy patient named Tulshiram, abandoned a highly lucrative legal career. He requested land from the government to establish an asylum for those afflicted by the disease. In response, they granted him fifty acres of utterly cursed, heavily rocky, and completely barren scrubland in the remote jungles of central Maharashtra.
            </p>
            <p>
              The land was terrifying. It was heavily infested with scorpions, massive snakes, and roaming wild animals. There were absolutely no water sources, no structural utilities, and no roads. The soil was universally deemed dead by agricultural authorities, entirely incapable of sustaining even wild shrubs, let alone extensive human agricultural settlement.
            </p>
            <p>
              Arriving with nothing but a few rupees, a lame cow, and a half-dozen leprosy patients whose limbs were severely damaged or missing, Baba Amte surveyed the wasteland. Where the outside world saw absolute death and impossible hardship, his fierce vision saw a blank canvas. This utterly desolate stretch of earth was to become Anandwan.
            </p>
          </div>
        }
      />

      <ContentSection 
        title="The Philosophy of Blood and Sweat" 
        subtitle="Structural History"
        variant="dark"
      >
        <p>
          The fundamental philosophy that drove the initial construction of Anandwan was incredibly strict: absolutely no reliance on the charity of pity. Baba Amte firmly believed that offering someone mere charity destroyed their soul, while offering them purposeful work rebuilt their spine. The patients themselves had to clear the dense scrub, break the solid bedrock, and dig the water wells with their severely compromised hands.
        </p>
        <p>
          It was an excruciatingly difficult process that required horrific amounts of physical labor. Because leprosy heavily attacks the nervous system and causes profound physical deformities, simple tasks like swinging a pickaxe or lifting boulders were incredibly dangerous and painful. Yet, they refused to stop. They tied the heavy tools directly to their malformed stumps and continued aggressively digging through the solid stone.
        </p>
        <p>
          As they finally struck water deep below the arid bedrock, a profound psychological shift occurred. The water pouring from the ground was absolute proof that they, the societal rejects, possessed the immense power to force life out of a dead earth. The water didn't just hydrate the barren soil; it permanently extinguished their deep internal shame. 
        </p>
      </ContentSection>

      <ImageTextSection 
        title="The Great Struggle"
        subtitle="Facing Nature's Wrath"
        imageUrl={IMAGES.anandwan.about.struggle2}
        imagePosition="right"
        content={
          <div className="space-y-6">
            <p>
              The initial years were defined by constant, terrifying struggles against an unforgiving wilderness. The residents possessed no structural defenses against the harsh elements. When the heavy monsoon rains inevitably flooded their fragile bamboo and grass huts, they lost months of painstakingly hoarded meager provisions. When the intense summer droughts struck, entire crops withered instantly.
            </p>
            <p>
              Furthermore, the stigma surrounding leprosy was so incredibly toxic that neighboring farming villages maintained a severely hostile distance. They refused to trade seeds, prevented access to broader water tables, and often attempted to physically sabotage the early electrical lines being run into the commune. The residents of Anandwan were completely and utterly abandoned by the outside society.
            </p>
            <p>
              But this total isolation proved to be the absolute greatest catalyst. Because they could not rely on anyone else, they were forced into radical self-reliance. They became brilliant innovators out of sheer desperation—inventing highly efficient gravity-fed water channels, constructing durable massive stone housing entirely by hand, and engineering agricultural tools specifically customized for bodies missing fingers or limbs.
            </p>
          </div>
        }
      />

      <ImageTextSection 
        title="Breaking The Societal Chains"
        subtitle="Struggle & Acceptance"
        imageUrl={IMAGES.anandwan.about.struggle4}
        imagePosition="left"
        content={
          <div className="space-y-6">
            <p>
              As the physical infrastructure of Anandwan slowly solidified into permanence, a secondary, far more insidious struggle remained: forcing society to acknowledge their humanity. The outside world continued to view leprosy patients as cursed and dangerous, refusing to recognize the massive, thriving eco-village they had silently built.
            </p>
            <p>
              The shift came only through absolute, undeniable excellence. The residents decided that if they were to produce goods or crops, those products had to be not just adequate, but significantly superior to the products created by the healthy world. They produced massive yields of incredibly high-quality organic cotton, beautifully complex textiles, and flawless wooden furniture.
            </p>
            <p>
              When heavily reluctant buyers finally purchased these goods and witnessed their unmatched quality, the walls of severe prejudice began to crack. The realization that a community of "invalids" was producing superior agricultural and industrial output forced the outside society into profound introspection. The social chains were not broken through begging; they were broken through sheer, undeniable macroeconomic competence.
            </p>
          </div>
        }
      />

      <ImageTextSection 
        title="The Radical Collective"
        subtitle="Teamwork and Convergence"
        imageUrl={IMAGES.anandwan.about.team}
        imagePosition="right"
        content={
          <div className="space-y-6">
            <p>
              Today, the massive success of Anandwan relies on the highly synchronized orchestration of an incredibly diverse collective. As the village aggressively expanded over the decades, it opened its heavily fortified gates not just to those suffering from leprosy, but to the blind, the deaf, the physically impaired, and the severely deeply impoverished tribal communities.
            </p>
            <p>
              This created an unprecedented convergence of disparate abilities. A profound physiological symbiosis emerged: a blind resident would meticulously operate the heavy machinery while a deaf resident would continuously verify the visual mechanical output. A resident missing their legs would manage the complex administrative accounting while a resident with strong limbs would physically transport the goods across the vast industrial sectors.
            </p>
            <p>
              This is the literal manifestation of Baba Amte's core ideology. In this collective, the perceived "deficiencies" of the individual are entirely eradicated by the overwhelming structural competence of the team. They operate as one massive, seamlessly integrated organism, completely neutralizing physical disability through communal optimization.
            </p>
          </div>
        }
      />

      <ContentSection 
        title="The Ongoing Vision" 
        subtitle="Looking Forward"
        variant="light"
      >
        <p>
          What truly makes Anandwan staggering is not merely its history of conquering death, but its aggressive, highly optimized vision for the future of human ecological survival. The village has effectively become a globally recognized, sprawling university for radical sustainability and advanced organic architecture.
        </p>
        <p>
          We are currently executing massive, deeply complex afforestation projects that are aggressively pushing back the bounds of regional desertification. Our energy reliance is continuously shifting heavily towards massive indigenous bio-gas grids and deeply optimized solar architecture. We are actively proving, on a massive scale, that a zero-waste, entirely circular economy is not a utopian fantasy, but an incredibly viable economic reality.
        </p>
        <p>
          The original fifty acres of barren stone have fundamentally transformed the lives of tens of thousands of individuals. They have shown the modern world that true ecological and economic sustainability requires more than just capital; it requires the absolute, unyielding spirit of human dignity. The forest continues to grow, and the joy it represents continues to aggressively spread outward.
        </p>
      </ContentSection>

    </div>
  );
}

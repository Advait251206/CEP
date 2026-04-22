import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Product } from './src/models/Product';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cep';

const imageListStr = [
'Vanari_Gutika_prrl3r.jpg',
'Vanari_Gutika_Combo_Pack_Pack_Of_3_i0vnxb.jpg',
'Ubtan_snobnz.jpg',
'Ubtan_Combo_Offer_Pack_of_5_qdsore.jpg',
'Takrarishta_nttptg.jpg',
'Switranashak_Vati_nt8wbf.jpg',
'Switranashak_Lep_rfhclo.jpg',
'Shatdhaut_Ghrut_gbee8w.jpg',
'Phala_Ghrut_lwil2n.jpg',
'Pure_Honey_200_ml_ueefvi.webp',
'Panchtikta_Ghrut_Harde_Churna_and_Hingvadya_Ghrut_Combo_c041sc.png',
'Panchtikta_Ghrut_and_Laghusoot_Shekhar_Ras_Combo_Pack_ed3hbp.png',
'Panchtikta_Ghrut_and_Hingvadya_Ghrut_Combo_qegerv.png',
'Panchgavya_Ghrut_Swalpam_100ml_hlvukj.jpg',
'Panchgavya_Ghrut_Swalpam_50ml_ljanys.jpg',
'Panchgavya_Ghrut_Swalpam_25ml_ymd3vd.jpg',
'Panchatikta_Ghrut_qoqn8l.jpg',
'Naree_Sanjiwanee_Sirap_bkm0g0.jpg',
'Narayan_Tel_ycakjy.jpg',
'Mogra_Agarbatti_Combo_Pack_Pack_of_9_ehwenv.jpg',
'Mix_Agarbatti_vpsgu2.jpg',
'Medohar_Ark_nbwkhe.jpg',
'Medohar_Ark_Combo_Pack_Pack_of_5_dkez6k.jpg',
'Medohar_Ark_Combo_Pack_Pack_of_2_h5wylc.jpg',
'Marham_inqn6m.jpg',
'Malish_Tel_-_50ML_lnenve.jpg',
'Lakshadi_Tel_bxof8e.jpg',
'Laghu_Sutshekar_Ras_60_Pills_pig6th.jpg',
'Kewda_Agarbatti_Combo_Pack_Pack_of_9_ynudtv.jpg',
'Kesh_tel_Antidandruff_lotion_zjigkh.jpg',
'Kesh_Tel_100ML_tvquxj.jpg',
'Kamdhenu_Urjaprash_with_Kesar_500gm_czq5qu.jpg',
'Kamdhenu_Urjaprash_with_Kesar_1kg_d1ooqh.jpg',
'Kamdhenu_100_Pure_Desi_Cow_Ghee_dexi55.webp',
'Kamdhenu_100_Pure_Desi_Cow_Ghee_250ml_pbctmu.webp',
'Kamdhenu_100_Pure_Desi_Cow_Ghee_500ml_slvr7j.webp',
'Kamdhenu_100_Pure_Desi_Cow_Ghee_1Lt_lwe4tz.webp',
'Isab_Lep_Tikiya_kisyga.jpg',
'Jatyadi_Ghrut_lcmv6j.jpg',
'Hingvadya_Ghrut-_100ML_rqekps.jpg',
'Hingvadya_Ghrut-_25ML_iehwth.jpg',
'Hingvadya_Ghrut_50ML_bp7gie.jpg',
'Harde_Churna_co10dd.jpg',
'Haldi_Ghanvati_wbexq0.jpg',
'Haldi_Ghanvati_Combo_Pack_Pack_of_5_Gomutra_Ark_ap3m3h.png',
'Gulab_Agarbatti_Combo_Pack_Pack_of_9_budezt.jpg',
'Haldi_Ghanvati_Combo_Pack_Pack_of_5_umcwjf.jpg',
'Gou_Natural_Ubtan_Soap_75_Gram_oamdpz.jpg',
'Gou_Natural_Mix_Soap_75_Gram_pdet89.jpg',
'Gou_Natural_Milk-Honey_Soap_yiclke.jpg',
'Gou_Natural_Haldi_Chandan_Soap_100_Gram_hzmzga.webp',
'Gomyadi_Tel_vuxu17.jpg',
'Gomutra_Ark-_500ML_my4qyk.jpg',
'Gomutra_Ark-_200ML_obuqnl.jpg',
'Gomutra_Aasawa_wudx2d.jpg',
'Gomayadi_Lep_Tikiya_m1n0vq.jpg',
'Gomayadi_Lep_Tikiya_we1gd3.jpg',
'Gomay_Bhasma_Dantmanjan_cwekka.jpg',
'Dhup_Bhatti_zl0ztm.jpg',
'Chandan-Dhup_rajblg.jpg',
'Chandanadi_Yamak_aacud6.jpg',
'Balya_Syrup_fvljzv.jpg',
'Chandan-Aagarbatii-Combo_ojnu1w.jpg',
'Balpal_Ras_yghzqf.jpg',
'Baladi_Tel_li9abl.jpg',
'Arshohar_Marham_zucx2x.jpg',
'Arjun_Ghrut_qstcyn.jpg',
'Anti_Dandruff_Lotion_n00pol.jpg',
'Ashtamangal_Ghrut_mzsl72.jpg'
];

function normalize(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const normImages = imageListStr.map(f => {
  const norm = normalize(f.replace(/_[a-z0-9]+\.(jpg|webp|png)$/i, ''));
  return { file: f, url: 'https://res.cloudinary.com/dyormiiop/image/upload/q_auto/f_auto/v1775768101/' + f, norm: norm };
});

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    await Product.deleteMany({});
    console.log('Cleared existing products.');

    const descPath = path.resolve(__dirname, '../frontend/desc.txt');
    const lines = fs.readFileSync(descPath, 'utf-8').split('\n');

    const productsData: any[] = [];
    let currentProduct: any = null;
    let currentField = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith('size') || line === 'Clear') continue; 
        
        if (line.includes('₹')) {
            if (currentProduct) {
                let parsedPrice = 999;
                let parsedOrigPrice;
                if (line.includes('Current price is:')) {
                    const matchCurrent = line.match(/Current price is:\s*₹([0-9.]+)/);
                    if (matchCurrent) parsedPrice = parseFloat(matchCurrent[1]);
                    
                    const matchOrig = line.match(/Original price was:\s*₹([0-9.]+)/);
                    if (matchOrig) parsedOrigPrice = parseFloat(matchOrig[1]);
                } else {
                    const matches = line.match(/₹([0-9.]+)/g);
                    if (matches && matches.length > 0) {
                        parsedPrice = parseFloat(matches[matches.length - 1].replace('₹', ''));
                    }
                }
                currentProduct.price = parsedPrice;
                if (parsedOrigPrice) {
                    currentProduct.originalPrice = parsedOrigPrice;
                }
            }
            continue;
        }
      
        if (!currentProduct) {
          currentProduct = { name: line, description: '', ingredients: '', howToUse: '', stock: '', price: 999, originalPrice: undefined }; // default price if missing
          currentField = 'name';
        } else if (line.toLowerCase().startsWith('description') || line.toLowerCase().startsWith('discription')) {
          currentField = 'description';
        } else if (line.toLowerCase().startsWith('ingredients')) {
          currentField = 'ingredients';
        } else if (line.toLowerCase().startsWith('health benefits') || line.toLowerCase().startsWith('benefits')) {
          currentField = 'description'; // Append to description
        } else if (line.toLowerCase().startsWith('how to use') || line.toLowerCase().startsWith('how to apply') || line.toLowerCase().startsWith('how do i use this')) {
          currentField = 'howToUse';
        } else if (line.toLowerCase().includes('in stock')) {
          currentProduct.stock = line;
          productsData.push(currentProduct);
          currentProduct = null;
          currentField = '';
        } else {
            if (currentField && currentField !== 'name') {
                currentProduct[currentField] += (currentProduct[currentField] ? '\n' : '') + line;
            }
        }
    }

    const matchedProducts = [];

    for (const p of productsData) {
        if(p.name === 'Gou Natural Milk-Honey Soap 100 Gram') continue; // omit the extra item
       
        let np = normalize(p.name);
        if (np === normalize('Chandan Dhoop Batti Combo Offer (Pack of 5)')) np = normalize('Chandan-Dhup');
        if (np === normalize('Chandan Agarbatti Combo Pack(Pack of 9)')) np = normalize('Chandan-Aagarbatii-Combo');
        if (np === normalize('Dhoop Bhatti Combo Pack(Pack of 6)')) np = normalize('Dhup_Bhatti');
        if (np.includes('100gram')) np = np.replace('100gram', '');
        if (np.includes('50ml') && p.name === 'Hingvadya Ghrut – 50ML') np = normalize('Hingvadya_Ghrut_50ML');

        const matchIdx = normImages.findIndex(ni => ni.norm === np || ni.norm.includes(np) || np.includes(ni.norm));
        
        if (matchIdx !== -1) {
            const match = normImages[matchIdx];
            matchedProducts.push({
                title: p.name,
                description: p.description || 'Premium standard product from Govigyan.',
                ingredients: p.ingredients || '',
                howToUse: p.howToUse || '',
                stock: p.stock || 'In Stock',
                price: p.price,
                originalPrice: p.originalPrice,
                image: match.url,
                category: 'Govigyan'
            });
            normImages.splice(matchIdx, 1);
        } else {
            console.log('UNMATCHED DURING SEEDING:', p.name);
            console.log('Norm:', np);
            console.log('Remaining pool:', normImages.map(n => n.norm));
        }
    }

    console.log(`Matched and inserting ${matchedProducts.length} items to database...`);

    if (matchedProducts.length > 0) {
        await Product.insertMany(matchedProducts);
        console.log('Seeding completed successfully!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Seeding standard error:', error);
    process.exit(1);
  }
};

seedDatabase();

export interface Medicine {
  id: string;
  name: string;
  mainUses: {
    en: string;
    hi: string;
  };
  potency: string;
  dosage: string;
  category: string[];
}

export const medicines: Medicine[] = [
  {
    id: '1',
    name: 'Arsenicum Album',
    mainUses: {
      en: 'Great for food poisoning, anxiety, and restlessness. Used for watery cold and burning pains.',
      hi: 'खाद्य विषाक्तता, चिंता और बेचैनी के लिए बहुत अच्छा। पानी जैसा जुकाम और जलन वाले दर्द के लिए उपयोग किया जाता है।',
    },
    potency: '30CH',
    dosage: '2 drops on tongue, 3 times daily.',
    category: ['Fever', 'Skin Problems', 'Digestion'],
  },
  {
    id: '2',
    name: 'Belladonna',
    mainUses: {
      en: 'Used for sudden onset of high fever, throbbing headache, and redness with heat.',
      hi: 'अचानक तेज बुखार, धड़कते सिरदर्द और गर्मी के साथ लाली के लिए उपयोग किया जाता है।',
    },
    potency: '200CH',
    dosage: '2 drops in a teaspoon of water every 2 hours during acute phase.',
    category: ['Fever', 'Headache'],
  },
  {
    id: '3',
    name: 'Nux Vomica',
    mainUses: {
      en: 'Primary remedy for digestive issues, constipation, and hangovers. Good for irritable individuals.',
      hi: 'पाचन संबंधी समस्याओं, कब्ज और हैंगओवर के लिए प्राथमिक उपचार। चिड़चिड़े व्यक्तियों के लिए अच्छा।',
    },
    potency: '30CH',
    dosage: '2 drops at night before sleeping.',
    category: ['Digestion'],
  },
  {
    id: '4',
    name: 'Aconitum Napellus',
    mainUses: {
      en: 'First stage of any illness caused by sudden exposure to cold wind. High anxiety.',
      hi: 'ठंडी हवा के अचानक संपर्क में आने से होने वाली किसी भी बीमारी का पहला चरण। अत्यधिक चिंता।',
    },
    potency: '30CH',
    dosage: '2 drops every 1 hour for first 3 doses.',
    category: ['Fever', 'Cold'],
  },
  {
    id: '5',
    name: 'Rhus Toxicodendron',
    mainUses: {
      en: 'Used for joint pains, sprains, and skin rashes with itching. Pains improve with motion.',
      hi: 'जोड़ों के दर्द, मोच और खुजली वाले त्वचा के चकत्तों के लिए उपयोग किया जाता है। चलने-फिरने से दर्द में सुधार होता है।',
    },
    potency: '200CH',
    dosage: '2 drops morning and evening.',
    category: ['Skin Problems', 'Joint Pain'],
  },
  {
    id: '6',
    name: 'Bryonia Alba',
    mainUses: {
      en: 'Effective for dry cough and pains that worsen with any movement. Extreme thirst for large quantities.',
      hi: 'सूखी खांसी और दर्द के लिए प्रभावी जो किसी भी हलचल से बढ़ जाता है। अधिक मात्रा में पानी की प्यास।',
    },
    potency: '30CH',
    dosage: '2 drops 3 times a day.',
    category: ['Fever', 'Cough'],
  },
  {
    id: '7',
    name: 'Apis Mellifica',
    mainUses: {
      en: 'For stinging pains, swelling, and puffiness. Useful in hives and allergic reactions.',
      hi: 'चुभने वाले दर्द, सूजन और फुलाव के लिए। पित्ती और एलर्जी प्रतिक्रियाओं में उपयोगी।',
    },
    potency: '30CH',
    dosage: '2 drops 4 times a day.',
    category: ['Skin Problems', 'Swelling'],
  },
  {
    id: '8',
    name: 'Pulsatilla Nigricans',
    mainUses: {
      en: 'For changeable symptoms and emotional sensitivity. Thirstless even with fever.',
      hi: 'परिवर्तनशील लक्षणों और भावनात्मक संवेदनशीलता के लिए। बुखार होने पर भी प्यास नहीं लगती।',
    },
    potency: '30CH',
    dosage: '2 drops 3 times a day.',
    category: ['Fever', 'Cold'],
  },
  {
    id: '9',
    name: 'Gelsemium',
    mainUses: {
      en: 'For flu with dullness, dizziness, and drowsiness. Muscles feel heavy and weak.',
      hi: 'सुस्ती, चक्कर आना और उनींदापन के साथ फ्लू के लिए। मांसपेशियां भारी और कमजोर महसूस होती हैं।',
    },
    potency: '200CH',
    dosage: '2 drops 2 times a day.',
    category: ['Fever', 'Flu'],
  },
  {
    id: '10',
    name: 'Chamomilla',
    mainUses: {
      en: 'Highly effective for intense pain and irritability, especially in children during teething.',
      hi: 'तीव्र दर्द और चिड़चिड़ेपन के लिए अत्यधिक प्रभावी, विशेष रूप से दांत निकलने के दौरान बच्चों में।',
    },
    potency: '30CH',
    dosage: '2 drops every 30 minutes in acute pain.',
    category: ['Digestion', 'Pain'],
  },
];

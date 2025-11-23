import { TranslatedProfile } from './aiService';

// Pre-processed producers for demo
// In production, these would come from a database
export const seedProducers: TranslatedProfile[] = [
  {
    original: {
      name: 'Manolis Estate',
      location: 'Rethymno, Crete',
      productType: 'Olive Oil',
      descriptionGreek:
        'Παράγουμε βιολογικό εξαιρετικό παρθένο ελαιόλαδο από οικογενειακό ελαιώνα 100 ετών',
      photoUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    },
    translations: {
      en: 'We produce organic extra virgin olive oil from our 100-year-old family olive grove',
      de: 'Wir produzieren biologisches natives Olivenöl extra aus unserem 100 Jahre alten Familienhain',
      fr: "Nous produisons de l'huile d'olive extra vierge biologique de notre oliveraie familiale centenaire",
      it: "Produciamo olio extravergine d'oliva biologico dal nostro uliveto di famiglia centenario",
      es: 'Producimos aceite de oliva virgen extra orgánico de nuestro olivar familiar de 100 años',
      pt: 'Produzimos azeite extra virgem orgânico de nossa oliveira familiar centenária',
    },
    storytelling: {
      en: 'For four generations, the Manolis family has tended ancient olive trees in the mountains of Rethymno, Crete. Each harvest is a celebration of tradition, yielding award-winning organic extra virgin olive oil with notes of fresh herbs and a peppery finish.',
      de: 'Seit vier Generationen pflegt die Familie Manolis uralte Olivenbäume in den Bergen von Rethymno, Kreta. Jede Ernte ist ein Fest der Tradition und bringt preisgekröntes biologisches natives Olivenöl extra mit Noten frischer Kräuter hervor.',
      fr: "Depuis quatre générations, la famille Manolis cultive des oliviers centenaires dans les montagnes de Rethymno, en Crète. Chaque récolte est une célébration de la tradition, produisant une huile d'olive extra vierge biologique primée.",
    },
    keywords: [
      'olive oil',
      'organic',
      'Crete',
      'family estate',
      'artisan',
      'traditional',
    ],
    category: 'Artisan Food',
  },
  {
    original: {
      name: 'Naxos Pottery Studio',
      location: 'Naxos, Cyclades',
      productType: 'Ceramics',
      descriptionGreek:
        'Χειροποίητα κεραμικά εμπνευσμένα από την αρχαία ελληνική τέχνη',
      photoUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400',
    },
    translations: {
      en: 'Handmade ceramics inspired by ancient Greek art',
      de: 'Handgefertigte Keramik inspiriert von antiker griechischer Kunst',
      fr: "Céramiques artisanales inspirées de l'art grec ancien",
      it: "Ceramiche fatte a mano ispirate all'arte greca antica",
      es: 'Cerámicas hechas a mano inspiradas en el arte griego antiguo',
      pt: 'Cerâmicas artesanais inspiradas na arte grega antiga',
    },
    storytelling: {
      en: 'In a small studio overlooking the Aegean, master potter Elena creates vessels that echo 3,000 years of Greek ceramic tradition. Each piece is wheel-thrown and hand-painted with natural pigments, connecting ancient artistry with contemporary design.',
      de: 'In einem kleinen Atelier mit Blick auf die Ägäis erschafft Meistertöpferin Elena Gefäße, die 3.000 Jahre griechischer Keramiktradition widerspiegeln.',
      fr: "Dans un petit atelier surplombant la mer Égée, la maître potière Elena crée des pièces qui font écho à 3 000 ans de tradition céramique grecque.",
    },
    keywords: [
      'ceramics',
      'handmade',
      'Greek art',
      'Naxos',
      'pottery',
      'artisan',
    ],
    category: 'Handmade Crafts',
  },
  {
    original: {
      name: 'Santorini Vineyard',
      location: 'Oia, Santorini',
      productType: 'Wine',
      descriptionGreek:
        'Παραδοσιακά κρασιά Σαντορίνης από αμπέλια που καλλιεργούνται με τη μέθοδο του "κουλούρα"',
      photoUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400',
    },
    translations: {
      en: 'Traditional Santorini wines from vines cultivated using the "kouloura" basket method',
      de: 'Traditionelle Santorini-Weine von Reben, die nach der Korbmethode "Kouloura" angebaut werden',
      fr: "Vins traditionnels de Santorin issus de vignes cultivées selon la méthode du panier 'kouloura'",
      it: "Vini tradizionali di Santorini da viti coltivate con il metodo a cesto 'kouloura'",
      es: "Vinos tradicionales de Santorini de viñas cultivadas usando el método de cesta 'kouloura'",
      pt: "Vinhos tradicionais de Santorini de vinhas cultivadas usando o método de cesta 'kouloura'",
    },
    storytelling: {
      en: 'On volcanic soil under the intense Aegean sun, our family has cultivated Assyrtiko grapes for six generations. The unique "kouloura" basket pruning protects vines from harsh winds, producing wines with distinctive minerality and crisp acidity.',
      de: 'Auf vulkanischem Boden unter der intensiven ägäischen Sonne kultiviert unsere Familie seit sechs Generationen Assyrtiko-Trauben.',
      fr: 'Sur un sol volcanique sous le soleil intense de la mer Égée, notre famille cultive des raisins Assyrtiko depuis six générations.',
    },
    keywords: [
      'wine',
      'Santorini',
      'Assyrtiko',
      'volcanic',
      'traditional',
      'vineyard',
    ],
    category: 'Artisan Beverage',
  },
  {
    original: {
      name: 'Cretan Herb Farm',
      location: 'Heraklion, Crete',
      productType: 'Herbs',
      descriptionGreek:
        'Άγρια κρητικά βότανα και μπαχαρικά που συλλέγονται με παραδοσιακές μεθόδους',
      photoUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400',
    },
    translations: {
      en: 'Wild Cretan herbs and spices collected using traditional methods',
      de: 'Wilde kretische Kräuter und Gewürze, die nach traditionellen Methoden gesammelt werden',
      fr: 'Herbes et épices crétoises sauvages récoltées selon des méthodes traditionnelles',
      it: 'Erbe e spezie cretesi selvatiche raccolte con metodi tradizionali',
      es: 'Hierbas y especias cretenses silvestres recolectadas usando métodos tradicionales',
      pt: 'Ervas e especiarias cretenses selvagens coletadas usando métodos tradicionais',
    },
    storytelling: {
      en: 'We traverse the Cretan mountains to hand-harvest wild oregano, thyme, and sage at peak potency. These aromatic treasures have been used in Greek cuisine and traditional medicine for millennia, carrying the essence of Mediterranean terroir.',
      de: 'Wir durchqueren die kretischen Berge, um wilden Oregano, Thymian und Salbei von Hand zu ernten.',
      fr: 'Nous parcourons les montagnes crétoises pour récolter à la main origan, thym et sauge sauvages.',
    },
    keywords: [
      'herbs',
      'spices',
      'wild',
      'Crete',
      'organic',
      'traditional',
    ],
    category: 'Artisan Food',
  },
  {
    original: {
      name: 'Rhodes Honey Collective',
      location: 'Rhodes, Dodecanese',
      productType: 'Honey',
      descriptionGreek:
        'Θυμαρίσιο μέλι από τις ανθισμένες πλαγιές της Ρόδου',
      photoUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784335?w=400',
    },
    translations: {
      en: 'Thyme honey from the flowering slopes of Rhodes',
      de: 'Thymianhonig von den blühenden Hängen von Rhodos',
      fr: 'Miel de thym des pentes fleuries de Rhodes',
      it: 'Miele di timo dai pendii fioriti di Rodi',
      es: 'Miel de tomillo de las laderas floridas de Rodas',
      pt: 'Mel de tomilho das encostas floridas de Rodes',
    },
    storytelling: {
      en: 'Our bees forage on wild thyme that carpets the hillsides of Rhodes, producing honey with a distinctive amber color and rich, herbaceous flavor. This golden nectar has been prized since ancient times for its exceptional quality and aromatic complexity.',
      de: 'Unsere Bienen sammeln auf wildem Thymian, der die Hügel von Rhodos bedeckt, und produzieren Honig mit einer charakteristischen bernsteinfarbenen Farbe.',
      fr: 'Nos abeilles butinent sur du thym sauvage qui tapisse les collines de Rhodes, produisant un miel de couleur ambrée distinctive.',
    },
    keywords: [
      'honey',
      'thyme',
      'Rhodes',
      'natural',
      'Greek',
      'artisan',
    ],
    category: 'Artisan Food',
  },
];
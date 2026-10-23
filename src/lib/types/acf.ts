export interface Ingredient {
  name: string;
  description?: string;
  ayurvedic_role?: string; // e.g. "Rasayana", "Deepana", "Pachana"
  image?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AyurvedicProperties {
  dosha_balance?: string; // e.g., "Pacifies Vata & Kapha, Balances Pitta"
  rasa?: string;          // Taste (e.g. Tikta, Kashaya, Madhura)
  virya?: string;         // Potency (e.g. Ushna - Hot, Sheeta - Cold)
  vipaka?: string;        // Post-digestive effect
}

export interface ACFProductFields {
  short_description?: string;
  key_benefits?: string[];
  ingredients?: Ingredient[];
  how_to_use?: string;
  suitable_for?: string[];
  not_suitable_for?: string[];
  health_concerns?: string[];
  ayurvedic_properties?: AyurvedicProperties;
  product_highlights?: string[];
  usage_instructions?: string;
  precautions?: string[];
  faqs?: FAQItem[];
  scientific_information?: string;
  product_story?: string;
  certifications?: string[];
  dosage?: string;
  recommended_duration?: string;
  expert_note?: string;
  frequently_bought_together?: string[]; // Slugs or IDs of complementary products
  related_health_concerns?: string[];
  product_badges?: string[]; // e.g. ["100% Organic", "GMP Certified", "Doctor Formulated"]
  product_video?: string;
  product_gallery?: string[];
  comparison_data?: Record<string, string>;
}

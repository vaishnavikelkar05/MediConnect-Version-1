package com.mediconnect.service;

import com.mediconnect.dto.RecommendRequest;
import com.mediconnect.dto.RecommendResponse;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RecommendationService {

    // Keyword map: specialist -> list of keywords/synonyms
    private static final Map<String, List<String>> SPECIALIST_KEYWORDS = new LinkedHashMap<>();

    static {
        SPECIALIST_KEYWORDS.put("Cardiologist", Arrays.asList(
                "chest pain", "chest", "heart", "palpitation", "palpitations",
                "shortness of breath", "breathlessness", "irregular heartbeat",
                "high blood pressure", "hypertension", "cardiac", "angina",
                "heart attack", "coronary", "arrhythmia", "tachycardia", "bradycardia"
        ));

        SPECIALIST_KEYWORDS.put("Dermatologist", Arrays.asList(
                "skin", "rash", "itching", "itch", "acne", "pimple", "pimples",
                "eczema", "psoriasis", "hives", "urticaria", "dry skin", "oily skin",
                "hair loss", "dandruff", "nail", "fungal", "wart", "mole",
                "sunburn", "allergy", "allergic reaction", "blisters", "blister"
        ));

        SPECIALIST_KEYWORDS.put("Neurologist", Arrays.asList(
                "headache", "migraine", "dizziness", "dizzy", "vertigo",
                "seizure", "epilepsy", "numbness", "tingling", "tremor",
                "memory loss", "confusion", "stroke", "paralysis", "weakness",
                "nerve pain", "neuropathy", "brain", "spinal", "fainting"
        ));

        SPECIALIST_KEYWORDS.put("Orthopedic", Arrays.asList(
                "bone", "joint", "fracture", "sprain", "back pain", "knee pain",
                "shoulder pain", "hip pain", "arthritis", "osteoporosis",
                "muscle pain", "muscle ache", "ligament", "tendon", "scoliosis",
                "neck pain", "wrist pain", "ankle pain", "foot pain", "sports injury"
        ));

        SPECIALIST_KEYWORDS.put("Gastroenterologist", Arrays.asList(
                "stomach", "abdomen", "abdominal pain", "nausea", "vomiting",
                "diarrhea", "constipation", "bloating", "gas", "acidity",
                "heartburn", "indigestion", "ulcer", "liver", "jaundice",
                "hepatitis", "gallstone", "ibs", "crohn", "colitis", "bowel"
        ));

        SPECIALIST_KEYWORDS.put("Pulmonologist", Arrays.asList(
                "cough", "chronic cough", "asthma", "breathing difficulty",
                "shortness of breath", "wheezing", "bronchitis", "pneumonia",
                "tuberculosis", "tb", "lung", "respiratory", "sputum",
                "chest tightness", "sleep apnea", "copd", "emphysema"
        ));

        SPECIALIST_KEYWORDS.put("ENT Specialist", Arrays.asList(
                "ear", "nose", "throat", "sore throat", "tonsil", "tonsillitis",
                "hearing loss", "ear pain", "earache", "runny nose", "blocked nose",
                "sinusitis", "sinus", "sneezing", "nasal", "hoarseness",
                "voice change", "swallowing difficulty", "tinnitus", "ringing in ear"
        ));

        SPECIALIST_KEYWORDS.put("Ophthalmologist", Arrays.asList(
                "eye", "vision", "blurred vision", "eye pain", "red eye",
                "watery eyes", "dry eyes", "cataract", "glaucoma", "retina",
                "conjunctivitis", "pink eye", "eye infection", "spectacles",
                "glasses", "contact lens", "night blindness", "double vision"
        ));

        SPECIALIST_KEYWORDS.put("Psychiatrist", Arrays.asList(
                "depression", "anxiety", "stress", "mental health", "panic attack",
                "insomnia", "sleep disorder", "mood swing", "bipolar", "schizophrenia",
                "ocd", "phobia", "hallucination", "suicidal", "eating disorder",
                "addiction", "substance abuse", "ptsd", "trauma", "anger"
        ));

        SPECIALIST_KEYWORDS.put("Endocrinologist", Arrays.asList(
                "diabetes", "thyroid", "hormonal", "hormone", "weight gain",
                "weight loss", "fatigue", "excessive thirst", "frequent urination",
                "hyperthyroidism", "hypothyroidism", "adrenal", "pituitary",
                "insulin", "blood sugar", "obesity", "metabolic"
        ));

        SPECIALIST_KEYWORDS.put("Urologist", Arrays.asList(
                "urinary", "urine", "kidney", "kidney stone", "bladder",
                "frequent urination", "burning urination", "blood in urine",
                "uti", "urinary tract infection", "prostate", "erectile",
                "incontinence", "renal", "nephrology"
        ));

        SPECIALIST_KEYWORDS.put("Gynecologist", Arrays.asList(
                "menstrual", "period", "irregular period", "pregnancy", "pregnant",
                "ovary", "uterus", "vaginal", "pcos", "pcod", "menopause",
                "breast pain", "pelvic pain", "fertility", "contraception",
                "discharge", "cervical", "endometriosis"
        ));

        SPECIALIST_KEYWORDS.put("Pediatrician", Arrays.asList(
                "child", "children", "baby", "infant", "toddler", "newborn",
                "vaccination", "growth", "development", "childhood", "kid",
                "fever in child", "child cough", "child vomiting"
        ));

        SPECIALIST_KEYWORDS.put("General Physician", Arrays.asList(
                "fever", "cold", "flu", "cough", "body ache", "weakness",
                "fatigue", "general checkup", "checkup", "routine", "viral",
                "infection", "mild pain", "headache", "temperature", "chills",
                "malaria", "typhoid", "dengue", "covid", "sore"
        ));
    }

    public RecommendResponse recommend(RecommendRequest request) {
        if (request.getSymptom() == null || request.getSymptom().trim().isEmpty()) {
            return new RecommendResponse("General Physician", "No symptoms provided. Recommending a general checkup.", 0);
        }

        String symptomInput = request.getSymptom().toLowerCase().trim();

        String bestSpecialist = "General Physician";
        int highestScore = 0;
        String bestReason = "Based on your symptoms, a General Physician can evaluate and refer you further.";

        for (Map.Entry<String, List<String>> entry : SPECIALIST_KEYWORDS.entrySet()) {
            String specialist = entry.getKey();
            List<String> keywords = entry.getValue();
            int score = 0;
            List<String> matchedKeywords = new ArrayList<>();

            for (String keyword : keywords) {
                if (symptomInput.contains(keyword)) {
                    // Multi-word keywords get higher score
                    score += keyword.split("\\s+").length > 1 ? 3 : 1;
                    matchedKeywords.add(keyword);
                }
            }

            if (score > highestScore) {
                highestScore = score;
                bestSpecialist = specialist;
                bestReason = "Your symptoms (" + String.join(", ", matchedKeywords) + ") suggest you should see a " + specialist + ".";
            }
        }

        return new RecommendResponse(bestSpecialist, bestReason, highestScore);
    }
}

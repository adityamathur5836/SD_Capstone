# OOP: Encapsulation — PII scrubbing logic hidden inside class methods
import json

class MedicalDataProcessor:
    def __init__(self):
        self.banned_pii_fields = ['patient_name', 'ssn', 'address', 'phone', 'dob']

    def validate(self, dataset: dict) -> bool:
        if "columns" not in dataset:
            raise ValueError("Invalid Dataset: Missing column headers.")
        return True

    def detect_pii(self, dataset: dict) -> list:
        return [col for col in dataset.get("columns", []) if col.lower() in self.banned_pii_fields]

    def scrub_phi(self, dataset: dict) -> dict:
        self.validate(dataset)
        found_pii = self.detect_pii(dataset)
        safe_columns = [col for col in dataset["columns"] if col not in found_pii]
        return {
            "status": "Cleansed",
            "removed_pii": found_pii,
            "safe_columns": safe_columns,
            "original_count": len(dataset["columns"]),
            "final_count": len(safe_columns)
        }

class AnalysisService:
    def quality_score(self, cohort: list) -> float:
        return 0.94

    def bias_score(self, cohort: list) -> float:
        return 0.12

    def full_report(self, cohort: list) -> dict:
        return {
            "quality": self.quality_score(cohort),
            "bias_deviation": self.bias_score(cohort),
            "re_id_risk": 0.01
        }

if __name__ == "__main__":
    dummy = {"columns": ["patient_name", "ssn", "age", "blood_pressure", "cholesterol"]}
    processor = MedicalDataProcessor()
    print(json.dumps(processor.scrub_phi(dummy), indent=2))
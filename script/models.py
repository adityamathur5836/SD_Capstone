# OOP: Abstract Base Class + Inheritance + Polymorphism
from abc import ABC, abstractmethod
import time


class GANModel(ABC):
    """Abstract base class — forces all GAN implementations to implement train() and generate()"""
    def __init__(self, model_id: str, name: str, hyperparams: dict):
        self.model_id = model_id
        self.name = name
        self.hyperparams = hyperparams

    @abstractmethod
    def train(self, dataset):
        pass

    @abstractmethod
    def generate(self, n: int):
        pass

    def get_metrics(self) -> dict:
        return {"model_id": self.model_id, "name": self.name}


class CTGANModel(GANModel):
    """Concrete class for tabular patient record generation"""
    def __init__(self, pac: int = 10, embedding_dim: int = 128):
        super().__init__("ctgan_01", "Tabular CTGAN", {"pac": pac, "dim": embedding_dim})
        self.is_trained = False

    def train(self, dataset):
        print(f"[{self.name}] Training on tabular dataset...")
        time.sleep(2)
        print(f"[{self.name}] Epoch 100/100 — Loss: 0.045")
        self.is_trained = True
        return {"status": "success", "fidelity_score": 0.92}

    def generate(self, n: int):
        if not self.is_trained:
            raise Exception("Model must be trained first!")
        print(f"[{self.name}] Generating {n} synthetic patient records")
        return [f"synthetic_record_{i}" for i in range(n)]


class DCGANModel(GANModel):
    """Concrete class for medical image synthesis (MRI/X-Ray)"""
    def __init__(self, latent_dim: int = 100, image_size: int = 64):
        super().__init__("dcgan_01", "Image DCGAN", {"latent_dim": latent_dim, "image_size": image_size})
        self.is_trained = False

    def train(self, dataset):
        print(f"[{self.name}] Training CNN on medical images...")
        time.sleep(2)
        print(f"[{self.name}] Epoch 50/50 — Generator Loss: 1.12")
        self.is_trained = True
        return {"status": "success", "fidelity_score": 0.88}

    def generate(self, n: int):
        if not self.is_trained:
            raise Exception("Model must be trained first!")
        print(f"[{self.name}] Generating {n} synthetic MRI images")
        return [f"synthetic_mri_{i}.png" for i in range(n)]

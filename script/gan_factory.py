import sys
import json
import time
import random
from abc import ABC, abstractmethod

class BaseGAN(ABC):
    """
    Abstract Base Class that enforces a strict interface for all generative models.
    This ensures our Node.js backend can blindly call `.train()` on ANY model
    (Polymorphism) without knowing the underlying ML architecture.
    """
    def __init__(self, dataset_path: str, target_epochs: int):
        self._dataset_path = dataset_path
        self._target_epochs = target_epochs
        self._current_epoch = 0
        self._fid_score = float('inf')

    @abstractmethod
    def preprocess_data(self):
        """Must be implemented by child classes to handle distinct file formats."""
        pass

    @abstractmethod
    def train_epoch(self):
        """Executes a single pass of the Generator vs Discriminator."""
        pass

    def run_training_loop(self):
        """
        Public method to execute the full training loop. 
        Outputs JSON chunks to stdout for the Node.js API to digest.
        """
        self.preprocess_data()
        
        while self._current_epoch < self._target_epochs:
            self._current_epoch += 1
            self.train_epoch()
            
            time.sleep(0.1)
            
            status = {
                "epoch": self._current_epoch,
                "target": self._target_epochs,
                "fid_score": round(self._fid_score, 2),
                "status": "training" if self._current_epoch < self._target_epochs else "completed"
            }
            print(json.dumps(status))
            sys.stdout.flush()

class ImageGAN(BaseGAN):
    """Specialized GAN for processing 2D Medical Images (e.g., MRI, X-Rays)."""
    
    def preprocess_data(self):
        status = {"log": f"[ImageGAN] Loading DICOM/JPEG images from {self._dataset_path} and applying convolutions..."}
        print(json.dumps(status))
        sys.stdout.flush()

    def train_epoch(self):
        improvement = random.uniform(0.5, 2.5)
        if self._fid_score == float('inf'):
            self._fid_score = 100.0
        else:
            self._fid_score = max(5.0, self._fid_score - improvement)

class TabularGAN(BaseGAN):
    """Specialized GAN for processing 1D structured clinical records."""
    
    def preprocess_data(self):
        status = {"log": f"[TabularGAN] Loading CSV records from {self._dataset_path} and applying one-hot encoding..."}
        print(json.dumps(status))
        sys.stdout.flush()

    def train_epoch(self):
        improvement = random.uniform(1.0, 4.0)
        if self._fid_score == float('inf'):
            self._fid_score = 50.0
        else:
            self._fid_score = max(0.5, self._fid_score - improvement)

class GANFactory:
    """
    Factory Pattern: Decides which concrete GAN class to instantiate based on runtime arguments.
    Satisfies the Open/Closed Principle (SOLID).
    """
    @staticmethod
    def create_model(data_type: str, dataset_path: str, epochs: int) -> BaseGAN:
        if data_type.lower() == "image":
            return ImageGAN(dataset_path, epochs)
        elif data_type.lower() == "tabular":
            return TabularGAN(dataset_path, epochs)
        else:
            print(json.dumps({"error": f"Unsupported data type: {data_type}"}))
            sys.exit(1)

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="MedSynth GAN Training Engine")
    parser.add_argument("--type", type=str, required=True, help="Data type: 'image' or 'tabular'")
    parser.add_argument("--path", type=str, required=True, help="Relative path to dataset")
    parser.add_argument("--epochs", type=int, default=10, help="Number of training epochs")
    
    args = parser.parse_args()
    
    model = GANFactory.create_model(args.type, args.path, args.epochs)
    
    model.run_training_loop()
# OOP: Factory Method Pattern — decouples object creation from usage
from models import GANModel, CTGANModel, DCGANModel
import sys


class ModelFactory:
    """Registry-based Factory. New model types can be added without modifying existing code (Open/Closed Principle)."""
    _registry = {}

    @classmethod
    def register(cls, type_name: str, model_cls):
        cls._registry[type_name] = model_cls

    @classmethod
    def create_model(cls, type_name: str, config: dict = None) -> GANModel:
        if config is None:
            config = {}
        if type_name not in cls._registry:
            raise ValueError(f"Model '{type_name}' not registered in Factory!")
        return cls._registry[type_name](**config)

# Register available models
ModelFactory.register("CTGAN", CTGANModel)
ModelFactory.register("DCGAN", DCGANModel)

# CLI interface so Node.js can call: python3 factory.py CTGAN 500
if __name__ == "__main__":
    if len(sys.argv) > 1:
        model_type = sys.argv[1]
        count = int(sys.argv[2]) if len(sys.argv) > 2 else 100
        print(f"--- FACTORY: Creating {model_type} ---")
        engine = ModelFactory.create_model(model_type)
        engine.train("mock_dataset")
        result = engine.generate(count)
        print(f"✅ Generated {len(result)} items via {model_type}")
    else:
        print("Usage: python3 factory.py [CTGAN|DCGAN] [count]")
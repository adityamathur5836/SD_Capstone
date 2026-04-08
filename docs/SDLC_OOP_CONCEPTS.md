# System Design Report: SDLC, OOP, & SOLID Principles 

## 1. Software Development Life Cycle (SDLC)
For the MedSynth platform, we are employing an **Agile/Scrum Iterative Methodology**, allowing us to adapt rapidly to changes in ML model requirements without breaking the core application.

### The Four Phases:
1. **Requirements Gathering (Sprint 1):** Identified the bottlenecks in medical AI (HIPAA constraints), mapped out feature requirements for the GAN dashboard.
2. **System Design (Sprint 2):** Created Entity-Relationship diagrams, wireframes for Next.js, and defined our core microservice-lite boundaries between Node API and Python ML scripts.
3. **Core Implementation (Sprint 3 - 40% Goal):** Establishing the foundational API routes, user interfaces, database schemas, and OOP class skeletons.
4. **Validation & Handoff (Sprint 4):** Integration testing of the React frontend calling the Express backend which in turn triggers PyTorch subprocesses. Validating the Synthetic Data Output (FID scores).

---

## 2. Object-Oriented Programming (OOP) Application

The architectural backbone relies heavily on the four pillars of OOP:

### A. Encapsulation
The internal states of heavily computation-bound systems (like the `TrainingJob`) are shielded from the frontend client. The Node.js classes only expose necessary getters (e.g., `Job.getStatus()`, `Job.getFIDScore()`) keeping the underlying state machine safe from accidental mutation.

### B. Abstraction
Using abstract base types in our Python models (`BaseGAN`), the API doesn't need to know *how* `PyTorch` is running an epoch traversal. It only calls `.train()` and `.generate()`. The complexity of tensor math is abstracted away.

### C. Inheritance
We implement inherited base classes in our user systems. 
- `BaseUser` holds generic authentication logic.
- `AdminUser` inherits from `BaseUser` and adds `delete_dataset()` and `ban_user()` functions.
- `ResearcherUser` inherits from `BaseUser` but adds `initiate_training_job()`.

### D. Polymorphism
Different dataset objects act differently when the same function is invoked. A `TabularDataset.validate()` will check for correct CSV headers, whereas an `ImageDataset.validate()` will check for correct DICOM/JPEG resolutions. The main API controller just loop-calls `.validate()` on incoming objects safely.

---

## 3. SOLID Principles in MedSynth

We aim to adhere strictly to Robert C. Martin's SOLID principles locally:

- **Single Responsibility Principle (SRP):** Inside `backend/models/`, the `Dataset` class is *only* responsible for representing data properties. It is not responsible for connecting to PostgreSQL. That job goes to a `DatabaseService` class.
- **Open/Closed Principle (OCP):** Our Factory Design Pattern allows us to add new AI models (e.g., TextGAN) simply by adding a new class file without changing the core `GANFactory` logic deeply.
- **Liskov Substitution Principle (LSP):** Any function accepting a `BaseGAN` can safely accept an `ImageGAN` or `TabularGAN` without crashing the application.
- **Interface Segregation (ISP):** We break apart massive interfaces. A user uploading data shouldn't be forced to implement an interface relevant only to model training.
- **Dependency Inversion (DIP):** Our high-level routing modules do not import low-level database drivers directly. They rely on abstract Data Access Objects (DAOs).
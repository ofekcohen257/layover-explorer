# Project Skills & Guidelines

> **CRITICAL RULE:** *The assistant must read this file before performing any modifications to the backend or frontend.*
# Spring Boot MVC Project Constraints & Architecture Rules

## Tech Stack
* **Java:** 21
* **Framework:** Spring Boot 4 (Web, Data JPA, Security, Session, Validation)
* **View Engine:** Thymeleaf (Server-Side Rendering)
* **Database:** MySQL (Database name: `ex4`)
* **Build Tool:** Maven Wrapper (`mvnw`)

## Architectural Principles (Strict Enforcement)
1.  **Layered Architecture (N-Tier):** * `Controllers`: Handle HTTP requests, manage sessions, and return Thymeleaf view names. NO business logic.
    * `Services`: Contain core business logic (e.g., layover calculation, recommendation scoring). Must be injected via Constructor Injection.
    * `Repositories`: Spring Data JPA interfaces for database access.
    * `Entities`: JPA Domain models.
2.  **SOLID Principles:**
    * *Single Responsibility Principle (SRP):* Classes must have one reason to change. Separate user management from flight search logic.
    * *Dependency Inversion Principle (DIP):* Rely on abstractions. High-level modules (Controllers) depend on interfaces/injected beans, not concrete implementations.
3.  **MVC (Model-View-Controller):** The application state must be passed to views via Spring's `Model` object. Avoid global static variables completely.
4.  **Zero-Configuration Startup:** The project must run perfectly on an empty database using `@PostConstruct` or `CommandLineRunner` to seed initial data and an admin account.

## Coding Standards
* Always use constructor injection over `@Autowired` on fields for better testability.
* Validate all user inputs at the Controller layer using `jakarta.validation.constraints` (e.g., `@Valid`, `@NotBlank`).
* Handle errors gracefully with custom error pages and a global `@ControllerAdvice` if necessary.
* Document the "Why" behind architectural decisions in the code comments.

## 📌 Active Task Checklist


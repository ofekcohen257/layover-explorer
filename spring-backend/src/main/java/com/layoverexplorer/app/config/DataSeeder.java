package com.layoverexplorer.app.config;

import com.layoverexplorer.app.entity.Airport;
import com.layoverexplorer.app.entity.PointOfInterest;
import com.layoverexplorer.app.entity.User;
import com.layoverexplorer.app.entity.UserPreference;
import com.layoverexplorer.app.repository.AirportRepository;
import com.layoverexplorer.app.repository.PointOfInterestRepository;
import com.layoverexplorer.app.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final AirportRepository airportRepository;
    private final PointOfInterestRepository poiRepository;

    public DataSeeder(UserRepository userRepository,
                      AirportRepository airportRepository,
                      PointOfInterestRepository poiRepository) {
        this.userRepository = userRepository;
        this.airportRepository = airportRepository;
        this.poiRepository = poiRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        seedAirportsAndPois();
        seedUsers();
    }

    private void seedAirportsAndPois() {
        if (airportRepository.count() > 0) {
            return;
        }

        // Seed Airports
        Airport tlv = new Airport("TLV", "Tel Aviv", "Israel", 32.0094, 34.8769);
        Airport lhr = new Airport("LHR", "London", "United Kingdom", 51.4700, -0.4543);
        Airport cdg = new Airport("CDG", "Paris", "France", 49.0097, 2.5479);
        Airport fra = new Airport("FRA", "Frankfurt", "Germany", 50.0379, 8.5622);
        Airport bkk = new Airport("BKK", "Bangkok", "Thailand", 13.6900, 100.7501);

        airportRepository.save(tlv);
        airportRepository.save(lhr);
        airportRepository.save(cdg);
        airportRepository.save(fra);
        airportRepository.save(bkk);

        // Seed POIs for London (LHR)
        poiRepository.save(new PointOfInterest("British Museum", "arts", 4.8, 45, lhr));
        poiRepository.save(new PointOfInterest("London Eye", "arts", 4.6, 60, lhr));
        poiRepository.save(new PointOfInterest("Borough Market", "food", 4.7, 30, lhr));

        // Seed POIs for Paris (CDG)
        poiRepository.save(new PointOfInterest("Louvre Museum", "arts", 4.9, 60, cdg));
        poiRepository.save(new PointOfInterest("Eiffel Tower", "arts", 4.8, 75, cdg));
        poiRepository.save(new PointOfInterest("Le Comptoir", "food", 4.6, 45, cdg));

        // Seed POIs for Frankfurt (FRA)
        poiRepository.save(new PointOfInterest("Städel Museum", "arts", 4.7, 40, fra));
        poiRepository.save(new PointOfInterest("Sachsenhausen", "nightlife", 4.5, 30, fra));
        poiRepository.save(new PointOfInterest("Kleinmarkthalle", "food", 4.6, 35, fra));

        // Seed POIs for Bangkok (BKK)
        poiRepository.save(new PointOfInterest("Wat Pho", "arts", 4.8, 60, bkk));
        poiRepository.save(new PointOfInterest("Khaosan Road", "nightlife", 4.5, 45, bkk));
        poiRepository.save(new PointOfInterest("Jay Fai", "food", 4.7, 90, bkk));
    }

    private void seedUsers() {
        if (userRepository.findByEmail("admin@layover.com").isPresent()) {
            return;
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String adminPasswordHash = encoder.encode("admin123");

        User admin = new User("admin@layover.com", adminPasswordHash, "ROLE_ADMIN");
        UserPreference adminPrefs = new UserPreference(admin, 4, 24, "arts,food");
        admin.setPreference(adminPrefs);

        userRepository.save(admin);

        // Also seed a default test user
        if (!userRepository.findByEmail("user@layover.com").isPresent()) {
            String userPasswordHash = encoder.encode("user123");
            User user = new User("user@layover.com", userPasswordHash, "ROLE_USER");
            UserPreference userPrefs = new UserPreference(user, 4, 24, "arts,food,nightlife");
            user.setPreference(userPrefs);
            userRepository.save(user);
        }
    }
}

package edu.eci.arsw.teachtome;

import edu.eci.arsw.teachtome.model.Clase;

import java.sql.Timestamp;

public interface ClassGenerator {
    default Clase getClase(String nombre, String description) {
        long classDurationInMillis = 1000000;
        long actualTime = System.currentTimeMillis();
        Timestamp dateOfInit = new Timestamp(actualTime + classDurationInMillis);
        Timestamp dateOfEnd = new Timestamp(actualTime + 2 * classDurationInMillis);
        return new Clase(nombre, 30, description, 0, dateOfInit, dateOfEnd);
    }

    default Clase getClase(String nombre, String description, int capacity, int amountOfStudents) {
        long classDurationInMillis = 1000000;
        long actualTime = System.currentTimeMillis();
        Timestamp dateOfInit = new Timestamp(actualTime + classDurationInMillis);
        Timestamp dateOfEnd = new Timestamp(actualTime + 2 * classDurationInMillis);
        return new Clase(nombre, capacity, description, amountOfStudents, dateOfInit, dateOfEnd);
    }

    default Clase getClaseAntigua(String nombre, String description) {
        long classDurationInMillis = 1000000;
        long actualTime = System.currentTimeMillis();
        Timestamp dateOfInit = new Timestamp(actualTime - classDurationInMillis);
        Timestamp dateOfEnd = new Timestamp(actualTime + 2 * classDurationInMillis);
        return new Clase(nombre, 30, description, 0, dateOfInit, dateOfEnd);
    }

    default Clase getClaseDesfasada(String nombre, String description) {
        long classDurationInMillis = 1000000;
        long actualTime = System.currentTimeMillis();
        Timestamp dateOfInit = new Timestamp(actualTime + classDurationInMillis);
        Timestamp dateOfEnd = new Timestamp(actualTime + 2 * classDurationInMillis);
        return new Clase(nombre, 30, description, 0, dateOfEnd, dateOfInit);
    }
}

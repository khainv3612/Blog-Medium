package com.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;

@Service
public class FBInitialize {

    @PostConstruct
    public void initialize() {
        try {
            FileInputStream serviceAccount =
                    new FileInputStream("src/main/resources/angular9crud-41de3-firebase-adminsdk-bzahz-d43950859e.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://angular9crud-41de3.firebaseio.com")
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Firestore getFirebase() {
        return FirestoreClient.getFirestore();
    }
}
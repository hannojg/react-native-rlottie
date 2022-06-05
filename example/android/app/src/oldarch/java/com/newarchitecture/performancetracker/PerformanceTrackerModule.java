package com.newarchitecture.performancetracker;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.newarchitecture.performancetracker.PerformanceTrackerImpl;

public class PerformanceTrackerModule extends ReactContextBaseJavaModule {
    public PerformanceTrackerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return PerformanceTrackerImpl.NAME;
    }


    @Override
    public void start() {
        PerformanceTrackerImpl.start();
    }

    @Override
    public void stop() {
        PerformanceTrackerImpl.stop();
    }
}
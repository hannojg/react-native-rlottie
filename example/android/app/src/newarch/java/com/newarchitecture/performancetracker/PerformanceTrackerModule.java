package com.newarchitecture.performancetracker;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

import nl.skillnation.performancetracker.NativePerformanceTrackerSpec;

public class PerformanceTrackerModule extends NativePerformanceTrackerSpec {
    private final PerformanceTrackerImpl performanceTracker;

    public PerformanceTrackerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.performanceTracker = new PerformanceTrackerImpl(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return PerformanceTrackerImpl.NAME;
    }

    @Override
    @ReactMethod
    public void start() {
        performanceTracker.start();
    }

    @Override
    @ReactMethod
    public void stop() {
        performanceTracker.stop();
    }
}
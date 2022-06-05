package com.newarchitecture.performancetracker;

import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.newarchitecture.BuildConfig;

import java.util.HashMap;
import java.util.Map;

public class PerformanceTrackerPackage extends TurboReactPackage {
    @Override
    public NativeModule getModule(String name, ReactApplicationContext reactContext) {
        if (name.equals(PerformanceTrackerImpl.NAME)) {
            return new com.newarchitecture.performancetracker.PerformanceTrackerModule(reactContext);
        }
        return null;
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        return () -> {
            final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
            boolean isTurboModule = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
            moduleInfos.put(
                    PerformanceTrackerImpl.NAME,
                    new ReactModuleInfo(
                            PerformanceTrackerImpl.NAME,
                            PerformanceTrackerImpl.NAME,
                            false, // canOverrideExistingModule
                            false, // needsEagerInit
                            true, // hasConstants
                            false, // isCxxModule
                            isTurboModule // isTurboModule
                    ));
            return moduleInfos;
        };
    }
}

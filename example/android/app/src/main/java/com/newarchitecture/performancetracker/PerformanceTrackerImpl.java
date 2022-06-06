package com.newarchitecture.performancetracker;


import android.os.Handler;
import android.util.Log;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.debug.FpsDebugFrameCallback;

import java.util.Locale;

// Most important impl details from: https://github.com/facebook/react-native/blob/main/ReactAndroid/src/main/java/com/facebook/react/devsupport/FpsView.java
public class PerformanceTrackerImpl {
    public static final String NAME = "PerformanceTracker";

    private static final int UPDATE_INTERVAL_MS = 500;

    private final FpsDebugFrameCallback mFrameCallback;
    private final FPSMonitorRunnable mFPSMonitorRunnable;
    private Handler handler;

    public PerformanceTrackerImpl(ReactContext context) {
        mFrameCallback = new FpsDebugFrameCallback(context);
        mFPSMonitorRunnable = new FPSMonitorRunnable();
    }

    public void start() {
        handler = new Handler();
        mFrameCallback.reset();
        mFrameCallback.start();
        mFPSMonitorRunnable.start();
    }

    public void stop() {
        handler = null;
        mFrameCallback.stop();
        mFPSMonitorRunnable.stop();
    }

    private void setCurrentFPS(double uiFPS, double jsFPS, int framesDropped, int shutters) {
        Log.d("HannoDebug", String.format(
                "UI: %.1f fps",
                uiFPS)
        );
    }

    /** Timer that runs every UPDATE_INTERVAL_MS ms and updates the currently displayed FPS. */
    private class FPSMonitorRunnable implements Runnable {

        private boolean mShouldStop = false;
        private int mTotalFramesDropped = 0;
        private int mTotal4PlusFrameStutters = 0;

        @Override
        public void run() {
            if (mShouldStop) {
                return;
            }
            mTotalFramesDropped += mFrameCallback.getExpectedNumFrames() - mFrameCallback.getNumFrames();
            mTotal4PlusFrameStutters += mFrameCallback.get4PlusFrameStutters();
            setCurrentFPS(
                    mFrameCallback.getFPS(),
                    mFrameCallback.getJSFPS(),
                    mTotalFramesDropped,
                    mTotal4PlusFrameStutters);
            mFrameCallback.reset();

            // TODO: not sure if we need to run that on a view
            handler.postDelayed(this, UPDATE_INTERVAL_MS);
        }

        public void start() {
            mShouldStop = false;
            handler.post(this);
        }

        public void stop() {
            mShouldStop = true;
        }
    }
}

package nl.skillnation.rlottie;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.aghajari.rlottie.AXrLottie;
import com.aghajari.rlottie.AXrLottieDrawable;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class RLottieViewManager extends SimpleViewManager<RLottieView> {
    public static final String REACT_CLASS = "RLottieView";
    protected ReactApplicationContext mCallerContext;

    public RLottieViewManager(ReactApplicationContext reactContext) {
        mCallerContext = reactContext;
        AXrLottie.init(reactContext);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected RLottieView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new RLottieView(reactContext);
    }

    @ReactProp(name="isAutoPlay")
    public void setIsAutoPlay(RLottieView view, boolean isAutoPlay) {
        view.isAutoPlay = isAutoPlay;
    }

    @ReactProp(name="src")
    public void setSrc(RLottieView view, String jsonString) {
        view.setLottieDrawable(
                AXrLottieDrawable
                        .fromJson(jsonString, "cacheKeyTodo")
                        .setSize(700, 700)
                        .build()
        );

        if (view.isAutoPlay) view.playAnimation();
    }

    @ReactProp(name="progress")
    public void setProgress(RLottieView view, float progress) {
        view.getLottieDrawable().setProgress(progress);
    }

    @Override
    public void onDropViewInstance(@NonNull RLottieView view) {
        super.onDropViewInstance(view);
        view.release();
    }
}

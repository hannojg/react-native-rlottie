package nl.skillnation.rlottie;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.aghajari.rlottie.AXrLottie;
import com.aghajari.rlottie.AXrLottieDrawable;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class RLottieViewManagerImpl extends SimpleViewManager<RLottieView> {

    public static final String NAME = "RLottieView";

    protected ReactApplicationContext mCallerContext;

    public RLottieViewManagerImpl(ReactApplicationContext reactContext) {
        mCallerContext = reactContext;
        AXrLottie.init(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @NonNull
    @Override
    protected RLottieView createViewInstance(@NonNull ThemedReactContext context) {
        return new RLottieView(context);
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
        if (view == null || view.getLottieDrawable() == null) return; // TODO: With new arch setProgress isn't called (thus the animation isn't running)
        view.getLottieDrawable().setProgress(progress);
    }

    @Override
    public void onDropViewInstance(@NonNull RLottieView view) {
        super.onDropViewInstance(view);
        view.release();
    }
}

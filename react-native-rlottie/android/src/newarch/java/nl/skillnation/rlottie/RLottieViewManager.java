package nl.skillnation.rlottie;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.aghajari.rlottie.AXrLottie;
import com.aghajari.rlottie.AXrLottieDrawable;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.RLottieViewManagerDelegate;
import com.facebook.react.viewmanagers.RLottieViewManagerInterface;

@ReactModule(name = RLottieViewManager.NAME)
public class RLottieViewManager extends SimpleViewManager<RLottieView>
    implements RLottieViewManagerInterface<RLottieView> {

    public static final String NAME = "RLottieView";

    private final ViewManagerDelegate<RLottieView> mDelegate;

    protected ReactApplicationContext mCallerContext;

    public RLottieViewManager(ReactApplicationContext reactContext) {
        mCallerContext = reactContext;
        AXrLottie.init(reactContext);
        mDelegate = new RLottieViewManagerDelegate<>(this);
    }

    @Nullable
    @Override
    protected ViewManagerDelegate<ColoredView> getDelegate() {
        return mDelegate;
    }

    @Override
    public String getName() {
        return NAME;
    }

    @NonNull
    @Override
    protected RLottieView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new RLottieView(reactContext);
    }

    @Override
    @ReactProp(name="isAutoPlay")
    public void setIsAutoPlay(RLottieView view, boolean isAutoPlay) {
        view.isAutoPlay = isAutoPlay;
    }

    @Override
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

    @Override
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

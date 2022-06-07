package nl.skillnation.rlottie;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.viewmanagers.RLottieViewManagerDelegate;
import com.facebook.react.viewmanagers.RLottieViewManagerInterface;

@ReactModule(name = RLottieViewManager.NAME)
public class RLottieViewManager extends RLottieViewManagerImpl
    implements RLottieViewManagerInterface<RLottieView> {

    public static final String NAME = "RLottieView";

    private final ViewManagerDelegate<RLottieView> mDelegate;

    public RLottieViewManager(ReactApplicationContext reactContext) {
        super(reactContext);
        mDelegate = new RLottieViewManagerDelegate<>(this);
    }

    @Nullable
    @Override
    protected ViewManagerDelegate<RLottieView> getDelegate() {
        return mDelegate;
    }

    @Override
    public void setDecodeWidth(RLottieView view, float value) {
        this.setDecodeWidth(view, Math.round(value));
    }

    @Override
    public void setDecodeHeight(RLottieView view, float value) {
        this.setDecodeHeight(view, Math.round(value));
    }
}

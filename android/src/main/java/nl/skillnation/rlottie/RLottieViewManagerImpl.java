package nl.skillnation.rlottie;

import android.widget.ImageView;

import androidx.annotation.NonNull;

import com.aghajari.rlottie.AXrLottie;
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
        view.setAutoPlay(isAutoPlay);
    }

    @ReactProp(name="src")
    public void setSrc(RLottieView view, String jsonString) {
        view.setJSONStringSource(jsonString);
    }

    @ReactProp(name="progress")
    public void setProgress(RLottieView view, float progress) {
        if (view == null || view.getLottieDrawable() == null) return; // TODO: With new arch setProgress isn't called (thus the animation isn't running)
        view.getLottieDrawable().setProgress(progress);
    }

    @ReactProp(name="decodeHeight")
    public void setDecodeHeight(RLottieView view, int height) {
        view.setDecodeHeight(height);
    }

    @ReactProp(name="decodeWidth")
    public void setDecodeWidth(RLottieView view, int width) {
        view.setDecodeWidth(width);
    }

    @ReactProp(name="resizeMode")
    public void setResizeMode(RLottieView view, String resizeMode) {
        ImageView.ScaleType mode = null;
        if ("cover".equals(resizeMode)) {
            mode = ImageView.ScaleType.CENTER_CROP;
        } else if ("contain".equals(resizeMode)) {
            mode = ImageView.ScaleType.CENTER;
        } else if ("center".equals(resizeMode)) {
            mode = ImageView.ScaleType.CENTER_INSIDE;
        }
        view.setScaleType(mode);
    }

    @ReactProp(name="loop")
    public void setLoop(RLottieView view, boolean loop) {
        view.setIsLoop(loop);
    }

    @ReactProp(name="speed")
    public void setSpeed(RLottieView view, float speed) {
        view.setSpeed(speed);
    }

    @Override
    public void onDropViewInstance(@NonNull RLottieView view) {
        super.onDropViewInstance(view);
        view.release();
    }
}

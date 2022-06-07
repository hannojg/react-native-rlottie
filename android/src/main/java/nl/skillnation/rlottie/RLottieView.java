package nl.skillnation.rlottie;

import android.content.Context;
import android.util.AttributeSet;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.aghajari.rlottie.AXrLottieDrawable;
import com.aghajari.rlottie.AXrLottieImageView;

public class RLottieView extends AXrLottieImageView {
    public boolean isAutoPlay = false;
    private int decodeWidth, decodeHeight;
    private String jsonString;
    private boolean isInit;

    public RLottieView(@NonNull Context context) {
        super(context);
    }

    public RLottieView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public RLottieView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    //#region Layout size
    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        super.onLayout(changed, left, top, right, bottom);
        if (decodeWidth == 0) {
            decodeWidth = getWidth();
        }
        if (decodeHeight == 0) {
            decodeHeight = getHeight();
        }

        maybeInitAnimation();
    }

    public void setDecodeWidth(int decodeWidth) {
        this.decodeWidth = decodeWidth;
        maybeInitAnimation();
    }

    public void setDecodeHeight(int decodeHeight) {
        this.decodeHeight = decodeHeight;
        maybeInitAnimation();
    }
    //#endregion

    //#region Animation
    public void setJSONStringSource(String jsonString) {
        this.jsonString = jsonString;
        maybeInitAnimation();
    }

    private String getCacheKey() {
        if (jsonString == null || decodeWidth == 0 || decodeHeight == 0) {
            return null;
        }
        return jsonString.hashCode() + "-" + decodeWidth + "-" + decodeHeight;
    }

    private void maybeInitAnimation() {
        if (isInit) return;
        String cacheKey = getCacheKey();
        if (cacheKey == null) return;
        isInit = true;

        setLottieDrawable(
                AXrLottieDrawable.fromJson(jsonString, cacheKey)
                        .setSize(decodeWidth, decodeHeight)
                        .build()
        );

        maybeAutoStartAnimation();
    }
    //#endregion

    //#region AutoStart
    public void setAutoPlay(boolean autoPlay) {
        isAutoPlay = autoPlay;
        maybeAutoStartAnimation();
    }

    private void maybeAutoStartAnimation() {
        if (isAutoPlay && getLottieDrawable() != null && !getLottieDrawable().isRunning()) {
            playAnimation();
        }
    }
    //#endregion
}

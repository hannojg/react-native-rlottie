package nl.skillnation.rlottie;

import android.content.Context;
import android.util.AttributeSet;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.aghajari.rlottie.AXrLottieImageView;

public class RLottieView extends AXrLottieImageView {
    public boolean isAutoPlay = false;

    public RLottieView(@NonNull Context context) {
        super(context);
    }

    public RLottieView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public RLottieView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }
}

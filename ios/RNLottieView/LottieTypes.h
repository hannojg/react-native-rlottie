//
//  LottieTypes.h
//  animationperftests
//
//  Created by Hanno Gödecke on 31.05.22.
//

#ifndef LottieTypes_h
#define LottieTypes_h

typedef struct LottieWrapper{
public:
    static void convertToCanvasFormat(rlottie::Surface &s);
};

typedef struct LottieInfo{
    ~LottieInfo() {
        if (decompressBuffer != nullptr) {
            delete[]decompressBuffer;
            decompressBuffer = nullptr;
        }
    }

public:
    std::unique_ptr<rlottie::Animation> animation;
    size_t frameCount = 0;
    int32_t fps = 30;
    double_t duration = 0;
    bool precache = false;
    bool createCache = false;
    bool limitFps = false;
    std::string path;
    std::string cacheFile;
    uint8_t *decompressBuffer = nullptr;
    uint32_t decompressBufferSize = 0;
    volatile uint32_t maxFrameSize = 0;
    uint32_t imageSize = 0;
    uint32_t fileOffset = 0;
    bool nextFrameIsCacheFrame = false;

    FILE *precacheFile = nullptr;
    char *compressBuffer = nullptr;
    const char *buffer = nullptr;
    bool firstFrame = false;
    int bufferSize;
    int compressBound;
    int firstFrameSize;
    volatile uint32_t framesAvailableInCache = 0;
};

#endif /* LottieTypes_h */

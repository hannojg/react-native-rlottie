//
//  RLottieView.m
//  animationperftests
//
//  Created by Hanno Gödecke on 31.05.22.
//

#import <Foundation/Foundation.h>

#import "RLottieView.h"
#import "rlottie/rlottie.h"
#import "LottieTypes.h"

// This guard prevent the code from being compiled in the old architecture
#ifdef RCT_NEW_ARCH_ENABLED

#import <react/renderer/components/RLottieViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/RLottieViewSpec/EventEmitters.h>
#import <react/renderer/components/RLottieViewSpec/Props.h>
#import <react/renderer/components/RLottieViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RLottieView () <RCTRLottieViewViewProtocol>

@end
#endif

@implementation RLottieView
{
    LottieInfo* info;
    UIImageView* _view;
}

#ifdef RCT_NEW_ARCH_ENABLED
+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<RLottieViewComponentDescriptor>();
}

Class<RCTComponentViewProtocol> RLottieViewCls(void)
{
    return RLottieView.class;
}

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const RLottieViewProps>();
        _props = defaultProps;

        _view = [[UIImageView alloc] init];

        self.contentView = _view;
    }
    return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<RLottieViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<RLottieViewProps const>(props);
    
    if (oldViewProps.src != newViewProps.src) {
        [self updateSrc:newViewProps.src];
    }
    
    [super updateProps:props oldProps:oldProps];
}
#endif

- (instancetype)init
{
  self = [super init];
  // https://github.com/Aghajari/AXrLottie/blob/b0f431b652958c63dd2bd6b22a3f62a051b496d8/AXrLottie/src/main/cpp/lottie.cpp#L21
  info = new LottieInfo();
  return self;
}

// Expecting a string with JSON content
- (void)setSrc:(NSString*)source // Called by old arch ViewManager
{
    auto src = std::string([source UTF8String]);
    [self updateSrc:src];
}

- (void)updateSrc:(std::string)source
{
    // https://github.com/Aghajari/AXrLottie/blob/b0f431b652958c63dd2bd6b22a3f62a051b496d8/AXrLottie/src/main/cpp/lottie.cpp#L91
    info->animation = rlottie::Animation::loadFromData(source, "randomCacheKey");
    if (info->animation == nullptr) {
      [NSException raise:@"Failed to read animation." format:@"Expected a string that is a JSON lottie animation"];
      return;
    }
    
    info->frameCount = info->animation->totalFrame();
    info->fps = (int) info->animation->frameRate();
    info->duration = info->animation->duration();
    
    // render all the frames
    size_t width, height;
    info->animation->size(width, height);
    // https://github.com/SDWebImage/SDWebImageLottieCoder/blob/c9f65679a9b0510b89673507f548a7c0f17ba95f/SDWebImageLottieCoder/Classes/SDImageLottieCoder.m#L324
    CGBitmapInfo bitmapInfo = kCGBitmapByteOrder32Host;
    bitmapInfo |= kCGImageAlphaPremultipliedFirst;
    CGContextRef _canvas = CGBitmapContextCreate(NULL, width, height, 8, 0, self.colorSpaceGetDeviceRGB, bitmapInfo);
    size_t bytesPerRow = CGBitmapContextGetBytesPerRow(_canvas);
    uint32_t* buffer = (uint32_t *)CGBitmapContextGetData(_canvas);
    
    // https://github.com/SDWebImage/SDWebImageLottieCoder/blob/c9f65679a9b0510b89673507f548a7c0f17ba95f/SDWebImageLottieCoder/Classes/SDImageLottieCoder.m#L180
    NSMutableArray<UIImage *> *animatedImages = [NSMutableArray arrayWithCapacity:info->frameCount];
    auto surface = std::make_unique<rlottie::Surface>(buffer, width, height, bytesPerRow);
    CFAbsoluteTime timeInSeconds = CFAbsoluteTimeGetCurrent();
    
    for (size_t i = 0; i < info->frameCount; i++) {
      info->animation->renderSync(i, *surface);
      CGImageRef imageRef = CGBitmapContextCreateImage(_canvas);
      if (!imageRef) {
          continue;
      }
      UIImage *image = [[UIImage alloc] initWithCGImage:imageRef scale:1 orientation:UIImageOrientationUp];
      CGImageRelease(imageRef);
      [animatedImages addObject:image];
    }
    NSLog(@"Frame calculation took %f", CFAbsoluteTimeGetCurrent() - timeInSeconds);

      UIImage* animatedImage = [UIImage animatedImageWithImages:animatedImages duration:info->duration];
  #ifdef RCT_NEW_ARCH_ENABLED
      _view.image = animatedImage;
  #else
      self.image = animatedImage;
  #endif
}

// https://github.com/SDWebImage/SDWebImage/blob/fda0a57de98d391e8244cc0f80c583e2c67d9e8f/SDWebImage/Core/SDImageCoderHelper.m#L191
- (CGColorSpaceRef)colorSpaceGetDeviceRGB {
    static CGColorSpaceRef colorSpace;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        colorSpace = CGColorSpaceCreateWithName(kCGColorSpaceSRGB);
    });
    return colorSpace;
}

@end

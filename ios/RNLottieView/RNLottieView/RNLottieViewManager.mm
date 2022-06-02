//
//  RLottieViewManager.m
//  animationperftests
//
//  Created by Hanno Gödecke on 31.05.22.
//

#import <React/RCTViewManager.h>

#import "RLottieView.h"

@interface RLottieViewManager : RCTViewManager
@end

@implementation RLottieViewManager

RCT_EXPORT_MODULE(RLottieView)
RCT_EXPORT_VIEW_PROPERTY(src, NSString);

- (UIView *)view
{
  return [[RLottieView alloc] init];
}

@end

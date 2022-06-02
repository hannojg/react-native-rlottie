//
//  RLottieView.h
//  animationperftests
//
//  Created by Hanno Gödecke on 31.05.22.
//

#ifndef RLottieView_h
#define RLottieView_h

#pragma New architecture
// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface RLottieView : RCTViewComponentView
@end

NS_ASSUME_NONNULL_END

#endif /* RCT_NEW_ARCH_ENABLED */


#pragma Old architecture
#ifndef RCT_NEW_ARCH_ENABLED
#import <React/RCTView.h>

@interface RLottieView : UIImageView

@end
#endif /* RCT_NEW_ARCH_ENABLED */

#endif /* RLottieView_h */

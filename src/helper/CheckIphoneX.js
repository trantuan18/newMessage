import { Dimensions, Platform, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export function isIphoneX() {
    const dimen = Dimensions.get('window');
    console.log(dimen.height)
    console.log(dimen.width)
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) ||
            (dimen.height === 844 || dimen.width === 844) ||
            (dimen.height === 896 || dimen.width === 896) ||
            (dimen.height === 926 || dimen.width === 926)) ||
        (dimen.height === 852 || dimen.width === 852)
    );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
}

export function getStatusBarHeight(safe) {
    return Platform.select({
        ios: DeviceInfo.hasDynamicIsland() ? 100 : ifIphoneX(safe ? 44 : 30, 20),
        android: StatusBar.currentHeight
    });
}

export function getBottomSpace() {
    return isIphoneX() ? 40 : 0;
}
